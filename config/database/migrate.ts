import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import 'dotenv/config'

const sql = postgres({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT!),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 1,
});

const db = drizzle(sql);

async function main() {
  try {
    await migrate(db, { migrationsFolder: "migrations" });
    await sql.end();
  } catch (error) {
    console.error("Error in main:", error);
    process.exit(1); // Salir del proceso con código de error
  }
}

main();
