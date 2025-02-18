


import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schemes';
export const db = drizzle(sql, { schema });
