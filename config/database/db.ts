import * as schema from "./schemes";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";

config({ path: ".env.local" });

const queryClient = postgres(process.env.DB_URL!);
const db =drizzle(queryClient, { schema })
  
export { db };