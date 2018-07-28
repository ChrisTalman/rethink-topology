'use strict';

// External Modules
import RethinkDB from 'rethinkdb';

// Types
import { Topology } from 'src/Types';
import { IndexList } from './GuaranteeIndexes';

export default async function(index: Topology.IndexVariant, indexList: IndexList, table: Topology.Table, connection: RethinkDB.Connection)
{
	const indexName = generateIndexName(index);
	const indexFunction = generateIndexFunction(index);
	const exists = indexList.includes(indexName);
	if (exists)
	{
		log('Exists.', indexName, table);
		return true;
	};
	const query = RethinkDB
		.table(table.name)
		.indexCreate(indexName, indexFunction);
	log('Creating...', indexName, table);
	try
	{
		await query.run(connection);
	}
	catch (error)
	{
		logError('Creation failed: ' + error.message, indexName, table);
		return;
	};
	log('Created.', indexName, table);
	return true;
};

function generateIndexName(index: Topology.IndexVariant)
{
	if (typeof index === 'string')
	{
		return index;
	}
	else
	{
		const name = index.compound.join('_');
		return name;
	};
};

function generateIndexFunction(index: Topology.IndexVariant)
{
	if (typeof index === 'string')
	{
		return RethinkDB.row(index);
	}
	else
	{
		const indexFunction = index.compound.map(element => RethinkDB.row(element));
		return indexFunction;
	};
};

function log(message: string, indexName: string, table: Topology.Table)
{
	console.log(generateMessage(message, indexName, table));
};

function logError(message: string, indexName: string, table: Topology.Table)
{
	console.error(generateMessage(message, indexName, table));
};

function generateMessage(message: string, indexName: string, table: Topology.Table)
{
	const generated = '[Table][' + table.name + ']' + '[Index][' + indexName + '] ' + message;
	return generated;
};