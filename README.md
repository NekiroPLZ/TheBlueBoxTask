# TheBlueBoxTask 

Este proyecto corresponde al challenge propuesto por The Blue Box, desarrollado utilizando Node.js con las librerías nativas necesarias para simplificar tareas como el manejo de las rutas, las conexiones a la base de datos y la autenticación de usuarios. El enfoque principal fue crear una API RESTful que permita manejar tareas y usuarios de forma eficiente.

-Tecnologías utilizadas
-Node.js (sin frameworks como Nest o similares)
-PostgreSQL como base de datos
-Express.js para la gestión de las rutas y middleware
-bcryptjs para la encriptación de contraseñas
-jsonwebtoken para la creación de tokens JWT
-pg para la interacción con la base de datos (sin ORM, se usaron consultas SQL directamente)
-Postman para las pruebas de la API

instalacion
git clone https://github.com/tuusuario/TheBlueBoxTask.git
cd TheBlueBoxTask
npm install

Crear un .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=TheBlueBoxTask
DB_USER= el usuario db 
DB_PASSWORD= tu password 
JWT_SECRET= password jwt
Estructura de la base de datos

La base de datos se compone de dos tablas principales:

users: Guarda la información de los usuarios, incluyendo email, contraseña, rol, nombre y fecha de creación.
tasks: Guarda las tareas, con atributos como nombre, descripción, tipo, fecha de creación, fecha de finalización, estado y asignación a un usuario.

CREATE DATABASE "TheBlueBoxTask"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
-- Table: public.tasks

-- DROP TABLE IF EXISTS public.tasks;



CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS public.tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(10) CHECK (type IN ('urgent', 'medium', 'low')) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('pending', 'in progress', 'completed', 'archived')) DEFAULT 'pending',
    assigned_to INTEGER REFERENCES public.users(id) ON DELETE SET NULL
);

npm run dev para ejecutar