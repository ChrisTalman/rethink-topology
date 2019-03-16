/// <reference types="rethinkdb-ts" >

// Types
import { RConnectionOptions } from 'rethinkdb-ts';
declare module '@bluecewe/rethink-topology'
{
    export interface Options
    {
    	/** Determines whether the default database 'tests' should be deleted. */
    	deleteDefaultDatabase?: boolean;
    	/** Log debugging events to console.log(). */
    	log?: boolean;
    	/** RethinkDB connection options. If string, used as JSON file path from which to obtain connection object. */
    	rethink: string | RConnectionOptions;
    }
    /** Loads topology from default location and deploys it to the database provided in the options. */
    export function deploy(options: Options): Promise<void>;
    export class ConnectionConfigFileError extends Error {}
}