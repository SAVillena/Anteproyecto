"use strict";

/** Modelo de datos 'User' */
import User from "../models/user.model.js";
/** Modelo de datos 'Role' */
import Role from "../models/role.model.js";
/** Modulo 'jsonwebtoken' para crear tokens */
import jwt from "jsonwebtoken";

import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../config/configEnv.js";

import { handleError } from "../utils/errorHandler.js";

/**
 * Inicia sesión con un usuario.
 * @async
 * @function login
 * @param {Object} user - Objeto de usuario
 */
async function login(user) {
  try {
    const { email, password } = user;

    const userFound = await User.findOne({ where: { email }, include:  [{ model: Role, attributes: ['name'] }]
    });
    if (!userFound) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const matchPassword = await User.validPassword(password);

    if (!matchPassword) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const accessToken = jwt.sign(
      { email: userFound.email, roles: userFound.Role.name },
      ACCESS_JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const refreshToken = jwt.sign(
      { email: userFound.email },
      REFRESH_JWT_SECRET,
      {
        expiresIn: "7d", // 7 días
      },
    );

    return [accessToken, refreshToken, null];
  } catch (error) {
    handleError(error, "auth.service -> signIn");
  }
}

/**
 * Refresca el token de acceso
 * @async
 * @function refresh
 * @param {Object} cookies - Objeto de cookies
 */
async function refresh(cookies) {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET);
    const userFound = await User.findOne({ where: { email: decoded.email } });
    if (!userFound) return [null, "No usuario no autorizado"];
  
    const accessToken = jwt.sign(
      { email: userFound.email, roles: userFound.Role.name },
      ACCESS_JWT_SECRET,
      { expiresIn: "1d" },
    );
  
    return [accessToken, null];
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return [null, "La sesion ha caducado, vuelva a iniciar sesion"];
    }
    handleError(error, "auth.service -> refresh");
  }  
}

export default { login, refresh };
