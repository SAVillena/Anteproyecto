"use strict";
// Importa el modelo de datos 'Role'
import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

/**
 * Crea los roles por defecto en la base de datos.
 * @async
 * @function createRoles
 * @returns {Promise<void>}
 */
async function createRoles() {
  try {
    // Busca todos los roles en la base de datos
    const rolesExist = await Role.count();
    // Si no hay roles en la base de datos los crea
    if (rolesExist > 0) return;


    await Role.bulkCreate([
      { name: "admin" },
      { name: "user" },
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error('Error al crear roles: ', error);
  }
}

/**
 * Crea los usuarios por defecto en la base de datos.
 * @async
 * @function createUsers
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    // Busca todos los usuarios en la base de datos
    const usersExist = await User.count();
    // Si no hay usuarios en la base de datos los crea
    if (usersExist > 0) return;

    const adminRole = await Role.findOne({ where: { name: "admin" } });
    const userRole = await Role.findOne({ where: { name: "user" } });


    await User.bulkCreate([
      {
        username: "user",
        email: "user@email.com",
        rut: "12345678-9",
        password: await bcrypt.hash("user123", 10),
        roleId: userRole.id,
      },
      {
        username: "admin",
        email: "admin@email.com",
        rut: "98765432-1",
        password: await bcrypt.hash("admin123", 10),
        roleId: adminRole.id,
      },
    ]);
    console.log("* => Users creados exitosamente");
  } catch (error) {
    console.error('Error al crear usuarios: ', error);
  }
}

export { createRoles, createUsers };
