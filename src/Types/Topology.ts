'use strict';

export interface Topology
{
    shards?: number;
    replicas?: number;
    databases: Databases;
};
export interface Databases extends Array<Database> {};
export interface Database
{
    name: string;
    shards?: number;
    replicas?: number;
    tables: Tables;
};
export interface Tables extends Array<Table> {};
export interface Table
{
    name: string;
    shards?: number;
    replicas?: number;
    indexes: Indexes;
    database: Database;
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