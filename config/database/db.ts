import * as schema from "./schemes";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { VARIABLES_CONFIG } from "@/lib/utils/utils";
config({ path: ".env.local" });

const queryClient = postgres(VARIABLES_CONFIG.API_URL!);
const db =
  process.env.NODE_ENV === "development"
    ? drizzle(queryClient, { schema })
    : drizzleVercel(sql, { schema });

export { db };