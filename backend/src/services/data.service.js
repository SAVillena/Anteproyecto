import Data from '../models/data.model.js';
import Serial from '../models/serial.model.js';
import { Sequelize, Op } from 'sequelize';
import Alert from './alert.service.js'
import moment from 'moment-timezone';

/**
 * @async
 * @function getData
 * @returns {Promise<void>}
 */
async function getData() {
    try {
        const todo = await Data.findAll();

        // Vamos a realizar un mapeo de los datos para obtener Minimo, Maximo y Promedio de ad_2 y ad_3\
        let min_ad_2 = Infinity;
        let min_ad_3 = Infinity;
        let max_ad_2 = -Infinity;
        let max_ad_3 = -Infinity;
        let sum_ad_2 = 0;
        let sum_ad_3 = 0;
        todo.forEach(item => {
            if (item.ad_2 < min_ad_2) min_ad_2 = item.ad_2;
            if (item.ad_3 < min_ad_3) min_ad_3 = item.ad_3;
            if (item.ad_2 > max_ad_2) max_ad_2 = item.ad_2;
            if (item.ad_3 > max_ad_3) max_ad_3 = item.ad_3;
            sum_ad_2 += item.ad_2;
            sum_ad_3 += item.ad_3;
        });
        const avg_ad_2 = sum_ad_2 / todo.length;
        const avg_ad_3 = sum_ad_3 / todo.length;

        // Agregar los valores al objeto que se retorna
        const result = {
            data: todo,
            min_ad_2: min_ad_2,
            min_ad_3: min_ad_3,
            max_ad_2: max_ad_2,
            max_ad_3: max_ad_3,
            avg_ad_2: avg_ad_2,
            avg_ad_3: avg_ad_3
        };

        return [result, null];
    } catch (error) {
        console.error('Error al mostrar los datos: ', error);
        return [null, error];
    }
}

/**
 * @param {Object} dataInput - Datos recibidos del sensor.
 * @returns {Promise<[Object|null, Error|null]>}
 */
async function createData(dataInput) {
    try {
        const { serial, lat, lng, ts, monitoringGasMap } = dataInput;

        // Verificar si el serial ya existe
        let serialRecord = await Serial.findOne({ where: { serial } });

        // Si no existe, crear un nuevo registro en la tabla Serials
        if (!serialRecord) {
            serialRecord = await Serial.create({ serial });
            console.log(`Serial ${serial} agregado exitosamente.`);
        }

        // Preparar los datos para la inserción en la tabla Data
        const dataToInsert = {
            serialId: serialRecord.id,
            lat,
            lng,
            timestamp: new Date(ts),
            ad_2: monitoringGasMap['2'] || null,
            ad_3: monitoringGasMap['3'] || null,
        };

        // Crear el nuevo registro en la tabla Data
        const createdData = await Data.create(dataToInsert);
        

        // Calcular el próximo ID de datos una sola vez
        const nextDataId = (await Data.max('id'));

        // Función auxiliar para crear alertas
        async function createAlert(alertType, alertValue) {
            const alertInput = {
                dataId: nextDataId,
                serialId: serialRecord.id,
                ts: new Date(ts),
                alert_type: alertType,
                alert_value: alertValue,
            };
            const [alert, error] = await Alert.createAlert(alertInput);
            if (error) {
                console.error(`Error en alerta ${alertType}:`, error);
            }
        }

        // Crear alertas según los valores de ad_2 (PM2.5) y ad_3 (PM10)
        if (dataToInsert.ad_2 >= 25) {
            const alertType = dataToInsert.ad_2 < 30 ? 'Precaucion, PM2.5' : 'Urgencia, PM2.5';
            console.log(alertType);
            await createAlert(alertType, dataToInsert.ad_2);
        }

        if (dataToInsert.ad_3 >= 35) {
            const alertType = dataToInsert.ad_3 < 40 ? 'Precaucion, PM10' : 'Urgencia, PM10';
            console.log(alertType);
            await createAlert(alertType, dataToInsert.ad_3);
        }

        return [createdData, null];
    } catch (error) {
        console.error('Error al crear o actualizar los datos del sensor:', error);
        return [null, error];
    }
}


async function getDataSerie() {
    try {
        const lastTimestamp = await Data.max('timestamp');
        const fiveMinutesAgo = new Date(new Date(lastTimestamp).getTime() - 5 * 60 * 1000); // 5 minutos
        const result = await Data.findAll({
            attributes: ['ad_2', 'ad_3', 'timestamp'],
            where: {
                timestamp: {
                    [Op.gte]: fiveMinutesAgo
                },
            },
            raw: true
        });
        const total = result.map((item) => ({
            ad_2: Math.round(item.ad_2),
            ad_3: Math.round(item.ad_3),
            timestamp: item.timestamp
        }));
        let max_ad_2 = -Infinity;
        let max_ad_3 = -Infinity;
        total.forEach(item => {
            if (item.ad_2 > max_ad_2) max_ad_2 = item.ad_2;
            if (item.ad_3 > max_ad_3) max_ad_3 = item.ad_3;
        });

        // Agregar los máximos al objeto que se retorna
        const total2 = {
            data: total,
            max_ad_2: max_ad_2,
            max_ad_3: max_ad_3
        };
        return [total2, null];
    } catch (error) {
        console.error('Error al mostrar los datos:', error);
        return [null, error];
    }
};

async function getFilterData(filter) {
    try {
        console.log('Filtro:', filter);
        const { startDate, endDate, sensor, metric, real } = filter;
        const where = {};

        // Definir zona horaria
        const timeZone = 'America/Santiago';

        // Validaciones de fechas
        if (startDate || endDate) {

            if (startDate && endDate) {
                if (moment(startDate).isAfter(moment(endDate))) {
                    throw new Error('La fecha de inicio no puede ser mayor que la fecha de término.');
                }
            }

            if (endDate) {
                // Obtener la fecha actual en la zona horaria específica
                const currentDateNormalized = moment().tz(timeZone).startOf('day'); // Inicio del día actual
                const endDateMoment = moment(endDate).tz(timeZone).startOf('day'); // Inicio del día de término
                console.log('Fecha actual normalizada:', currentDateNormalized.format());
                console.log('Fecha de término normalizada:', endDateMoment.format());
            
                // Comparar solo las fechas normalizadas
                if (endDateMoment.isAfter(currentDateNormalized)) {
                    throw new Error('La fecha de término no puede ser mayor que el día actual.');
                }
            }
            

            if (startDate) {
                const startYear = moment(startDate).year();
                if (startYear <= 2010) {
                    throw new Error('La fecha de inicio debe ser posterior al año 2010.');
                }
            }

            if (endDate) {
                const endYear = moment(endDate).year();
                if (endYear <= 2010) {
                    throw new Error('La fecha de término debe ser posterior al año 2010.');
                }
            }
        }

        if (startDate && endDate) {
            console.log('Fechas:', startDate, endDate);
            where.timestamp = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            };
        }

        if (sensor) {
            console.log('Sensor:', sensor);
            where.serialId = sensor;
        }

        if (metric) {
            console.log('Métrica:', metric);
            if (metric === 'PM2.5') {
                where.ad_2 = {
                    [Op.not]: null,
                };
            } else if (metric === 'PM10') {
                where.ad_3 = {
                    [Op.not]: null,
                };
            }
        }

        if (real) {
            console.log('Filtrando por tiempo real');
            const currentTime = moment().tz(timeZone);
            const fifteenMinutesAgo = currentTime.clone().subtract(15, 'minutes');

            console.log('Últimos 15 minutos:', fifteenMinutesAgo.format(), currentTime.format());
            where.timestamp = {
                [Op.between]: [fifteenMinutesAgo.toDate(), currentTime.toDate()],
            };

            if (real === 'realPM2.5') {
                console.log('Filtrando por realPM2.5');
                where.ad_2 = {
                    [Op.not]: null,
                };
            }

            if (real === 'realPM10') {
                console.log('Filtrando por realPM10');
                where.ad_3 = {
                    [Op.not]: null,
                };
            }
        }

        console.log('Where:', where);

        const filteredData = await Data.findAll({
            where,
            raw: true
        });

        return [filteredData, null];
    } catch (error) {
        console.error('Error al filtrar:', error.message);
        return [null, error.message];
    }
};



export default {
    getData,
    createData,
    getDataSerie,
    getFilterData
};
