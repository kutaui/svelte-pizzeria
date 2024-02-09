import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const myTable = pgTable('myTableName', {
	id: serial('id').primaryKey(),
	name: text('name').notNull()
});