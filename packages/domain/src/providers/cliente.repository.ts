import Cliente from "../entities/cliente.entity"

export interface ClienteRepository {
    save(cliente: Cliente): Promise<void>
    findById(id: string): Promise<Cliente | null>
}