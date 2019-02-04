'use strict';

// External Modules
import { promises as FileSystemPromises } from 'fs';
const { readFile } = FileSystemPromises;
import * as Joi from 'joi';
import { r as RethinkDB } from 'rethinkdb-ts';

// Internal Modules
import Deployment from './Deployment';

// Types
import { GlobalUser } from 'src/Types/Topology';
interface Passwords
{
	[username: string]: string;
};

// Constants
const FILE_PATH = './passwords.json';
const SCHEMA = Joi
    .object()
    .pattern(/.+/, Joi.string())
    .required()
    .label('passwords');

/** Guarantees users globally. */
export default async function({deployment}: {deployment: Deployment})
{
    const passwords = await load();
	await Promise.all
	(
		deployment.topology.users.map
		(
			user => guaranteeUser({user, passwords, deployment})
		)
	);
};

async function guaranteeUser({user, passwords, deployment}: {user: string | GlobalUser, passwords: Passwords, deployment: Deployment})
{
	const username = typeof user === 'string' ? user : user.username;
	const password = passwords[username];
	if (typeof password !== 'string') throw new PasswordNotFound({username});
	await overwriteUser({username, password, deployment});
	await guaranteeUserPermissions({user, username, deployment});
};

async function guaranteeUserPermissions({user, username, deployment}: {user: string | GlobalUser, username: string, deployment: Deployment})
{
	const permissions = generatePermissions({user});
	if (Object.keys(permissions).length === 0) return;
	const query = RethinkDB.grant(username, permissions);
	await query.run(deployment.connection);
};

function generatePermissions({user}: {user: string | GlobalUser})
{
	let permissions: { [permission: string]: boolean } = {};
	if (typeof user !== 'object')
	{
		for (let permission of Object.keys(user))
		{
			if (permission !== 'username') permissions[permission] = user[permission];
		};
	};
	return permissions;
};

async function overwriteUser({username, password, deployment}: {username: string, password: string, deployment: Deployment})
{
	const query = RethinkDB
		.db('rethinkdb')
		.table('users')
		.insert({id: username, password}, {conflict: 'replace'});
	await query.run(deployment.connection);
};

async function load()
{
	let source: string;
    try
    {
        source = await readFile(FILE_PATH, 'utf8');
    }
    catch (error)
    {
        throw new PasswordsFileError(error);
    };
	let passwords: Passwords;
	try
	{
		passwords = JSON.parse(source);
	}
	catch (error)
	{
		throw new PasswordsJsonError(error);
	};
	const validated = Joi.validate(passwords, SCHEMA);
	if (validated.error) throw new PasswordsSchemaError(validated.error.message);
	return passwords;
};

class PasswordsFileError extends Error
{
	constructor(error: Error)
	{
		super(error.message);
	};
};

class PasswordsJsonError extends Error
{
	constructor(error: Error)
	{
		super(error.message);
	};
};

class PasswordsSchemaError extends Error
{
	constructor(message)
	{
		super(message);
	};
};

class PasswordNotFound extends Error
{
	constructor({username}: {username: string})
	{
		const message = 'Password not found for \'' + username + '\'';
		super(message);
	};
};