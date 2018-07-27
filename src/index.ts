'use strict';

// Internal Modules
import config from 'src/Modules/Config';
import retrieve from 'src/Modules/Retrieve';

initialise();
function initialise()
{
	console.log(config.data);
	const topology = retrieve();
	if (!topology)
	{
		return;
	};
};