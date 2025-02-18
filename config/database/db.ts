import * as schema from './schemes';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';

const db =
  process.env.NODE_ENV === 'production'
    ? drizzleVercel(sql, { schema })
    : drizzle(postgres(process.env.DB_URL!), { schema });

export {db}
