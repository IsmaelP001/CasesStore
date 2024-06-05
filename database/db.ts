


import * as schema from './schemes'
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// for query purposes
const queryClient = postgres({
  host:process.env.DB_HOST,
  user: process.env.DB_USER,
  port:parseInt(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
export const db = drizzle(queryClient,{schema});
