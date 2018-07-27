'use strict';

// External Modules
import RethinkDB from 'rethinkdb';

// Types
import { Topology } from 'src/Types';

export default async function(index: string, table: Topology.Table, connection: RethinkDB.Connection)
{
	return true;
};