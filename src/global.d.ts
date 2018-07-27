declare module 'rethinkdb'
{
	export function connect(options: ConnectOptions): Connection;
	export interface ConnectOptions
	{
		host?: string;
		port?: number;
		db?: string;
		user?: string;
		password?: string;
		timeout?: number;
		ssl?:
		{
			ca: Buffer;
		};
	}
	export class Connection
	{
		public close();
	}
	export function dbList();
	export function tableList();
	export function tableCreate(name: string, options?: TableCreateOptions);
	export interface TableCreateOptions
	{
		shards?: number;
		replicas?: number;
	}
	export function table(name: string);
}