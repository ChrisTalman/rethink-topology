'use strict';

// External Modules
import * as Crypto from 'crypto';
import RethinkDB from 'rethinkdb';

// Internal Modules
import standardiseVariables from './StandardiseVariables';

// Types
import { Topology } from 'src/Types';
import { IndexList } from './GuaranteeIndexes';
interface Index
{
    index: string;
    ready: boolean;
    progress: number;
    function: Buffer;
    multi: boolean;
    geo: boolean;
    outdated: boolean;
	query: string;
};

export default async function(index: Topology.IndexVariant, indexList: IndexList, table: Topology.Table, connection: RethinkDB.Connection)
{
	const indexName = generateIndexName(index);
	const { indexFunction, indexHash } = generateIndexFunction(index);
	const exists = indexList.includes(indexName);
	let updated = false;
	if (exists)
	{
		if (indexHash)
		{
			const different = await isIndexDifferent({name: indexName, hash: indexHash, table});
			if (different)
			{
				await RethinkDB.table(table.name).indexDrop(indexName);
				updated = true;
			};
		}
		else
		{
			log('Exists.', indexName, table);
			return true;
		};
	};
	const query = RethinkDB
		.table(table.name)
		.indexCreate(indexName, indexFunction);
	log(updated ? 'Updating... ' : 'Creating...', indexName, table);
	try
	{
		await query.run(connection);
	}
	catch (error)
	{
		logError((updated ? 'Update' : 'Creation') + ' failed: ' + error.message, indexName, table);
		return;
	};
	log((updated ? 'Updated' : 'Created') + '.', indexName, table);
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
		return generateNameIndexName(index);
	}
	else
	{
		const name = index.compound.map(mapCompoundIndexName).join('_');
		return name;
	};
};

function generateNameIndexName(index: Topology.NameIndexVariant)
{
	let type: string;
	if ('convert' in index && index.convert === Number)
	{
		type = 'number';
	};
	return index.name + '=>' + type;
};

function mapCompoundIndexName(field: Topology.CompoundIndexField)
{
	if (typeof field === 'string')
	{
		return field;
	}
	else
	{
		if ('convert' in field && field.convert === Number)
		{
			return generateNameIndexName(field);
		}
		else
		{
			return field.name;
		};
	};
};

function generateIndexFunction(index: Topology.IndexVariant)
{
	let indexFunction: Function | Array<Function>;
	let indexHash: string;
	if (typeof index === 'string')
	{
		indexFunction = RethinkDB.row(index) as Function;
	}
	else if ('name' in index)
	{
		if ('convert' in index)
		{
			indexFunction = document => document(index.name).coerceTo('number') as Function;
		}
		else if ('arbitrary' in index)
		{
			indexFunction = document => index.arbitrary(document) as Function;
		}
		else
		{
			indexFunction = RethinkDB.row(index.name) as Function;
		};
	}
	else
	{
		indexFunction = index.compound.map(mapCompoundIndexFunction);
		indexHash = generateCompoundIndexFunctionHash(indexFunction);
	};
	return {indexFunction, indexHash};
};

function mapCompoundIndexFunction(field: Topology.CompoundIndexField)
{
	if (typeof field === 'string')
	{
		return RethinkDB.row(field) as Function;
	}
	else
	{
		if ('convert' in field)
		{
			return RethinkDB.row(field.name).coerceTo('number') as Function;
		}
		else if ('arbitrary' in field)
		{
			return document => field.arbitrary(document);
		}
		else
		{
			return RethinkDB.row(field.name) as Function;
		};
	};
};

function generateCompoundIndexFunctionHash(compound: Array<Function>)
{
	const source = standardiseVariables(compound.map(item => item.toString()).join(''));
    const hash = generateQueryHash(source);
	return hash;
};

function generateQueryHash(source: string)
{
	const hash = Crypto.createHash('sha1').update(source).digest('base64');
	return hash;
};

async function isIndexDifferent({name, hash, table}: {name: string, hash: string, table: Topology.Table})
{
	const index: Index = await RethinkDB.table(table.name).indexStatus(name).run();
	const existingHash = generateQueryHash(standardiseVariables(index.query));
	const different = hash !== existingHash;
	return different;
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