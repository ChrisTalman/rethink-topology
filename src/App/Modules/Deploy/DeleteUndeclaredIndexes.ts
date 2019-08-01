'use strict';

// Internal Modules
import { generateIndexName, dropIndex } from './GuaranteeIndex';

// Types
import { Table } from 'src/App/Types/Topology';
import Deployment from './Deployment';
import { IndexList } from './GuaranteeIndexes';

/** If enabled in options, deletes any indexes which have not been declared. */
export async function deleteUndeclaredIndexes({table, indexList, deployment}: {table: Table, indexList: IndexList, deployment: Deployment})
{
	if (!deployment.options.deleteUndeclaredIndexes) return;
	const declaredIndexes: Set<string> = new Set();
	for (let index of table.indexes)
	{
		const indexName = generateIndexName(index);
		declaredIndexes.add(indexName);
	};
	const promises: Array<Promise<void>> = [];
	for (let indexName of indexList)
	{
		if (declaredIndexes.has(indexName)) continue;
		const promise = deleteUndeclaredIndex({table, indexName, deployment});
		promises.push(promise);
	};
	await Promise.all(promises);
};

async function deleteUndeclaredIndex({table, indexName, deployment}: {table: Table, indexName: string, deployment: Deployment})
{
	log({message: 'Deleting undeclared index...', indexName, table, deployment});
	await dropIndex(table, indexName, deployment);
	log({message: 'Deleted undeclared index.', indexName, table, deployment});
};

function log({message, indexName, table, deployment}: {message: string, indexName: string, table: Table, deployment: Deployment})
{
	const generated = '[' + table.name + '][' + table.name + '][' + indexName + '] ' + message;
	deployment.log(generated);
};