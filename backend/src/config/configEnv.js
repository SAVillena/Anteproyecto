"use strict";
import { fileURLToPath } from "node:url";
// Import the 'path' module to get the absolute path of the .env file
import path from "node:path";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
console.log(__dirname);
/** Get the absolute path of the .env file. */
const envFilePath = path.resolve(__dirname, ".env");

// Load environment variables from the .env file
import dotenv from "dotenv";
dotenv.config({ path: envFilePath });
console.log("=> Variables de entorno cargadas exitosamente");
/** Server port */
export const PORT = process.env.PORT;
/** Server host */
export const HOST = process.env.HOST;
/** Database host */
export const DB_HOST = process.env.DB_HOST;
/** Database name */
export const DB_NAME = process.env.DB_NAME;
/** Database user */
export const DB_USER = process.env.DB_USER;
/** Database password */
export const DB_PASS = process.env.DB_PASS;
/** Access token secret */
export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
/** Refresh token secret */
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;

export const RABBITMQ_HOSTNAME = process.env.RABBITMQ_HOSTNAME;

export const RABBITMQ_PORT = process.env.RABBITMQ_PORT;

export const RABBITMQ_USERNAME = process.env.RABBITMQ_USERNAME;

export const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;

export const RABBITMQ_VHOST = process.env.RABBITMQ_VHOST;

export const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE;
