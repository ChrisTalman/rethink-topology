'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';
import { ulid } from 'ulid';

// Internal Modules
import load from 'src/Modules/Load';
import guaranteeDatabases from './GuaranteeDatabases';

// Types
import { Connection, RConnectionOptions } from 'rethinkdb-ts';
import { Topology } from 'src/Types/Topology';
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

/** Loads topology from default location and deploys it to the database provided in the options. */
export default async function({options}: {options: Options})
{
	const topology = await load();
	const deployment = new Deployment({topology, options});
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
		this.options = options;
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
	/** Finishes the deployment by disconnecting from the RethinkDB database. */
	public async finish()
	{
		this.log('Disconnecting...');
		await this.connection.close();
		this.log('Disconnect.');
		await this.deleteIndexComparisonTable();
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