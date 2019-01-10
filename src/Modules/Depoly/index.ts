'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

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

/** Loads topology from default location and deploys it to the database provided in the options. */
export default async function({options}: {options: Options})
{
	const topology = await load();
	const deployment = new Deployment({topology, options});
	await run(deployment);
	await deployment.finish();
	await delayForDebugger();
};

export async function run(deployment: Deployment)
{
	await guaranteeDatabases(deployment);
};

async function delayForDebugger()
{
	const attached = process.execArgv.includes('--inspect');
	if (!attached) return;
	await new Promise(resolve => setTimeout(resolve, 3000));
};

/** Stores state for a deployment. Easily passable in deep call stacks. */
export class Deployment
{
	public readonly topology: Topology;
	public readonly options: Options;
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
	};
	/** Finishes the deployment by disconnecting from the RethinkDB database. */
	public async finish()
	{
		this.log('Disconnecting...');
		await this.connection.close();
		this.log('Disconnect.');
	};
	/** Logs if options desire it. */
	public log(... messages: Array<any>)
	{
		if (!this.options.log) return;
		console.log(... messages);
	};
};