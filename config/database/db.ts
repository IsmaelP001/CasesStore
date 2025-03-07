import * as schema from './schemes';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
config({ path: '.env.local' }); 

// const db = drizzleVercel(sql, { schema })
const queryClient = postgres(process.env.DB_URL!);
const db = drizzle(queryClient,{schema});

export {db}
