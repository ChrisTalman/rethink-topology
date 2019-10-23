'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';
import { ulid } from 'ulid';
import * as Joi from 'joi';
import Config from '@ChrisTalman/config';

// Constants
const RETHINK_OPTIONS_SCHEMA = Joi.object
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
	);
const OPTIONS_SCHEMA = Joi.object
	(
		{
			deleteDefaultDatabase: Joi.boolean().default(true),
			deleteUndeclaredIndexes: Joi.boolean().default(false),
			outputNames: Joi.boolean().default(true),
			log: Joi.boolean().default(false),
			rethink: Joi.alternatives(Joi.string(), RETHINK_OPTIONS_SCHEMA).required()
		}
	)
	.required()
	.label('options');
const DATABASE_NOT_FOUND_ERROR_MESSAGE_EXPRESSION = /Database `.+` does not exist./;
const DEFAULT_DATABASE_NAME = 'test';

// Types
import { Connection, RConnectionOptions } from 'rethinkdb-ts';
import { Topology, Database } from 'src/App/Types/Topology';
export interface Options
{
	/** Determines whether the default database 'tests' should be deleted. */
	deleteDefaultDatabase?: boolean;
	/** Determines whether undeclared indexes should be deleted. */
	deleteUndeclaredIndexes?: boolean;
	/** Determines whether `topology.names.json` should be output. */
	outputNames?: boolean;
	/** Log debugging events to console.log(). */
	log?: boolean;
	/** RethinkDB connection options. If string, used as JSON file path from which to obtain connection object. */
	rethink: string | RConnectionOptions;
};
interface IndexComparisonTable
{
	database: string;
	name: string;
};

/** Stores state for a deployment. Easily passable in deep call stacks. */
export default class Deployment
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
		const validated = Joi.validate(options, OPTIONS_SCHEMA);
		if (validated.error) throw new Error(validated.error.message);
		options = validated.value;
		return options;
	};
	/** Initialises the deployment by connecting to the RethinkDB database. */
	public async initialise()
	{
		this.log('Connecting...');
		let rethinkConnectionOptions: RConnectionOptions;
		if (typeof this.options.rethink === 'string')
		{
			const config = new Config <RConnectionOptions> ({initialise: false, schema: false, file: this.options.rethink});
			try
			{
				await config.initialise();
			}
			catch (error)
			{
				throw new ConnectionConfigFileError(error);
			};
			const data = config.data;
			rethinkConnectionOptions = data;
		}
		else
		{
			rethinkConnectionOptions = this.options.rethink;
		};
		const connection = await RethinkDB.connect(rethinkConnectionOptions);
		this.connection = connection;
		this.log('Connected.');
		await this.deleteDefaultDatabase();
		await this.initialiseIndexComparisonTable();
	};
	/** Deletes default database 'tests' if determined by options. */
	private async deleteDefaultDatabase()
	{
		if (!this.options.deleteDefaultDatabase) return;
		this.log('Deleting default database \'tests\'...');
		const query = RethinkDB.dbDrop(DEFAULT_DATABASE_NAME);
		try
		{
			await query.run(this.connection);
		}
		catch (error)
		{
			const notFound = typeof error === 'object' && error !== null && 'msg' in error && typeof error.msg === 'string' && DATABASE_NOT_FOUND_ERROR_MESSAGE_EXPRESSION.test(error.msg);
			if (notFound) return;
			const originalErrorMessage = 'message' in error ? error.message : error;
			const contextualisedErrorMessage = 'Failed to delete default database: ' + originalErrorMessage;
			throw new Error(contextualisedErrorMessage);
		};
		this.log('Deleted default database \'tests\'.');
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

export class ConnectionConfigFileError extends Error
{
	constructor(error: Error)
	{
		const message = 'RethinkDB connection options file error: ' + error.message;
		super(message);
	};
};