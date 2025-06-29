import { publish } from './publisher'
import 'dotenv/config'

async function main() {
    const pedido = {
        clienteId: '05734d9c-2d6c-469d-a685-fe2dd067a7da',
        itens: [
            {
                itemId: '04f0372d-f296-44b4-9acd-f449e22005ef',
                quantidade: 2,
                valorUnitario: 6
            },
            {
                itemId: 'e1303c0d-4586-4e5d-965a-aa0da2fb556a',
                quantidade: 1,
                valorUnitario: 6
            }
        ]
    }

    await publish('pedidos', pedido)
}

main()
    .then(() => console.log('Pedido enviado à fila.'))
    .catch(console.error)