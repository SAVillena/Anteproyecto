import Data from '../models/data.model.js';
import { Sequelize, Op } from 'sequelize';
/**
 * @async
 * @function getData
 * @returns {Promise<void>}
 */
async function getData() {
    try {
        const lastTimestamp = await Data.max('timestamp');
        const fiveMinutesAgo = new Date(new Date(lastTimestamp).getTime() - 5 * 60 * 1000); // 5 minutos
        const attributes = [
            [Sequelize.fn('AVG', Sequelize.col('ad_2')), 'avg_ad_2'],
            [Sequelize.fn('AVG', Sequelize.col('ad_3')), 'avg_ad_3'],
            [Sequelize.fn('MAX', Sequelize.col('ad_2')), 'max_ad_2'],
            [Sequelize.fn('MAX', Sequelize.col('ad_3')), 'max_ad_3'],
            [Sequelize.fn('MIN', Sequelize.col('ad_2')), 'min_ad_2'],
            [Sequelize.fn('MIN', Sequelize.col('ad_3')), 'min_ad_3']
        ];

        // Usa raw: true si solo necesitas los valores de las agregaciones sin los datos del modelo
        const result = await Data.findOne({
            attributes,
            where: {
                timestamp: {
                    [Op.gte]: fiveMinutesAgo
                }
            },
            raw: true
        });

        // Aquí result ya es un objeto con las agregaciones, no necesitas un array de objetos
        const total = {
            avg_ad_2: Math.round(result.avg_ad_2),
            avg_ad_3: Math.round(result.avg_ad_3),
            max_ad_2: Math.round(result.max_ad_2),
            max_ad_3: Math.round(result.max_ad_3),
            min_ad_2: Math.round(result.min_ad_2),
            min_ad_3: Math.round(result.min_ad_3)
        };

        const todo = {
            total
        };

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
            attributes: ['ad_2', 'ad_3','timestamp'],
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

export default {
    getData,
    createData,
    getDataSerie,
};
