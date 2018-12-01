'use strict';

// To Do: Ensure that standalone arbitrary function indexes function correctly and are also updated when they change.

// External Modules
import * as Crypto from 'crypto';
import { ulid } from 'ulid';
import RethinkDB from 'rethinkdb';

// Internal Modules
import standardiseQuery from './standardiseQuery';
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
	const { indexFunction, indexHash } = generateIndexFunction({index, indexName});
	const exists = indexList.includes(indexName);
	let updated = false;
	if (exists)
	{
		if (indexHash)
		{
			const different = await isIndexDifferent({name: indexName, hash: indexHash, table, connection});
			if (different)
			{
				await RethinkDB.table(table.name).indexDrop(indexName).run(connection);
				updated = true;
			};
		};
		if (!indexHash || (indexHash && !updated))
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
	if ('convert' in index && index.convert === Number) type = 'number';
	const name = type ? index.name + '=>' + type : index.name;
	return name;
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

function generateIndexFunction({index, indexName}: {index: Topology.IndexVariant, indexName: string})
{
	let indexFunction: Function;
	let indexHash: string;
	if (typeof index === 'string')
	{
		indexFunction = RethinkDB.row(index) as Function;
	}
	else if ('name' in index)
	{
		if ('convert' in index)
		{
			indexFunction = RethinkDB.row(index.name).coerceTo('number') as Function;
		}
		else if ('arbitrary' in index)
		{
			indexFunction = index.arbitrary(RethinkDB.row);
		}
		else
		{
			indexFunction = RethinkDB.row(index.name) as Function;
		};
	}
	else
	{
		indexFunction = document => index.compound.map(field => mapCompoundIndexFunction({field, document}));
		indexHash = generateCompoundIndexFunctionHash(indexFunction, indexName);
	};
	return {indexFunction, indexHash};
};

function mapCompoundIndexFunction({field, document}: {field: Topology.CompoundIndexField, document: any})
{
	if (typeof field === 'string')
	{
		return document(field) as Function;
	}
	else
	{
		if ('convert' in field)
		{
			return document(field.name).coerceTo('number') as Function;
		}
		else if ('arbitrary' in field)
		{
			return field.arbitrary(document);
		}
		else
		{
			return document(field.name) as Function;
		};
	};
};

function generateCompoundIndexFunctionHash(compound: Function, indexName: string)
{
	const id = ulid();
	const placeholdered = compound(RethinkDB.expr({placeholder: id})).toString();
	const variabled = replaceDocumentPlaceholder(placeholdered);
	const spaced = replaceSpacelessCommas(variabled);
	const standardised = standardiseVariables(spaced);
	const encapsulated = encapsulateCompoundIndexQuery(standardised, indexName);
    const hash = generateQueryHash(encapsulated);
	return hash;
};

function replaceDocumentPlaceholder(source: string)
{
	const EXPRESSION = /(?:r\(\{"placeholder": "[\w]+"\}\)|{"placeholder": "[\w]+"\})/g;
	const replaced = source.replace(EXPRESSION, 'var_0');
	return replaced;
};

function replaceSpacelessCommas(source: string)
{
	const EXPRESSION = /,(?! )/g;
	const replaced = source.replace(EXPRESSION, match => match + ' ');
	return replaced;
};

function encapsulateCompoundIndexQuery(source: string, indexName: string)
{
	const encapsulated = 'indexCreate(\'' + indexName + '\', function(var_0) { return r.expr([' + source + ']); })';
	return encapsulated;
};

function generateQueryHash(source: string)
{
	const hash = Crypto.createHash('sha1').update(source).digest('base64');
	return hash;
};

async function isIndexDifferent({name, hash, table, connection}: {name: string, hash: string, table: Topology.Table, connection: RethinkDB.Connection})
{
	const index: Index = await RethinkDB.table(table.name).indexStatus(name).nth(0).run(connection);
	const existingQuery = standardiseQuery(index.query);
	const existingHash = generateQueryHash(existingQuery);
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