import * as schema from "./schemes";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
config({ path: ".env.local" });

const db_connection = 
  process.env.NODE_ENV === "development" ? process.env.DB_URL: process.env.POSTGRES_URL
const queryClient = postgres(db_connection!);
const db = drizzle(queryClient, { schema })

export { db };