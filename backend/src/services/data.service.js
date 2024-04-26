import Data from '../models/data.model.js';
import { Sequelize, Op } from 'sequelize';
/**
 * @async
 * @function getData
 * @returns {Promise<void>}
 */
async function getData() {
    try {
        const twoHoursAgo = new Date(new Date() - 4 * 60 * 60 * 1000); // 2 horas atrás desde ahora
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
                    [Op.gte]: twoHoursAgo
                }
            },
            raw: true
        });

        // Aquí result ya es un objeto con las agregaciones, no necesitas un array de objetos
        const total = {
            avg_ad_2: result.avg_ad_2,
            avg_ad_3: result.avg_ad_3,
            max_ad_2: result.max_ad_2,
            max_ad_3: result.max_ad_3,
            min_ad_2: result.min_ad_2,
            min_ad_3: result.min_ad_3
        };

        const todo = {
            total,
            // Si necesitas también los datos específicos, puedes hacer otra consulta findAll aquí
        //     datos: await Data.findAll({
        //         where: {
        //             timestamp: {
        //                 [Op.gte]: twoHoursAgo
        //             }
        //         },
        // })
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


export default {
    getData,
    createData,
};
