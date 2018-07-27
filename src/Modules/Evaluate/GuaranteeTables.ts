'use strict';

// External Modules
import RethinkDB from 'rethinkdb';

// Internal Modules
import guaranteeTable from './GuaranteeTable';

// Types
import { Topology } from 'src/Types';
export interface TableList extends Array<string> {};

export default async function(topology: Topology.Base, connection)
{
	const list = await getTableList(connection);
	for (let table of topology.tables)
	{
		guaranteeTable(table, list, topology, connection);
	};
};

async function getTableList(connection)
{
	const query = RethinkDB.tableList();
	let list: TableList;
	try
	{
		list = await query.run(connection);
	}
	catch (error)
	{
		return;
	};
	return list;
};