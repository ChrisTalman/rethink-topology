declare module 'rethinkdb'
{
	export function connect(): Connection;
	export class Connection
	{
		public close();
	}
	export function dbList();
	export function tableList();
	export function tableCreate(name: string);
	export function table(name: string);
}