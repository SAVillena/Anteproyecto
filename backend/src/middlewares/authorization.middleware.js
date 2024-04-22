import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import jwt from "jsonwebtoken";
import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import { ACCESS_JWT_SECRET } from "../config/configEnv.js";

/**
 * Checks if the user is an administrator
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Function to pass control to the next middleware
 */
async function isAdmin(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return respondError(req, res, 401, "No se proporcionó token de autorización.");
    }

    const parts = req.headers.authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return respondError(req, res, 401, "Formato de token de autorización inválido.");
    }

    const token = parts[1];
    if (!ACCESS_JWT_SECRET) {
      throw new Error("La clave secreta JWT no está definida.");
    }

    const decodedToken = jwt.verify(token, ACCESS_JWT_SECRET);
    const email = decodedToken.email;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return respondError(req, res, 404, "Usuario no encontrado.");
    }

    const roles = await Role.findAll({ where: { id: user.roleId } });
    const isAdmin = roles.some(role => role.name === "admin");

    if (!isAdmin) {
      return respondError(req, res, 403, "Acceso denegado. Se requieren privilegios de administrador.");
    }

    next();
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
    respondError(req, res, 500, "Error de servidor interno");
  }
}

export { isAdmin };
