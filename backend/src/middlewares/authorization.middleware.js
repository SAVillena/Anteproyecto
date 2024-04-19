import User from "../models/user.model.js";
import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Checks if the user is an administrator
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Function to pass control to the next middleware
 */
async function isAdmin(req, res, next) {
  try {

    if(!req.user) {
      return respondError(
        req,
        res,
        401,
        "Se requiere inciar sesión para realizar esta acción"
      );
    }
    // Assuming 'req.user.email' holds the email of the authenticated user
    const user = await User.findOne({
      where: { email: req.user.email },
      include: [{
        model: Role,
        attributes: ['name']
      }]
    });

    if (user && user.Roles.some(role => role.name === 'admin')) {
      next();
    } else {
      return respondError(
        req,
        res,
        401,
        "Se requiere un rol de administrador para realizar esta acción"
      );
    }
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
    respondError(req, res, 500, "Error de servidor interno");
  }
}

export { isAdmin };
