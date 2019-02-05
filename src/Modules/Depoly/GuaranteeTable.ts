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

export default async function({table, tableList, deployment}: {table: Table, tableList: TableList, deployment: Deployment})
{
	const tableId = await guarantee({table, tableList, deployment});
	await guaranteeIndexes({table, tableId, deployment});
};

async function guarantee({table, tableList, deployment}: {table: Table, tableList: TableList, deployment: Deployment})
{
	let tableId: string;
	const tableConfigItem = tableList.find(item => item.name === table.name);
	if (tableConfigItem)
	{
		log('Exists.', table, deployment);
		tableId = tableConfigItem.id;
	}
	else
	{
		tableId = await create({table, deployment});
	};
	await guaranteeUsers({table, tableId, deployment});
	return tableId;
};

async function create({table, deployment}: {table: Table, deployment: Deployment})
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
	const result = await query.run(deployment.connection);
	log('Created.', table, deployment);
	const id = result.config_changes[0].new_val.id;
	return id;
};

/** Returns the shards or replicas value for the table, working up the table-database-config hierarchy as appropriate. */
function getClusterConfig(parameter: 'shards' | 'replicas', table: Table, deployment: Deployment)
{
	const value = (parameter in table && table[parameter]) || (parameter in table.database && table.database[parameter]) || deployment.topology[parameter];
	return value;
};

async function guaranteeUsers({table, deployment}: {table: Table, tableId: string, deployment: Deployment})
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