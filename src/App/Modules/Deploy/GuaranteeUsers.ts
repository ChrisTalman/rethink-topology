'use strict';

// External Modules
import { promises as FileSystemPromises } from 'fs';
const { readFile } = FileSystemPromises;
import * as Joi from 'joi';
import { r as RethinkDB } from 'rethinkdb-ts';

// Internal Modules
import Deployment from './Deployment';

// Types
import { GlobalUser, DatabaseUser, TableUser } from 'src/App/Types/Topology';
interface Passwords
{
	[username: string]: string;
};
interface GlobalUsersDictionary
{
	[username: string]: true;
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
	validateUserDeclarations({deployment});
	if (deployment.topology.users.length === 0) return;
    const passwords = await load();
	await Promise.all
	(
		deployment.topology.users.map
		(
			user => guaranteeUser({user, passwords, deployment})
		)
	);
};

/** Validates that all users in every part of the topology are globally declared, throwing an exception if not. */
function validateUserDeclarations({deployment}: {deployment: Deployment})
{
	const globalUsersDictionary = generateGlobalUsersDictionary({deployment});
	for (let database of deployment.topology.databases)
	{
		for (let user of database.users)
		{
			if (!globalUsersDictionary.hasOwnProperty(user.username)) throw new UserUndeclared({username: user.username});
		};
		for (let table of database.tables)
		{
			for (let user of table.users)
			{
				if (!globalUsersDictionary.hasOwnProperty(user.username)) throw new UserUndeclared({username: user.username});
			};
		};
	};
};

function generateGlobalUsersDictionary({deployment}: {deployment: Deployment})
{
	const dictionary: GlobalUsersDictionary = {};
	for (let user of deployment.topology.users)
	{
		const username = typeof user === 'string' ? user : user.username;
		dictionary[username] = true;
	};
	return dictionary;
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

export function generatePermissions({user}: {user: string | GlobalUser | DatabaseUser | TableUser})
{
	let permissions: { [permission: string]: boolean } = {};
	if (typeof user === 'object')
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
		const nodeError: NodeJS.ErrnoException = error;
		if (nodeError.code === 'ENOENT') throw new PasswordsFileNotFoundError(error);
        else throw new PasswordsFileError(error);
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

class PasswordsFileNotFoundError extends Error
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
	constructor(message: string)
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

class UserUndeclared extends Error
{
	constructor({username}: {username: string})
	{
		const message = 'User undeclared for \'' + username + '\'';
		super(message);
	};
};