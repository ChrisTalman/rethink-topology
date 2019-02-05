'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

// Internal Modules
import guaranteeIndexes from './GuaranteeIndexes';
import { generatePermissions } from './GuaranteeUsers';

// Types
import { Table, TableUser } from 'src/Types/Topology';
import Deployment from './Deployment';
import { TableList } from './GuaranteeTables';

export default async function(table: Table, tableList: TableList, deployment: Deployment)
{
	await guarantee(table, tableList, deployment);
	await guaranteeIndexes(table, deployment);
};

async function guarantee(table: Table, tableList: TableList, deployment: Deployment)
{
	const exists = tableList.includes(table.name);
	if (exists) log('Exists.', table, deployment);
	else await create(table, deployment);
	await guaranteeUsers({table, deployment});
};

async function create(table: Table, deployment: Deployment)
{
	log('Creating...', table, deployment);
	const query = RethinkDB
		.db(table.database.name)
		.tableCreate
		(
			table.name,
			{
				shards: getClusterConfig('shards', table, deployment),
				replicas: getClusterConfig('replicas', table, deployment)
			}
		);
	await query.run(deployment.connection);
	log('Created.', table, deployment);
};

/** Returns the shards or replicas value for the table, working up the table-database-config hierarchy as appropriate. */
function getClusterConfig(parameter: 'shards' | 'replicas', table: Table, deployment: Deployment)
{
	const value = (parameter in table && table[parameter]) || (parameter in table.database && table.database[parameter]) || deployment.topology[parameter];
	return value;
};

async function guaranteeUsers({table, deployment}: {table: Table, deployment: Deployment})
{
	await Promise.all(table.users.map(user => guaranteeUser({user, table, deployment})));
};

async function guaranteeUser({user, table, deployment}: {user: TableUser, table: Table, deployment: Deployment})
{
	const permissions = generatePermissions({user});
	const query = RethinkDB
		.db(table.name)
		.grant(user.username, permissions);
	await query.run(deployment.connection);
};

function log(message: string, table: Table, deployment: Deployment)
{
	const generated = generateMessage(message, table);
	deployment.log(generated);
};

function generateMessage(message: string, table: Table)
{
	const generated = '[' + table.database.name + '][' + table.name + '] ' + message;
	return generated;
};