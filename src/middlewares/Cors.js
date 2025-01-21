import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
export const corsMiddleware = cors({
    origin: process.env.CORS_ORIGIN, // Usar la variable de entorno
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  