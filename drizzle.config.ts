import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';
import { VARIABLES_CONFIG } from "./lib/utils/utils";
config({ path: '.env.local' }); // or .env



export default defineConfig({
    schema:'./config/database/schemes/*',
    out:'./database/migrations',
    dialect:"postgresql",
    dbCredentials:{
        url:VARIABLES_CONFIG.API_URL!,
        ssl:false
    },
    verbose:true,
    strict:true
   
})