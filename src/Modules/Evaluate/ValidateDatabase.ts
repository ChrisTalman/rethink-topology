'use strict';

// External Modules
import RethinkDB from 'rethinkdb';

// Internal Modules
import config from 'src/Modules/Config';

// Types
interface List extends Array<string> {};

export default async function(connection)
{
    let list: List;
    try
    {
        list = await RethinkDB.dbList().run(connection);
    }
    catch (error)
    {
        console.error(error.message);
        return;
    };
    const valid = list.includes(config.data.rethink.db);
	if (valid)
	{
		console.log('[Database] [' + config.data.rethink.db + '] Exists.');
	}
	else
	{
        console.log('[Database] [' + config.data.rethink.db + '] Doesn\'t exist.');
	};
    return valid;
};