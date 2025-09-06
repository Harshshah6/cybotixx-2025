import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

console.log("⚡ Drizzle client initialized at", new Date());

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });