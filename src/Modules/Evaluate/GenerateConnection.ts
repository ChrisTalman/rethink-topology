'use strict';

// External Modules
import RethinkDB from 'rethinkdb';

// Internal Modules
import config from 'src/Modules/Config';

export default async function()
{
	let connection;
    try
    {
        connection = await RethinkDB.connect(config.data.rethink);
    }
    catch (error)
    {
        console.error('RethinkDB connection failure:', error.message);
        return;
    };
	return connection;
};