'use strict';

// External Modules
import RethinkDB from 'rethinkdb';

// Internal Modules
import config from 'src/Modules/Config';

// Types
interface List extends Array<string> {};

export default async function(connection: RethinkDB.Connection)
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
        log('Exists.');
	}
	else
	{
        logError('Doesn\'t exist.');
	};
    return valid;
};

function log(message: string)
{
	console.log('[Database] [' + config.data.rethink.db + '] ' + message);
};

export function logError(message: string)
{
	console.error('[Database] [' + config.data.rethink.db + '] ' + message);
};