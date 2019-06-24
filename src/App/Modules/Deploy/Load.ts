'use strict';

// External Modules
import Joi from 'joi';
import { promises as FileSystemPromises } from 'fs';
const { readFile } = FileSystemPromises;

// Types
import { Topology } from 'src/App/Types/Topology';

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
const TABLE_USER_SCHEMA = Joi
	.object
	(
		{
			username: Joi.string().required(),
			config: Joi.boolean().optional(),
			read: Joi.boolean().optional(),
			write: Joi.boolean().optional()
		}
	);
const TABLES_SCHEMA = Joi
	.array()
	.items
	(
		{
			name: Joi.string().required(),
			shards: SHARDS_SCHEMA.optional(),
			replicas: REPLICAS_SCHEMA.optional(),
			users: Joi.array().items(TABLE_USER_SCHEMA).default([]),
			indexes: INDEXES_SCHEMA
		}
	)
	.min(1)
	.required();
const DATABASE_USER_SCHEMA = Joi
	.object
	(
		{
			username: Joi.string().required(),
			config: Joi.boolean().optional(),
			read: Joi.boolean().optional(),
			write: Joi.boolean().optional()
		}
	);
const DATABASES_SCHEMA = Joi
	.array()
	.items
	(
		{
			name: Joi.string().required(),
			shards: SHARDS_SCHEMA.optional(),
			replicas: REPLICAS_SCHEMA.optional(),
			users: Joi.array().items(DATABASE_USER_SCHEMA).default([]),
			tables: TABLES_SCHEMA
		}
	);
const GLOBAL_USER_SCHEMA = Joi
	.object
	(
		{
			username: Joi.string().required(),
			config: Joi.boolean().optional(),
			connect: Joi.boolean().optional(),
			read: Joi.boolean().optional(),
			write: Joi.boolean().optional()
		}
	);
const SCHEMA = Joi.object
	(
		{
			shards: SHARDS_SCHEMA.default(1),
			replicas: REPLICAS_SCHEMA.default(1),
			users: Joi.array().items(Joi.string(), GLOBAL_USER_SCHEMA).default([]),
			databases: DATABASES_SCHEMA
		}
	)
	.required();

/** Fetches and validates topology from file. */
export default async function load()
{
    let topology: Topology;
	try
	{
		topology = require(FILE_NAME);
	}
	catch (error)
	{
		throw new TopologyFileError(error);
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

class TopologySchemaError extends Error
{
	constructor(message)
	{
		super(message);
	};
};