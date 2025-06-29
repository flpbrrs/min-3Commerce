import { connectRabbitMQ } from './rabbitmq'

export async function consume(queue: string, handler: (msg: any) => Promise<void>) {
    const channel = await connectRabbitMQ()
    await channel.assertQueue(queue, { durable: true })

    await channel.consume(queue, async (msg) => {
        if (!msg) return

        try {
            const content = JSON.parse(msg.content.toString())
            await handler(content)
            channel.ack(msg)
        } catch (err) {
            console.error('Erro ao processar mensagem:', err)
            channel.nack(msg, false, false)
        }
    })
}
