'use strict';

// To Do: Create users specified in topology config file, using passwords from separte passwords file.
// To Do: Check own user permissions before any operations (including index comparison).

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';
import { ulid } from 'ulid';
import * as Joi from 'joi';

// Internal Modules
import load from './Load';
import guaranteeDatabases from './GuaranteeDatabases';

// Types
import { Connection, RConnectionOptions } from 'rethinkdb-ts';
import { Topology, Database } from 'src/Types/Topology';
interface Options
{
	/** Log debugging events to console.log(). */
	log?: boolean;
	/** RethinkDB connection options. */
	rethink: RConnectionOptions;
};
interface IndexComparisonTable
{
	database: string;
	name: string;
};

// Constants
const OPTIONS_SCHEMA = Joi.object
	(
		{
			options: Joi.object
				(
					{
						log: Joi.boolean().default(false),
						rethink: Joi.object
							(
								{
									host: Joi.string().optional(),
									port: Joi.number().optional(),
									server: Joi.object().optional(),
									db: Joi.string().optional(),
									user: Joi.string().optional(),
									password: Joi.string().optional(),
									discovery: Joi.boolean().optional(),
									pool: Joi.boolean().optional(),
									buffer: Joi.number().optional(),
									max: Joi.number().optional(),
									timeout: Joi.number().optional(),
									pingInterval: Joi.number().optional(),
									timeoutError: Joi.number().optional(),
									timeoutGb: Joi.number().optional(),
									maxExponent: Joi.number().optional(),
									silent: Joi.boolean().optional(),
									log: Joi.func().optional()
								}
							)
							.pattern(/\w/, Joi.any())
							.required()
					}
				)
				.required()
		}
	)
	.required();

/** Loads topology from default location and deploys it to the database provided in the options. */
export default async function({options}: {options: Options} = {options: {} as Options})
{
	const topology = await load();
	const deployment = new Deployment({topology, options});
	await deployment.initialise();
	let deploymentError: Error;
	try
	{
		await deploy(deployment);
	}
	catch (error)
	{
		deploymentError = error;
	};
	await deployment.finish();
	if (deploymentError) throw deploymentError;
};

/** Deploys deployment. */
export async function deploy(deployment: Deployment)
{
	await guaranteeDatabases(deployment);
};

/** Stores state for a deployment. Easily passable in deep call stacks. */
export class Deployment
{
	public readonly topology: Topology;
	public readonly options: Options;
	public indexComparisonTable: IndexComparisonTable;
	public connection: Connection;
	constructor({topology, options}: {topology: Topology, options: Options})
	{
		this.topology = topology;
		this.options = this.validateOptions({options});
	};
	/** Validates deployment options and returns transformed object with appropriate defaults. */
	private validateOptions({options}: {options: Options})
	{
		const validated = Joi.validate(arguments[0], OPTIONS_SCHEMA);
		if (validated.error) throw new Error(validated.error.message);
		options = validated.value.options;
		return options;
	};
	/** Initialises the deployment by connecting to the RethinkDB database. */
	public async initialise()
	{
		this.log('Connecting...');
		const connection = await RethinkDB.connect(this.options.rethink);
		this.connection = connection;
		this.log('Connected.');
		await this.initialiseIndexComparisonTable();
	};
	/** Creates table for index comparison during deployment. */
	private async initialiseIndexComparisonTable()
	{
		const id = ulid();
		const name = 'Topology_IndexComparison_' + id;
		const database = this.topology.databases[0];
		await this.guaranteeIndexComparisonDatabase({database});
		const query = RethinkDB
			.db(database.name)
			.tableCreate(name);
		this.log('Initialising index comparison table...');
		await query.run(this.connection);
		this.log('Initialised index comparison table.');
		this.indexComparisonTable =
		{
			database: database.name,
			name
		};
	};
	/** Guarantees that the index comparison database exists, creating it if it doesn't. */
	private async guaranteeIndexComparisonDatabase({database}: {database: Database})
	{
		const query = RethinkDB
			.branch
			(
				RethinkDB
					.dbList()
					.contains(database.name)
					.eq(false),
				RethinkDB
					.dbCreate(database.name),
				true
			);
		await query.run(this.connection);
	};
	/** Finishes the deployment by disconnecting from the RethinkDB database. */
	public async finish()
	{
		await this.deleteIndexComparisonTable();
		this.log('Disconnecting...');
		await this.connection.close();
		this.log('Disconnect.');
	};
	/** Deletes index comparsion table. */
	private async deleteIndexComparisonTable()
	{
		const query = RethinkDB
			.db(this.indexComparisonTable.database)
			.tableDrop(this.indexComparisonTable.name);
		this.log('Deleting index comparison table...');
		await query.run(this.connection);
		this.log('Deleted index comparison table.');
	};
	/** Logs if options desire it. */
	public log(... messages: Array<any>)
	{
		if (!this.options.log) return;
		console.log(... messages);
	};
};