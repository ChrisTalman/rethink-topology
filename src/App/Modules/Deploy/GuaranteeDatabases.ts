'use strict';

// Internal Modules
import Deployment from './Deployment';
import guaranteeDatabase from './GuaranteeDatabase';

export default async function(deployment: Deployment)
{
	const databaseResults = await Promise.all(deployment.topology.databases.map(database => guaranteeDatabase(database, deployment)));
	return databaseResults;
};