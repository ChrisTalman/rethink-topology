'use strict';

// External Modules
import { promises as FileSystemPromises } from 'fs';
const { writeFile } = FileSystemPromises;
import { js as beuatify } from 'js-beautify';

// Intenral Modules
import Deployment from './Deployment';

// Types
import { DatabaseResults } from './GuaranteeDatabase';
interface DatabaseNames
{
	[databaseName: string]: DatabaseName;
};
interface DatabaseName
{
	name: string;
	tables: TableNames;
};
interface TableNames
{
	[tableName: string]: TableName;
};
interface TableName
{
	name: string;
	indexes: IndexNames;
};
interface IndexNames
{
	[indexName: string]: string;
};

// Constants
const FILE_PATH = './topology.names.json';
const BEAUTIFY_OPTIONS: JsBeautifyOptions =
{
	brace_style: 'expand',
	indent_with_tabs: true
};

export async function outputNames({databaseResults, deployment}: {databaseResults: DatabaseResults, deployment: Deployment})
{
	if (!deployment.options.outputNames) return;
	const databaseNames: DatabaseNames = {};
	for (let databaseResult of databaseResults)
	{
		const tableNames: TableNames = {};
		for (let tableResult of databaseResult.tables)
		{
			const indexNames: IndexNames = {};
			for (let indexResult of tableResult.indexes)
			{
				indexNames[indexResult.name] = indexResult.name;
			};
			tableNames[tableResult.name] =
			{
				name: tableResult.name,
				indexes: indexNames
			};
		};
		databaseNames[databaseResult.name] =
		{
			name: databaseResult.name,
			tables: tableNames
		};
	};
	const sourceUnformatted = JSON.stringify(databaseNames);
	const source = beuatify(sourceUnformatted, BEAUTIFY_OPTIONS);
	await writeFile(FILE_PATH, source);
};