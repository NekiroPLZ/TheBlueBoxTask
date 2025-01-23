import dotenv from 'dotenv';
dotenv.config();
import { configPool } from '../config/config';
// Cerrar el servidor
afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // Esperar conexiones abiertas
  configPool.end(); // O cerrá tu conexión de base de datos aquí si aplica
});

