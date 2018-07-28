'use strict';

// External Modules
import RethinkDB from 'rethinkdb';

// Internal Modules
import guaranteeIndexes from './GuaranteeIndexes';

// Types
import { Topology } from 'src/Types';
import { TableList } from './GuaranteeTables';

export default async function(table: Topology.Table, tableList: TableList, topology: Topology.Base, connection: RethinkDB.Connection)
{
	const tableGuaranteed = await guarantee(table, tableList, topology, connection);
	if (!tableGuaranteed)
	{
		return;
	};
	const indexesGuaranteed = await guaranteeIndexes(table, connection);
	if (!indexesGuaranteed)
	{
		return;
	};
	return true;
};

async function guarantee(table: Topology.Table, tableList: TableList, topology: Topology.Base, connection: RethinkDB.Connection)
{
	const exists = tableList.includes(table.name);
	if (!exists)
	{
		log('Creating...', table);
		const query = RethinkDB
			.tableCreate(table.name, {shards: topology.shards, replicas: topology.replicas});
		try
		{
			await query.run(connection);
		}
		catch (error)
		{
			logError('Creation failed: ' + error.message, table);
			return;
		};
		log('Created.', table);
	};
	return true;
};

function log(message: string, table: Topology.Table)
{
	console.log(generateMessage(message, table));
};

export function logError(message: string, table: Topology.Table)
{
	console.error(generateMessage(message, table));
};

function generateMessage(message: string, table: Topology.Table)
{
	const generated = '[Table][' + table.name + '] ' + message;
	return generated;
};