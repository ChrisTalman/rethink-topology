'use strict';

// Internal Modules
import standardiseVariables from './StandardiseVariables';

// Constants
const WHITESPACE_EXPRESSION = /\s+/gi;

export default function(source: string)
{
    const standardised = stripWhitespace(standardiseVariables(source));
    return standardised;
};

function stripWhitespace(source: string)
{
    const replaced = source.replace(WHITESPACE_EXPRESSION, match => match === ' ' ? match : '');
    return replaced;
};