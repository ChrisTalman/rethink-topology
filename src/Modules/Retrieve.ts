'use strict';

// External Modules
import * as FileSystem from 'fs';

// Types
import { Topology } from 'src/Types';

export default function()
{
    let file: string;
	try
	{
		file = FileSystem.readFileSync('topology.js', 'utf8');
	}
	catch (error)
	{
		console.error('Topology not found:', error.message);
		return;
	};
	let topology: Topology.Base;
	try
	{
		topology = eval(file);
	}
	catch (error)
	{
		console.error('Topology parse error:', error.message);
		return;
	};
	return topology;
};