"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import DataService from "../services/data.service.js";
//implementar esquemas de validación
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todos los datos
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getData(req, res) {
  try {
    const [datos, errorDatos] = await DataService.getData();
    if (errorDatos) return respondError(req, res, 404, errorDatos);

    datos.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, datos);
  } catch (error) {
    handleError(error, "data.controller -> getData");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Mostrar los datos de la base de datos
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function showData(req, res) {
  try {
    const [datos, errorDatos] = await DataService.showData();
    if (errorDatos) return respondError(req, res, 404, errorDatos);

    datos.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, datos);
  } catch (error) {
    handleError(error, "data.controller -> showData");
    respondError(req, res, 400, error.message);
  }
}

export default {
    getData,
    showData 
};
 

