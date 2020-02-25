'use strict';

// To Do: Create users specified in topology config file, using passwords from separte passwords file.
// To Do: Check own user permissions before any operations (including index comparison).

// Internal Modules
import { load, validate } from './Load';
import Deployment from './Deployment';
import guaranteeUsers from './GuaranteeUsers';
import guaranteeDatabases from './GuaranteeDatabases';
import { outputNames } from './Names';

// Types
import { Options } from './Deployment';

/** Loads topology from default location and deploys it to the database provided in the options. */
export async function deploy(options: Options)
{
	const topology = options.topology ? validate(options.topology) : await load();
	const deployment = new Deployment({topology, options});
	await deployment.initialise();
	try
	{
		await executeDeploy(deployment);
	}
	catch (error)
	{
		console.error(error.stack || error);
		throw error;
	}
	finally
	{
		await deployment.finish();
	};
};

/** Deploys deployment. */
export async function executeDeploy(deployment: Deployment)
{
	await guaranteeUsers({deployment});
	const databaseResults = await guaranteeDatabases(deployment);
	await outputNames({databaseResults, deployment});
};