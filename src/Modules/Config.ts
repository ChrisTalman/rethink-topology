'use strict';

// External Modules
import Config from '@bluecewe/config';

// Types
import { ConfigData } from 'src/Modules/Types';

const config = new Config <ConfigData.Base> ();

try
{
	config.initialise();
}
catch (error)
{
	console.error('Failed to initialise config:', error.message);
};

export default config;