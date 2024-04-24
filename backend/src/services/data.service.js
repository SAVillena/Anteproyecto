import Data from '../models/data.model.js';

/**
 * @async
 * @function getData
 * @returns {Promise<void>}
 */
async function getData() {
    try {
        const data = await Data.findAll();
        return [data, null];
    } catch (error) {
        console.error('Error al mostrar los datos: ', error);
        return [null, error];
    }
}

export default {
    getData,
};
