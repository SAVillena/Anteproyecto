import Alert from '../models/alert.model.js';

/**
 * @async
 * @function getAlerts
 * @returns {Promise<void>}
 */
async function getAlerts() {
    try {
        const todo = await Alert.findAll();
        return [todo, null];
    } catch (error) {
        console.error('Error al mostrar las alertas: ', error);
        return [null, error];
    }
}

/**
 * @param {Object} alertInput - Datos recibidos del sensor.
 * @returns {Promise<[Object|null, Error|null]>}
 */
async function createAlert(alertInput) {
    try {
        const { dataId, serialId, ts, alert_type, alert_value } = alertInput;
        const alert = await Alert.create({ dataId, serialId, timestamp: ts, alert_type, alert_value });
        return [alert, null];
    } catch (error) {
        console.error('Error al crear la alerta: ', error);
        return [null, error];
    }
}

/**
 * @param {Object} alertInput - Datos recibidos del sensor.
 * @returns {Promise<[Object|null, Error|null]>}
 */
async function deleteAlert(alertInput) {
    try {
        const { id } = alertInput;
        const alert = await Alert.destroy({ where: { id } });
        return [alert, null];
    } catch (error) {
        console.error('Error al eliminar la alerta: ', error);
        return [null, error];
    }
}

/**
 * @async
 * @function getLatestAlerts
 * @returns {Promise<[Object[]|null, Error|null]>}
 */
async function getLatestAlerts() {
    try {
        const latestAlerts = await Alert.findAll({
            limit: 5,
            order: [['timestamp', 'DESC']]
        });
        return [latestAlerts, null];
    } catch (error) {
        console.error('Error al obtener las últimas alertas: ', error);
        return [null, error];
    }
}

async function getFilterAlert(filter) {
    try {
        const { alertType, serialId, dateFrom, dateTo } = filter;
        const whereClause = {};

        // Filtro por tipo de alerta
        if (alertType && alertType !== "Ambos") {
            whereClause.alert_type = alertType;
        }

        // Filtro por serialId
        if (serialId) whereClause.serialId = serialId;

        // Filtro por rango de fechas
        if (dateFrom && dateTo) {
            whereClause.timestamp = {
                [Op.between]: [new Date(dateFrom), new Date(dateTo)],
            };
        } else if (dateFrom) {
            whereClause.timestamp = {
                [Op.gte]: new Date(dateFrom),
            };
        } else if (dateTo) {
            whereClause.timestamp = {
                [Op.lte]: new Date(dateTo),
            };
        }

        // Consulta a la base de datos
        const filteredAlerts = await Alert.findAll({
            where: whereClause,
            order: [['timestamp', 'DESC']],
        });

        return [filteredAlerts, null];
    } catch (error) {
        console.error('Error al filtrar las alertas:', error);
        return [null, error];
    }
}




export default {
    getAlerts,
    createAlert,
    deleteAlert,
    getLatestAlerts,
    getFilterAlert
};