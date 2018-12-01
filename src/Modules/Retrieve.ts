'use strict';

// External Modules
import Joi from 'joi';
import * as FileSystem from 'fs';

// Types
import { Topology } from 'src/Types';

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
const SCHEMA = Joi.object
	(
		{
			shards: Joi.number().required(),
			replicas: Joi.number().required(),
			tables: Joi
				.array()
				.items
				(
					{
						name: Joi.string().required(),
						indexes: Joi
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
							.default([])
					}
				)
				.min(1)
				.required()
		}
	)
	.required();

export default function()
{
    let file: string;
	try
	{
		file = FileSystem.readFileSync(FILE_NAME, 'utf8');
	}
	catch (error)
	{
		console.error('Topology not found:', error.message);
		return;
	};
	let topology: Topology.Base;
	try
	{
		topology = eval(file);
	}
	catch (error)
	{
		console.error('Topology evaluation error:', error.message);
		return;
	};
	const validated = Joi.validate(topology, SCHEMA);
	if (validated.error)
	{
		console.error('Topology validation error:', validated.error.message);
		return;
	};
	topology = validated.value;
	return topology;
};