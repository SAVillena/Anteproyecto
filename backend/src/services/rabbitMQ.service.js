import Data from '../models/data.model.js';
import { loadProtoSchema } from '../utils/protoHandler.js';


async function consumeMessages(channel) {
    channel.consume('e9a4a49e982e44ff9c4fbfa6aef5c5b2', async (msg) => {
        if (msg === null) return console.log('No hay mensajes');
        try {
            const data = await loadProtoSchema();
            if (!data) {
                throw new Error('Error al cargar el proto');
            }
            const message = data.decode(msg.content);
            // console.log('Mensaje decodificado: ', message);
            await processData(message);
            channel.ack(msg);
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });
}

async function processData(message) {
    const tsLong = message.ts;  // Suponiendo que es un objeto Long
    const date = new Date(tsLong.toNumber());
    await Data.create({
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
    });
}

export { consumeMessages };
