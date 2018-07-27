'use strict';

export namespace ConfigData
{
	export interface Base
	{
		rethink: Rethink;
	};
	interface Rethink
	{
		host: string;
		port: number;
		db: string;
		user: string;
		password: string;
	};
};

export interface Topology
{
	shards: number;
	replicas: number;
};