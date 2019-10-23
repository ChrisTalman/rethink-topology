'use strict';

// To Do: Create users specified in topology config file, using passwords from separte passwords file.
// To Do: Check own user permissions before any operations (including index comparison).

// Internal Modules
import load from './Load';
import Deployment from './Deployment';
import guaranteeUsers from './GuaranteeUsers';
import guaranteeDatabases from './GuaranteeDatabases';
import { outputNames } from './Names';

// Types
import { Options } from './Deployment';

/** Loads topology from default location and deploys it to the database provided in the options. */
export default async function(options: Options)
{
	const topology = await load();
	const deployment = new Deployment({topology, options});
	await deployment.initialise();
	try
	{
		await deploy(deployment);
	}
	catch (error)
	{
		throw error;
	}
	finally
	{
		await deployment.finish();
	};
};

/** Deploys deployment. */
export async function deploy(deployment: Deployment)
{
	await guaranteeUsers({deployment});
	const databaseResults = await guaranteeDatabases(deployment);
	await outputNames({databaseResults, deployment});
};