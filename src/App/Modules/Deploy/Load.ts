'use strict';

// External Modules
import { join as joinPath } from 'path';
import Joi from '@hapi/joi';

// Types
import { Topology } from 'src/App/Types/Topology';

// Constants
const FILE_PATH = './topology.config.js';
const ABSOLUTE_FILE_PATH = joinPath(process.cwd(), FILE_PATH).replace(/\\/g, '\\\\');
const SUBFIELD_INDEX_SCHEMA =
{
	subfield: Joi.array().items(Joi.string()).min(2)
};
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
		SUBFIELD_INDEX_SCHEMA,
		{
			compound: Joi
				.array()
				.items
				(
					Joi.string(),
					NAME_INDEX_SCHEMA,
					SUBFIELD_INDEX_SCHEMA
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
export async function load()
{
    let topology: Topology;
	try
	{
		topology = eval('require(\'' + ABSOLUTE_FILE_PATH + '\')');
	}
	catch (error)
	{
		throw new TopologyFileError(error);
	};
	topology = validate(topology);
	return topology;
};

export function validate(topology: Topology)
{
	const validated = Joi.compile(SCHEMA).validate(topology);
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
	constructor(message: string)
	{
		super(message);
	};
};