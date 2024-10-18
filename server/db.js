import { Pool } from 'pg';
import 'dotenv/config'


const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
})


export {pool};