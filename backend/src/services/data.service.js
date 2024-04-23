import { connectMQ } from '../config/configMQ.js';
import { loadProtoSchema } from '../utils/protoHandler.js';
import Data from '../models/data.model.js';
import { handleError } from '../utils/errorHandler.js';

/**
 * @async
 * @function getData
 * @returns {Promise<void>}
 */
async function getData() {
    try {
        const channel = await connectMQ();
        if (!channel) {
            throw new Error('Error al conectar con RabbitMQ');
        }
        console.log('Conectado a RabbitMQ: ', channel)
        channel.consume('e9a4a49e982e44ff9c4fbfa6aef5c5b2', async (msg) => {
            if (msg === null) return console.log('No hay mensajes');
            const data = await loadProtoSchema();
            if (!data) {
                throw new Error('Error al cargar el proto');
            }
            const message = data.decode(msg.content);
            console.log('Mensaje decodificado: ', message);
            const tsLong = message.ts;  // Ya es un objeto Long
            const tsValue = tsLong.toNumber();
            const date = new Date(tsValue);
            console.log('Processed timestamp:', tsValue);
            await Data.create(
                {
                    serial: message.serial,
                    lat: message.lat,
                    lng: message.lng,
                    timestamp: date.toISOString(),
                    ad_2: message.ad_2,
                    ad_3: message.ad_3,
                    ad_4: message.ad_4,
                    ad_7: message.ad_7,
                    ad_16: message.ad_16,
                    ad_25: message.ad_25
                }
            );
            //channel.ack(msg);
        });
    } catch (error) {
        handleError(error, 'data.service -> getData');
        return [null, error];
    }
}

/**
 * @async
 * @function showData
 * @returns {Promise<void>}
 */
async function showData() {
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
    showData
};
