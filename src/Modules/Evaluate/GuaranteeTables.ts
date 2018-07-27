'use strict';

// External Modules
import RethinkDB from 'rethinkdb';

// Internal Modules
import guaranteeTable from './GuaranteeTable';

// Types
import { Topology } from 'src/Types';
export interface TableList extends Array<string> {};
export interface TablePromises extends Array<TablePromise> {};
export interface TablePromise extends Promise<boolean> {};

export default async function(topology: Topology.Base, connection)
{
	const list = await getTableList(connection);
	const promises: TablePromises = [];
	for (let table of topology.tables)
	{
		const promise = guaranteeTable(table, list, topology, connection);
		promises.push(promise);
	};
	await Promise.all(promises);
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