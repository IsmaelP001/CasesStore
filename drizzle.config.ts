import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';
config({ path: '.env.local' }); // or .env



export default defineConfig({
    schema:'./config/database/schemes/*',
    out:'./database/migrations',
    dialect:"postgresql",
    dbCredentials:{
        url:process.env.NODE_ENV === "development"
        ? process.env.DB_URL!
        : process.env.POSTGRES_URL!,
    },
    verbose:true,
    strict:true
   
})