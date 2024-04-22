"use strict";
// Importa el modelo de datos 'User'
import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getUsers() {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // Exclude password field
      include: [{
        model: Role,
        attributes: ['name'] // Only include the role name if necessary
      }]
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
    console.log("user: ",user);
    const { username, rut, email, password, roles } = user;


    const userFound = await User.findOne({ where: { email: user.email } });
    console.log("userFound: ",userFound);

    if (userFound) return [null, "El usuario ya existe"];
    console.log("roles: ",roles);
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
  }
}

/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function getUserById(id) {
  try {
    const user = await User.findById({ _id: id })
      .select("-password")
      .populate("roles")
      .exec();

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
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
    const userFound = await User.findById(id);
    if (!userFound) return [null, "El usuario no existe"];

    const { username, email, rut, password, newPassword, roles } = user;

    const matchPassword = await User.comparePassword(
      password,
      userFound.password,
    );

    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    }

    const rolesFound = await Role.find({ name: { $in: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];

    const myRole = rolesFound.map((role) => role._id);

    const userUpdated = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        rut,
        password: await User.encryptPassword(newPassword || password),
        roles: myRole,
      },
      { new: true },
    );

    return [userUpdated, null];
  } catch (error) {
    handleError(error, "user.service -> updateUser");
  }
}

/**
 * Elimina un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario eliminado
 */
async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}

export default {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
