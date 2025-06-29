import amqp from 'amqplib'

let connection: amqp.ChannelModel | null = null
let channel: amqp.Channel | null = null

export async function connectRabbitMQ() {
    if (!connection || !channel) {
        connection = await amqp.connect(process.env.RABBITMQ_URL!)
        channel = await connection.createChannel()
    }

    return channel!
}
