import { defineConfig } from "drizzle-kit";


export default defineConfig({
    schema:'./config/database/schemes/*',
    out:'./database/migrations',
    dialect:"postgresql",
    dbCredentials:{
        url:process.env.NODE_ENV === 'production' ? process.env.POSTGRES_URL! : process.env.DB_URL! ,
        ssl:false
    },
    verbose:true,
    strict:true
   
})