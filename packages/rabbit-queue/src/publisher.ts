import { connectRabbitMQ } from './rabbitmq'

export async function publish(queue: string, message: object) {
    const channel = await connectRabbitMQ()
    await channel.assertQueue(queue, { durable: true })

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true
    })
}
