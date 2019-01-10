'use strict';

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

// Internal Modules
import guaranteeIndexes from './GuaranteeIndexes';

// Types
import { Table } from 'src/Types/Topology';
import { TableList } from './GuaranteeTables';
import { Deployment } from './';

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
				shards: deployment.topology.shards,
				replicas: deployment.topology.replicas
			}
		);
	await query.run(deployment.connection);
	log('Created.', table, deployment);
};

function log(message: string, table: Table, deployment: Deployment)
{
	const generated = generateMessage(message, table);
	deployment.log(generated);
};

function generateMessage(message: string, table: Table)
{
	const generated = '[Table][' + table.name + '] ' + message;
	return generated;
};