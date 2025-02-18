import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from 'postgres';

const connection = postgres({
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    database: process.env.PGDATABASE || 'postgres',
    username: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '',
});

export const db = drizzle(connection);