'use strict';

// External Modules
import RethinkDB from 'rethinkdb';

// Types
import { Topology } from 'src/Types';
import { TableList } from './GuaranteeTables';

export default async function(table: Topology.Table, tableList: TableList, topology: Topology.Base, connection)
{
	const tableExists = tableList.includes(table.name)
	if (!tableExists)
	{
		log('Creating...', table);
		const created = await create(table, connection);
		if (!created)
		{
			return;
		};
	};
};

async function create(table: Topology.Table, connection)
{
	const query = RethinkDB
		.tableCreate(table.name);
	try
	{
		await query.run(connection);
	}
	catch (error)
	{
		logError('Failed creation: ' + error.message, table);
		return;
	};
	return true;
};

function log(message: string, table: Topology.Table)
{
	console.log('[Table] [' + table.name + '] ' + message);
};

function logError(message: string, table: Topology.Table)
{
	console.error('[Table] [' + table.name + '] ' + message);
};