'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

// Internal Modules
import guaranteeTable from './GuaranteeTable';

// Types
import { Database } from 'src/App/Types/Topology';
import Deployment from './Deployment';
export interface TableList extends Array<TableListItem> {};
export interface TableListItem
{
	id: string;
	name: string;
};
export interface TablePromises extends Array<TablePromise> {};
export interface TablePromise extends Promise<boolean> {};

export default async function(database: Database, deployment: Deployment)
{
	const tableList = await getTableList(database, deployment);
	const tableResults = await Promise.all(database.tables.map(table => guaranteeTable({table, tableList, deployment})));
	return tableResults;
};

async function getTableList(database: Database, deployment: Deployment)
{
	const query = RethinkDB
		.db('rethinkdb')
		.table('table_config')
		.filter({db: database.name})
		.pluck('id', 'name');
	const list = (await query.run(deployment.connection)) as TableList;
	return list;
};