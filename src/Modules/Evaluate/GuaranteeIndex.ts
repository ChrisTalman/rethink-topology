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
	else if ('name' in index)
	{
		let type: string;
		if (index.convert === Number)
		{
			type = 'number';
		};
		return index.name + '=>' + type;
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
	else if ('name' in index)
	{
		if (index.convert)
		{
			return (document) => document(index.name).coerceTo('number');
		}
		else
		{
			return RethinkDB.row(index.name);
		};
	}
	else
	{
		const indexFunction = index.compound.map(mapCompoundIndex);
		return indexFunction;
	};
};

function mapCompoundIndex(field: Topology.CompoundIndexField)
{
	if (typeof field === 'string')
	{
		return RethinkDB.row(field);
	}
	else
	{
		if (field.convert)
		{
			return RethinkDB.row(field.name).coerceTo('number');
		}
		else
		{
			return RethinkDB.row(field.name);
		};
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