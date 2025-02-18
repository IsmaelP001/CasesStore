


import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schemes';
import { config } from "dotenv";

config({ path: ".env" }); // or .env.local

export const db = drizzle(sql, { schema });
