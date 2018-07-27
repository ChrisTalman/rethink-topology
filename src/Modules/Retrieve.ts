'use strict';

// External Modules
import * as FileSystem from 'fs';

// Types
import { Topology } from 'src/Modules/Types';

export default function()
{
    let file: string;
	try
	{
		file = FileSystem.readFileSync('topology.json', 'utf8');
	}
	catch (error)
	{
		console.error('Topology not found:', error.message);
		return;
	};
	let topology: Topology;
	try
	{
		topology = JSON.parse(file);
	}
	catch (error)
	{
		console.error('Topology parse error:', error.message);
		return;
	};
	return topology;
};