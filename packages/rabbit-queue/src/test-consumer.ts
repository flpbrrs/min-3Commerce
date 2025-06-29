import { consume } from './consumer'
import 'dotenv/config'

async function main() {
    await consume('pedidos', async (pedido) => {
        console.log('Pedido recebido:', pedido)
    })
}

main()
    .then(() => console.log('Consumidor iniciado.'))
    .catch(console.error)