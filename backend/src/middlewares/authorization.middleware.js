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
    console.log(req.user.email);
    const user = await User.findOne({ where: { email: req.user.email } });
    console.log(user.roleId);
    const roles = await Role.findAll({ where: { id: user.roleId } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }

    }
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
    respondError(req, res, 500, "Error de servidor interno");
  }
}

export { isAdmin };
