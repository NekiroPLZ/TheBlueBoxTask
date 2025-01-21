import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;

export const configPool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const PORT = process.env.PORT || 3000;

export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

