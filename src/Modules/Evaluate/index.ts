'use strict';

// Internal Modules
import generateConnection from './GenerateConnection';
import validateDatabase from './ValidateDatabase';
import guaranteeTables from './GuaranteeTables';

// Types
import { Topology } from 'src/Types';

export default async function(topology: Topology.Base)
{
	console.log('Connecting...');
    const connection = await generateConnection();
	if (!connection)
	{
		return;
	};
	console.log('Connected.');
	await run(topology, connection);
	console.log('Disconnecting...');
	await connection.close();
	console.log('Disconnect.');
};

export async function run(topology: Topology.Base, connection)
{
	const databaseValid = await validateDatabase(connection);
	if (!databaseValid)
	{
		return;
	};
	await guaranteeTables(topology, connection);
};