import * as schema from "./schemes";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config({ path: ".env.local" });

const db_connection = process.env.NODE_ENV === "development"
? process.env.DB_URL!
: process.env.POSTGRES_URL!
const queryClient = neon(db_connection!);
const db = drizzle(queryClient, { schema })

export { db };