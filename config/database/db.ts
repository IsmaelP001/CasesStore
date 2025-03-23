import * as schema from "./schemes";
import { config } from "dotenv";
config({ path: ".env.local" });

const db_connection =
  process.env.NODE_ENV === "development"
    ? process.env.DB_URL!
    : process.env.POSTGRES_URL!;

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const queryClient = postgres(db_connection!);
 const db = drizzle(queryClient, { schema });

export { db };
