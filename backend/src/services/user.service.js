"use strict";
// Importa el modelo de datos 'User'
import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import { handleError } from "../utils/errorHandler.js";
import bcrypt from 'bcryptjs';


/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getUsers() {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude password field
      include: [{
        model: Role,
        attributes: ["name"], // Only include the role name if necessary
      }],
    });

    if (!users || users.length === 0) return [null, "No hay usuarios"];
    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUsers");
    return [null, error.message];
  }
}

/**
 * Crea un nuevo usuario en la base de datos
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createUser(user) {
  try {
    const { username, rut, email, password, roles } = user;

    const userFound = await User.findOne({ where: { email } });

    if (userFound) return [null, "El usuario ya existe"];

    const rolesFound = await Role.findAll({ where: { name: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];

    const newUser = await User.create({
      username,
      rut,
      email,
      password,
      roleId: rolesFound[0].id,
    });

    return [newUser, null];
  } catch (error) {
    handleError(error, "user.service -> createUser");
    return [null, error.message];
  }
}

/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} id Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function getUserById(id) {
  try {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      include: [{
        model: Role,
        attributes: ["name"],
      }],
    });

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
    return [null, error.message];
  }
}

/**
 * Actualiza un usuario por su id en la base de datos
 * @param {string} id Id del usuario
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateUser(id, user) {
  try {
    const userFound = await User.findOne({ where: { id } });
    if (!userFound) return [null, "El usuario no existe"];

    const { username, email, rut, password, newPassword, roles } = user;

    const matchPassword = await bcrypt.compare(password, userFound.password);
    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    }

    const rolesFound = await Role.findAll({ where: { name: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];

    const updatedUser = await userFound.update({
      username,
      email,
      rut,
      password: newPassword ? await bcrypt.hash(newPassword, 10) : userFound.password,
      roleId: rolesFound[0].id,
    });

    return [updatedUser, null];
  } catch (error) {
    handleError(error, "user.service -> updateUser");
    return [null, error.message];
  }
}

/**
 * Elimina un usuario por su id de la base de datos
 * @param {string} id Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario eliminado
 */
async function deleteUser(id) {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return [null, "El usuario no existe"];

    await user.destroy();
    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
    return [null, error.message];
  }
}

export default {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
