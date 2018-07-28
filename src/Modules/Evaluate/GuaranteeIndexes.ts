'use strict';

// External Modules
import RethinkDB from 'rethinkdb';

// Internal Modules
import { logError as logTableError } from './GuaranteeTable';
import guaranteeIndex from './GuaranteeIndex';

// Types
import { Topology } from 'src/Types';
export interface IndexList extends Array<string> {};
interface IndexPromises extends Array<IndexPromise> {};
interface IndexPromise extends Promise<boolean> {};

export default async function(table: Topology.Table, connection: RethinkDB.Connection)
{
	const indexList = await getIndexList(table, connection);
	if (!indexList)
	{
		return;
	};
	const promises: IndexPromises = [];
	for (let index of table.indexes)
	{
		const promise = guaranteeIndex(index, indexList, table, connection);
		promises.push(promise);
	};
	await Promise.all(promises);
	return true;
};

async function getIndexList(table: Topology.Table, connection: RethinkDB.Connection)
{
	const query = RethinkDB
		.table(table.name)
		.indexList();
	let list: IndexList;
	try
	{
		list = await query.run(connection);
	}
	catch (error)
	{
		logTableError('Failed index list retrieval:', error.message);
		return;
	};
	return list;
};