"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
import { Sequelize } from 'sequelize';

// Agregamos la configuracion de las variables de entorno
import { DB_NAME, DB_USER, DB_PASS, DB_HOST } from "./configEnv.js";
import { handleError } from "../utils/errorHandler.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
});

/**
 * Establece la conexión con la base de datos.
 * @async
 * @function setupDB
 * @throws {Error} Si no se puede conectar a la base de datos.
 * @returns {Promise<void>} Una promesa que se resuelve cuando se establece la conexión con la base de datos.
 */

async function setupDB() {
  try {
    await sequelize.authenticate();
    console.log("=> Conectado a la base de datos");
    await sequelize.sync();
  } catch (err) {
    handleError(err, "/configDB.js -> setupDB");
    process.exit(1);
  }
}

export { setupDB, sequelize };
