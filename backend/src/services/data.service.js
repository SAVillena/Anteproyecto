import Data from '../models/data.model.js';
import { Sequelize, Op } from 'sequelize';
/**
 * @async
 * @function getData
 * @returns {Promise<void>}
 */
async function getData() {
    try {
        const todo = await Data.findAll();
        
        return [todo, null];
    } catch (error) {
        console.error('Error al mostrar los datos: ', error);
        return [null, error];
    }
}

async function createData(dataInput) {
    try {
        const createdData = await Data.create(dataInput);
        return [createdData, null];
    } catch (error) {
        console.error('Error al crear los datos: ', error);
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
        const { lat, lng, ad_2, ad_3, startDate, endDate } = filter;
        const where = {};

        if (lat) where.lat = lat;
        if (lng) where.lng = lng;
        if (ad_2) where.ad_2 = ad_2;
        if (ad_3) where.ad_3 = ad_3;

        // Filtro por rango de fechas
        if (startDate && endDate) {
            where.timestamp = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            };
        }

        // Realiza la búsqueda en la base de datos
        const filteredData = await Data.findAll({ where });

        return filteredData;
    }catch (error) {
        console.error('Error al filtrar:', error);
        return [null, error];
    }
};


export default {
    getData,
    createData,
    getDataSerie,
    getFilterData
};
