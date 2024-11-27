"use strict";

import Joi from "joi";
import ROLES from "../constants/roles.constants.js";

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const userBodySchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "El nombre de usuario no puede estar vacío.",
    "any.required": "El nombre de usuario es obligatorio.",
    "string.base": "El nombre de usuario debe ser de tipo string.",
  }),
  rut: Joi.string()
    .required()
    .min(11)
    .max(12)
    .pattern(/^(\d{1,2})\.?(\d{3})\.?(\d{3})-?([\dkK])$/)
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "any.required": "El rut es obligatorio.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener al menos 11 caracteres (con puntos y guion).",
      "string.max": "El rut debe tener un máximo de 12 caracteres (con puntos y guion).",
      "string.pattern.base": "El rut tiene el formato XX.XXX.XXX-X, ejemplo: 12.345.678-9.",
    }),

  password: Joi.string().required().min(5).messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede estar vacío.",
    "any.required": "El email es obligatorio.",
    "string.base": "El email debe ser de tipo string.",
    "string.email": "El email debe tener un formato válido.",
  }),
  roles: Joi.array()
    .items(Joi.string().valid(...ROLES))
    .required()
    .messages({
      "array.base": "El rol debe ser de tipo array.",
      "any.required": "El rol es obligatorio.",
      "string.base": "El rol debe ser de tipo string.",
      "any.only": "El rol proporcionado no es válido.",
    }),
  newPassword: Joi.string().min(5).messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const userIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "El id debe ser un número entero.",
    "number.integer": "El id debe ser un número entero.",
    "number.positive": "El id debe ser un número positivo.",
    "any.required": "El id es obligatorio.",
  }),
});

export { userBodySchema, userIdSchema };
