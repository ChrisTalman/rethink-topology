'use strict';

// External Modules
import { deploy } from 'src/App/Modules/Deploy';

deploy
(
	{
		rethink: './config.json',
		log: true,
		deleteUndeclaredIndexes: getCommandOptions().includes('--deleteUndeclaredIndexes'),
		outputNames: !getCommandOptions().includes('--noOutputNames')
	}
);

function getCommandOptions()
{
	const allOptions = process.argv.slice(2);
	const nodeOptions = process.execArgv;
	const commandOptions: Array<string> = [];
	for (let option of allOptions)
	{
		if (nodeOptions.includes(option)) continue;
		commandOptions.push(option);
	};
	return commandOptions;
};