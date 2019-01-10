'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

// Internal Modules
import { Deployment } from './';
import guaranteeTables from './GuaranteeTables';

// Types
import { Database } from 'src/Types/Topology';

export default async function(database: Database, deployment: Deployment)
{
	await guarantee(database, deployment);
	await guaranteeTables(database, deployment);
};

async function guarantee(database: Database, deployment: Deployment)
{
	const exists = await doesExist(database, deployment);
    if (exists)
	{
		log('Exists.', database, deployment);
		return;
	};
	log('Creating...', database, deployment);
	await create(database, deployment);
	log('Created.', database, deployment);
};

async function doesExist(database: Database, deployment: Deployment)
{
	const query = RethinkDB
		.dbList()
		.filter(name => name.eq(database.name))
		.count()
		.gt(0);
	const exists = await query.run(deployment.connection);
	return exists;
};

async function create(database: Database, deployment: Deployment)
{
	const query = RethinkDB
		.dbCreate(database.name);
	await query.run(deployment.connection);
};

function log(message: string, database: Database, deployment: Deployment)
{
	const generated = generateMessage(message, database);
	deployment.log(generated);
};

function generateMessage(message: string, database: Database)
{
	const generated = '[Database][' + database.name + '] ' + message;
	return generated;
};