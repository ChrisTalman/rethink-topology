/// <reference types="rethinkdb-ts" >

// Types
import { RDatum, RConnectionOptions } from 'rethinkdb-ts';
declare module '@chris-talman/rethink-topology'
{
	export interface Options
	{
		/** Topology to deploy instead of fetching from file system. */
		topology?: Topology;
		/** Determines whether the default database `tests` should be deleted. */
		deleteDefaultDatabase?: boolean;
		/** Determines whether undeclared indexes should be deleted. */
		deleteUndeclaredIndexes?: boolean;
		/** Determines whether `topology.names.json` should be output. */
		outputNames?: boolean;
		/** Log debugging events to console.log(). */
		log?: boolean;
		/** RethinkDB connection options. If string, used as JSON file path from which to obtain connection object. */
		rethink: string | RConnectionOptions;
	}
	/** Loads topology from default location and deploys it to the database provided in the options. */
	export function deploy(options: Options): Promise<void>;
	export class ConnectionConfigFileError extends Error {}
}

export interface Topology
{
	shards?: number;
	replicas?: number;
	users: GlobalUsers;
	databases: Databases;
}
export interface BaseUser
{
	username: string;
	read?: boolean;
	write?: boolean;
}
export interface GlobalUsers extends Array<string | GlobalUser> {}
export interface GlobalUser extends BaseUser
{
	connect?: boolean;
	config?: boolean;
}
export interface Databases extends Array<Database> {}
export interface Database
{
	name: string;
	shards?: number;
	replicas?: number;
	users: DatabaseUsers;
	tables: Tables;
}
export interface DatabaseUsers extends Array<DatabaseUser> {}
export interface DatabaseUser extends BaseUser
{
	config?: boolean;
}
export interface Tables extends Array<Table> {}
export interface Table
{
	name: string;
	shards?: number;
	replicas?: number;
	users: TableUsers;
	indexes?: Indexes;
	database: Database;
}
export interface TableUsers extends Array<TableUser> {}
export interface TableUser extends BaseUser
{
	config?: boolean;
}
export interface Indexes extends Array<IndexVariant> {}
export type IndexVariant =
	string
	| NameIndexVariant
	| SubfieldIndex
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
}
export interface NameArbitraryIndex extends NameIndex
{
	arbitrary: (document: RDatum) => any;
}
export interface SubfieldIndex
{
	subfield: Array<string>;
}
export interface CompoundIndex
{
	compound: Array<CompoundIndexField>;
}
export type CompoundIndexField = string | NameIndexVariant | SubfieldIndex;