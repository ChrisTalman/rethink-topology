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

export namespace Topology
{
	export interface Base
	{
		shards: number;
		replicas: number;
		tables: Tables;
	};
	export interface Tables extends Array<Table> {};
	export interface Table
	{
		name: string;
		indexes: Indexes;
	};
	export interface Indexes extends Array<IndexVariant> {};
	export type IndexVariant =
		string
		| NameIndexVariant
		| CompoundIndex
	;
	export type NameIndexVariant =
		NameIndex
		| NameConvertIndex
		| NameArbitraryIndex
	;
	export interface NameIndex
	{
		name: string;
	}
	export interface NameConvertIndex extends NameIndex
	{
		convert: NumberConstructor;
	};
	export interface NameArbitraryIndex extends NameIndex
	{
		arbitrary: Function;
	};
	export interface CompoundIndex
	{
		compound: Array<CompoundIndexField>;
	};
	export type CompoundIndexField = string | NameIndex;
};