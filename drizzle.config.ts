import { defineConfig } from "drizzle-kit";
import "dotenv/config"

export default defineConfig({
    schema:'./database/schemes/*',
    out:'./database/migrations',
    dialect:"postgresql",
    dbCredentials:{
        host: process.env.DB_HOST,
        port:parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    verbose:true,
    strict:true
   
})