import ampq from 'amqplib';
import {
    RABBITMQ_HOSTNAME,
    RABBITMQ_PASSWORD,
    RABBITMQ_PORT,
    RABBITMQ_QUEUE,
    RABBITMQ_VHOST,
    RABBITMQ_USERNAME
} from './configEnv.js';

const connectMQ = async () => {
    try {
        const connOptions = {
            protocol: 'amqp',
            hostname: RABBITMQ_HOSTNAME,
            port: RABBITMQ_PORT,
            username: RABBITMQ_USERNAME,
            password: RABBITMQ_PASSWORD,
            vhost: RABBITMQ_VHOST
        };
        const connection = await ampq.connect(connOptions);
        const channel = await connection.createChannel();
        await channel.assertQueue(RABBITMQ_QUEUE, {
            durable: false,
            arguments: { 'x-max-length': 500, 'x-overflow': 'drop-head' }
        });
        return channel;
    } catch (error) {
        console.error('Error al conectar con RabbitMQ: ', error);
        return null;
    }
}

export { connectMQ };