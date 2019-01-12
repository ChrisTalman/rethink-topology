'use strict';

// To Do: Ensure that standalone arbitrary function indexes function correctly and are also updated when they change.

// External Modules
import { r as RethinkDB } from 'rethinkdb-ts';

// Types
import { RDatum } from 'rethinkdb-ts';
import { Table, IndexVariant, NameIndexVariant, CompoundIndexField } from 'src/Types/Topology';
import { IndexList } from './GuaranteeIndexes';
import { Deployment } from './';
type IndexFunction = (document: RDatum) => any;

export default async function(index: IndexVariant, indexList: IndexList, table: Table, deployment: Deployment)
{
	const indexName = generateIndexName(index);
	const indexFunction = generateIndexFunction({index});
	const exists = indexList.includes(indexName);
	let updated = false;
	if (exists)
	{
		const different = await isIndexDifferent({name: indexName, indexFunction, table, deployment});
		if (different)
		{
			await dropIndex(table, indexName, deployment);
			updated = true;
		}
		else
		{
			log('Exists.', indexName, table, deployment);
			return;
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

function generateIndexFunction({index}: {index: IndexVariant})
{
	let indexFunction: IndexFunction;
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
	};
	return indexFunction;
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

async function isIndexDifferent({name, indexFunction, table, deployment}: {name: string, indexFunction: IndexFunction, table: Table, deployment: Deployment})
{
	await createComparisonIndex({name, indexFunction, deployment});
	const query = RethinkDB
		.ne
		(
			RethinkDB
				.db(table.database.name)
				.table(table.name)
				.indexStatus(name)
				('function'),
			RethinkDB
				.db(deployment.indexComparisonTable.database)
				.table(deployment.indexComparisonTable.name)
				.indexStatus(name)
				('function')
		);
	const different = await query.run(deployment.connection);
	return different;
};

async function createComparisonIndex({name, indexFunction, deployment}: {name: string, indexFunction: IndexFunction, deployment: Deployment})
{
	const query = RethinkDB
		.db(deployment.indexComparisonTable.database)
		.table(deployment.indexComparisonTable.name)
		.indexCreate(name, indexFunction);
	await query.run(deployment.connection);
};

function log(message: string, indexName: string, table: Table, deployment: Deployment)
{
	const generated = generateMessage(message, indexName, table);
	deployment.log(generated);
};

function generateMessage(message: string, indexName: string, table: Table)
{
	const generated = '[' + table.database.name + '][' + table.name + ']' + '[' + indexName + '] ' + message;
	return generated;
};