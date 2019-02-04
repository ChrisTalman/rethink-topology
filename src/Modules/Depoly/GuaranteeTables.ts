'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

// Internal Modules
import guaranteeTable from './GuaranteeTable';

// Types
import { Database } from 'src/Types/Topology';
import Deployment from './Deployment';
export interface TableList extends Array<string> {};
export interface TablePromises extends Array<TablePromise> {};
export interface TablePromise extends Promise<boolean> {};

export default async function(database: Database, deployment: Deployment)
{
	const list = await getTableList(database, deployment);
	await Promise.all(database.tables.map(table => guaranteeTable(table, list, deployment)));
};

async function getTableList(database: Database, deployment: Deployment)
{
	const query = RethinkDB
		.db(database.name)
		.tableList();
	const list: TableList = await query.run(deployment.connection);
	return list;
};