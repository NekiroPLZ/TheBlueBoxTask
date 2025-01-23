import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === 'production';

export const configPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false 
});

export const PORT = process.env.PORT || 3000;
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;
