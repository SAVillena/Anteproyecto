import ampq from 'amqplib';

const connectMQ = async () => {
    try {
        const connOptions = {
            protocol: 'amqp',
            hostname: '13.59.192.198',
            port: 5672,
            username: 'ChileCSX',
            password: 'sergioprueba',
            vhost: 'test-1'
        };
        const connection = await ampq.connect(connOptions);
        const channel = await connection.createChannel();
        await channel.assertQueue('e9a4a49e982e44ff9c4fbfa6aef5c5b2', { 
            durable: false ,
            arguments: { 'x-max-length': 500, 'x-overflow': 'drop-head'}});
        return channel;
    } catch (error) {
        console.error('Error al conectar con RabbitMQ: ', error);
        return null;
    }
}

export { connectMQ };