import * as schema from "./schemes";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
config({ path: ".env.local" });

const queryClient = postgres(process.env.DB_URL!);
const db =
  process.env.NODE_ENV === "development"
    ? drizzle(queryClient, { schema })
    : drizzleVercel(sql, { schema });


export { db };