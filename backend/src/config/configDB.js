import { Sequelize } from "sequelize";
import { DB_NAME, DB_USER, DB_PASS, DB_HOST } from "./configEnv.js";
import { handleError } from "../utils/errorHandler.js";


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
});

async function setupDB() {
  try {
    await sequelize.authenticate();
    console.log("=> Conectado a la base de datos");
    await sequelize.sync({force: false}); // Descomentar para forzar la creación de tablas
    // await sequelize.sync();
  } catch (err) {
    handleError(err, "/configDB.js -> setupDB");
    process.exit(1);
  }
}

export { setupDB, sequelize };
