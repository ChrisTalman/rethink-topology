'use strict';

// To Do: Incorporate results of deleteUndeclaredIndexes() into index results.

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

// Internal Modules
import guaranteeIndex from './GuaranteeIndex';
import { deleteUndeclaredIndexes } from './DeleteUndeclaredIndexes';

// Types
import { Table } from 'src/App/Types/Topology';
import Deployment from './Deployment';
export interface IndexList extends Array<string> {};

export default async function({table, tableId, deployment}: {table: Table, tableId: string, deployment: Deployment})
{
	const indexList = await getIndexList(table, deployment);
	await deleteUndeclaredIndexes({table, indexList, deployment});
	const indexResults = await Promise.all(table.indexes.map(index => guaranteeIndex({index, indexList, table, tableId, deployment})));
	return indexResults;
};

async function getIndexList(table: Table, deployment: Deployment)
{
	const query = RethinkDB
		.db(table.database.name)
		.table(table.name)
		.indexList();
	const list: IndexList = await query.run(deployment.connection);
	return list;
};