/* eslint-disable max-len */
"use strict";

import Joi from "joi";
import ROLES from "../constants/roles.constants.js";

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const userBodySchema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9_.-]{3,30}$/) // Solo permite letras, números, guiones y puntos.
    .required()
    .messages({
      "string.empty": "El nombre de usuario no puede estar vacío.",
      "any.required": "El nombre de usuario es obligatorio.",
      "string.base": "El nombre de usuario debe ser de tipo string.",
      "string.pattern.base": "El nombre de usuario solo puede contener letras, números, guiones y puntos, con una longitud de 3 a 30 caracteres.",
    }),
  rut: Joi.string()
    .trim()
    .required()
    .pattern(/^(\d{1,2})\.?(\d{3})\.?(\d{3})-?([\dkK])$/)
    .messages({
      "string.empty": "El RUT no puede estar vacío.",
      "any.required": "El RUT es obligatorio.",
      "string.base": "El RUT debe ser de tipo string.",
      "string.pattern.base": "El RUT debe tener el formato XX.XXX.XXX-X, ejemplo: 12.345.678-9.",
    }),

  password: Joi.string()
    .trim()
    .min(5)
    .pattern(/^[^\s'";]*$/) // Prohíbe espacios y caracteres peligrosos en la contraseña.
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
      "string.base": "La contraseña debe ser de tipo string.",
      "string.min": "La contraseña debe tener al menos 5 caracteres.",
      "string.pattern.base": "La contraseña contiene caracteres no permitidos.",
    }),

  email: Joi.string()
    .trim()
    .email()
    .pattern(/^[^\s'"%;<>]*$/) // Prohíbe caracteres peligrosos en el email.
    .required()
    .messages({
      "string.empty": "El email no puede estar vacío.",
      "any.required": "El email es obligatorio.",
      "string.base": "El email debe ser de tipo string.",
      "string.email": "El email debe tener un formato válido.",
      "string.pattern.base": "El email contiene caracteres no permitidos.",
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
}).unknown(false); // No permite propiedades adicionales.

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const userIdSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El ID debe ser un número entero.",
      "number.integer": "El ID debe ser un número entero.",
      "number.positive": "El ID debe ser un número positivo.",
      "any.required": "El ID es obligatorio.",
    }),
  })
  .unknown(false).messages({
    "object.unknown": "El campo {#label} no está permitido en la solicitud.", // Mensaje personalizado
  });
export { userBodySchema, userIdSchema };
