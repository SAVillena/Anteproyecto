import  { connectMQ }  from '../config/configMQ.js';
import  { loadProtoSchema }  from '../utils/protoHandler.js';
import  Data  from '../models/data.model.js';
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
            console.log('Mensaje recibido');
            if(msg === null) return console.log('No hay mensajes');
            console.log('Mensaje recibido: ', msg);
            const data = await loadProtoSchema();
            if (!data) {
                throw new Error('Error al cargar el proto');
            }
            const message = data.decode(msg.content);
            console.log('Mensaje decodificado: ', message);
            await Data.create(message);
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
