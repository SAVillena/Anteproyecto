import { respondSuccess, respondError } from "../utils/resHandler.js";
import AlertService from "../services/alert.service.js";

/**
 * Obtiene todas las alertas
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getAlerts(req, res) {
  try {
    const [alerts, errorAlerts] = await AlertService.getAlerts();
    if (errorAlerts) return respondError(req, res, 404, errorAlerts);

    alerts.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, alerts);
  } catch (error) {
    handleError(error, "alert.controller -> getAlerts");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea una nueva alerta
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createAlert(req, res) {
  try {
    const [createdAlert, errorAlert] = await AlertService.createAlert(req.body);
    if (errorAlert) return respondError(req, res, 404, errorAlert);

    respondSuccess(req, res, 201, createdAlert);
  } catch (error) {
    handleError(error, "alert.controller -> createAlert");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Elimina una alerta
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteAlert(req, res) {
  try {
    const [deletedAlert, errorAlert] = await AlertService.deleteAlert(req.body);
    if (errorAlert) return respondError(req, res, 404, errorAlert);

    respondSuccess(req, res, 200, deletedAlert);
  } catch (error) {
    handleError(error, "alert.controller -> deleteAlert");
    respondError(req, res, 400, error.message);
  }
}

/**
* Obtiene las últimas 5 alertas
* @param {Object} req - Objeto de petición
* @param {Object} res - Objeto de respuesta
*/
async function getLatestAlerts(req, res) {
  try {
      const [alerts, errorAlerts] = await AlertService.getLatestAlerts();
      if (errorAlerts) return respondError(req, res, 404, errorAlerts);

      respondSuccess(req, res, 200, alerts);
  } catch (error) {
      handleError(error, "alert.controller -> getLatestAlerts");
      respondError(req, res, 400, error.message);
  }
}

/**
* Obtiene las últimas 5 alertas
* @param {Object} req - Objeto de petición
* @param {Object} res - Objeto de respuesta
*/
async function getFilterAlert(req, res) {
  try {
      const filters = req.query;
      const [alerts, errorAlerts] = await AlertService.getFilterAlert(filters);

      if (errorAlerts) return respondError(req, res, 404, errorAlerts);
      respondSuccess(req, res, 200, alerts);
  } catch (error) {
      handleError(error, "alert.controller -> getFilterAlert");
      respondError(req, res, 400, error.message);
  }
}


export default{ 
  getAlerts,
  createAlert,
  deleteAlert,
  getLatestAlerts,
  getFilterAlert
};