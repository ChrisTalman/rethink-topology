'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

// Internal Modules
import Deployment from './Deployment';
import guaranteeTables from './GuaranteeTables';
import { generatePermissions } from './GuaranteeUsers';

// Types
import { Database, DatabaseUser } from 'src/Types/Topology';

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
	await guaranteeUsers({database, deployment});
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

async function guaranteeUsers({database, deployment}: {database: Database, deployment: Deployment})
{
	await Promise.all(database.users.map(user => guaranteeUser({user, database, deployment})));
};

async function guaranteeUser({user, database, deployment}: {user: DatabaseUser, database: Database, deployment: Deployment})
{
	const permissions = generatePermissions({user});
	const query = RethinkDB
		.db(database.name)
		.grant(user.username, permissions);
	await query.run(deployment.connection);
};

function log(message: string, database: Database, deployment: Deployment)
{
	const generated = generateMessage(message, database);
	deployment.log(generated);
};

function generateMessage(message: string, database: Database)
{
	const generated = '[' + database.name + '] ' + message;
	return generated;
};