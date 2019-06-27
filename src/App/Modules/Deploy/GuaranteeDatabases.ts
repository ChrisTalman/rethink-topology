'use strict';

// Internal Modules
import Deployment from './Deployment';
import guaranteeDatabase from './GuaranteeDatabase';

export default async function(deployment: Deployment)
{
	await Promise.all
	(
		deployment.topology.databases.map(database => guaranteeDatabase(database, deployment))
	);
};