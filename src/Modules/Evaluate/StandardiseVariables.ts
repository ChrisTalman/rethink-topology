'use strict';

// Types
interface Variables extends Map <string, string> {};

// Constants
const STANDARDISE_VARIABLES_EXPRESSION = /var_?[\d]+/gi;

/** Replaces each dynamically generated Rethink variable, like 'var_0', with consistently incremented variables starting from 0. */
export default function(source: string)
{
	const variables: Variables = new Map();
	const replacement = source.replace
	(
		STANDARDISE_VARIABLES_EXPRESSION,
		match => replaceStandardisableVariable({match, variables})
	);
	return replacement;
};

function replaceStandardisableVariable({match, variables}: {match: string, variables: Variables})
{
	let variable = variables.get(match);
	if (!variable)
	{
		const newIdentifier = 'var_' + variables.size;
		variables.set(match, newIdentifier);
		variable = variables.get(match);
	};
	return variable;
};