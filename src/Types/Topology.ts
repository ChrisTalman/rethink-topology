'use strict';

export interface Topology
{
    shards?: number;
    replicas?: number;
    users: GlobalUsers;
    databases: Databases;
};
export interface BaseUser
{
    username: string;
};
export interface GlobalUsers extends Array<string | GlobalUser> {};
export interface GlobalUser extends BaseUser
{
    connect?: boolean;
    config?: boolean;
};
export interface Databases extends Array<Database> {};
export interface Database
{
    name: string;
    shards?: number;
    replicas?: number;
    users: DatabaseUsers;
    tables: Tables;
};
export interface DatabaseUsers extends Array<DatabaseUser> {};
export interface DatabaseUser extends BaseUser
{
    config?: boolean;
};
export interface Tables extends Array<Table> {};
export interface Table
{
    name: string;
    shards?: number;
    replicas?: number;
    users: TableUsers;
    indexes?: Indexes;
    database: Database;
};
export interface TableUsers extends Array<TableUser> {};
export interface TableUser extends BaseUser
{
    config?: boolean;
    read?: boolean;
    write?: boolean;
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
export type CompoundIndexField = string | NameIndexVariant;