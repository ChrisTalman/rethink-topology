'use strict';

// External Modules
import Joi from 'joi';
import { promises as FileSystemPromises } from 'fs';
const { readFile } = FileSystemPromises;

// Types
import { Topology } from 'src/Types/Topology';

// Constants
const FILE_NAME = 'topology.config.js';
const ARBITRARY_INDEX_SCHEMA = Joi.func().optional();
const NAME_INDEX_SCHEMA = Joi.object
	(
		{
			name: Joi.string().required(),
			convert: Joi.valid(Number).optional(),
			arbitrary: ARBITRARY_INDEX_SCHEMA
		}
	)
	.without('convert', ['arbitrary']);
const INDEXES_SCHEMA = Joi
	.array()
	.items
	(
		Joi.string(),
		NAME_INDEX_SCHEMA,
		{
			compound: Joi
				.array()
				.items
				(
					Joi.string(),
					NAME_INDEX_SCHEMA
				)
				.min(1)
				.optional()
		}
	)
	.default([]);
const SHARDS_LIMIT = 64;
const SHARDS_SCHEMA = Joi.number().integer().greater(0).less(SHARDS_LIMIT - 1);
const REPLICAS_SCHEMA = Joi.number().integer().greater(0);
const TABLES_SCHEMA = Joi
	.array()
	.items
	(
		{
			name: Joi.string().required(),
			shards: SHARDS_SCHEMA.optional(),
			replicas: REPLICAS_SCHEMA.optional(),
			indexes: INDEXES_SCHEMA
		}
	)
	.min(1)
	.required();
const DATABASES_SCHEMA = Joi
	.array()
	.items
	(
		{
			name: Joi.string().required(),
			shards: SHARDS_SCHEMA.optional(),
			replicas: REPLICAS_SCHEMA.optional(),
			tables: TABLES_SCHEMA
		}
	);
const SCHEMA = Joi.object
	(
		{
			shards: SHARDS_SCHEMA.default(1),
			replicas: REPLICAS_SCHEMA.default(1),
			databases: DATABASES_SCHEMA
		}
	)
	.required();

export default async function()
{
    let source: string;
	try
	{
		source = await readFile(FILE_NAME, 'utf8');
	}
	catch (error)
	{
		throw new TopologyFileError(error);
	};
	let topology: Topology;
	try
	{
		topology = eval(source);
	}
	catch (error)
	{
		throw new TopologyEvaluationError(error.message);
	};
	const validated = Joi.validate(topology, SCHEMA);
	if (validated.error) throw new TopologySchemaError(validated.error.message);
	topology = validated.value;
	for (let database of topology.databases)
	{
		for (let table of database.tables)
		{
			table.database = database;
		};
	};
	return topology;
};

class TopologyFileError extends Error
{
	constructor(error: Error)
	{
		super(error.message);
	};
};

class TopologyEvaluationError extends Error
{
	constructor(error: Error)
	{
		super(error.message);
	};
};

class TopologySchemaError extends Error
{
	constructor(message)
	{
		super(message);
	};
};