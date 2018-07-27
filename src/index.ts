'use strict';

// Internal Modules
import config from 'src/Modules/Config';
import retrieve from 'src/Modules/Retrieve';

initialise();
function initialise()
{
	if (!config.initialised)
	{
		return;
	};
	const topology = retrieve();
	if (!topology)
	{
		return;
	};
};