'use strict';

// To Do: Ensure that standalone arbitrary function indexes function correctly and are also updated when they change.

// External Modules
import * as Crypto from 'crypto';
import { ulid } from 'ulid';
import { r as RethinkDB } from 'rethinkdb-ts';

// Internal Modules
import standardiseQuery from './standardiseQuery';
import standardiseVariables from './StandardiseVariables';

// Types
import { IndexStatus as BaseIndexStatus, RDatum } from 'rethinkdb-ts';
import { Table, IndexVariant, NameIndexVariant, CompoundIndexField } from 'src/Types/Topology';
import { IndexList } from './GuaranteeIndexes';
import { Deployment } from './';
type IndexFunction = (document: RDatum) => any;
interface IndexStatus extends BaseIndexStatus
{
	query: string;
};

export default async function(index: IndexVariant, indexList: IndexList, table: Table, deployment: Deployment)
{
	const indexName = generateIndexName(index);
	const { indexFunction, indexHash } = generateIndexFunction({index, indexName});
	const exists = indexList.includes(indexName);
	let updated = false;
	if (exists)
	{
		if (indexHash)
		{
			const different = await isIndexDifferent({name: indexName, hash: indexHash, table, deployment});
			if (different)
			{
				await dropIndex(table, indexName, deployment);
				updated = true;
			};
		};
		if (!indexHash || (indexHash && !updated))
		{
			log('Exists.', indexName, table, deployment);
			return true;
		};
	};
	log(updated ? 'Updating... ' : 'Creating...', indexName, table, deployment);
	await createIndex(table, indexName, indexFunction, deployment);
	log((updated ? 'Updated' : 'Created') + '.', indexName, table, deployment);
};

async function dropIndex(table: Table, indexName: string, deployment: Deployment)
{
	const query = RethinkDB
		.db(table.database.name)
		.table(table.name)
		.indexDrop(indexName);
	await query.run(deployment.connection);
};

async function createIndex(table: Table, indexName: string, indexFunction: IndexFunction, deployment: Deployment)
{
	const query = RethinkDB
		.db(table.database.name)
		.table(table.name)
		.indexCreate(indexName, indexFunction);
	await query.run(deployment.connection);
};

function generateIndexName(index: IndexVariant)
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

function generateNameIndexName(index: NameIndexVariant)
{
	let type: string;
	if ('convert' in index && index.convert === Number) type = 'number';
	const name = type ? index.name + '=>' + type : index.name;
	return name;
};

function mapCompoundIndexName(field: CompoundIndexField)
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

function generateIndexFunction({index, indexName}: {index: IndexVariant, indexName: string})
{
	let indexFunction: IndexFunction;
	let indexHash: string;
	if (typeof index === 'string')
	{
		indexFunction = RethinkDB.row(index) as IndexFunction;
	}
	else if ('name' in index)
	{
		if ('convert' in index)
		{
			indexFunction = RethinkDB.row(index.name).coerceTo('number') as IndexFunction;
		}
		else if ('arbitrary' in index)
		{
			indexFunction = index.arbitrary(RethinkDB.row);
		}
		else
		{
			indexFunction = RethinkDB.row(index.name) as IndexFunction;
		};
	}
	else
	{
		indexFunction = document => index.compound.map(field => mapCompoundIndexFunction({field, document}));
		indexHash = generateCompoundIndexFunctionHash(indexFunction, indexName);
	};
	return {indexFunction, indexHash};
};

function mapCompoundIndexFunction({field, document}: {field: CompoundIndexField, document: any})
{
	if (typeof field === 'string')
	{
		return document(field) as IndexFunction;
	}
	else
	{
		if ('convert' in field)
		{
			return document(field.name).coerceTo('number') as IndexFunction;
		}
		else if ('arbitrary' in field)
		{
			return field.arbitrary(document);
		}
		else
		{
			return document(field.name) as IndexFunction;
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

async function isIndexDifferent({name, hash, table, deployment}: {name: string, hash: string, table: Table, deployment: Deployment})
{
	const index = await RethinkDB.table(table.name).indexStatus(name).nth(0).run(deployment.connection) as IndexStatus;
	const existingQuery = standardiseQuery(index.query);
	const existingHash = generateQueryHash(existingQuery);
	const different = hash !== existingHash;
	return different;
};

function log(message: string, indexName: string, table: Table, deployment: Deployment)
{
	const generated = generateMessage(message, indexName, table);
	deployment.log(generated);
};

function generateMessage(message: string, indexName: string, table: Table)
{
	const generated = '[Table][' + table.name + ']' + '[Index][' + indexName + '] ' + message;
	return generated;
};