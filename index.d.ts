/// <reference types="rethinkdb-ts" >

// Types
import { RConnectionOptions } from 'rethinkdb-ts';

/** Loads topology from default location and deploys it to the database provided in the options. */
declare module '@bluecewe/rethink-topology'
{
    export interface Options
    {
    	/** Log debugging events to console.log(). */
    	log?: boolean;
    	/** RethinkDB connection options. */
    	rethink: RConnectionOptions;
    }
    export function deploy({options}: {options: Options}): Promise<void>;
}