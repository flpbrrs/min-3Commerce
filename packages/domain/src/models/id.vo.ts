import { v4 as uuid, validate } from 'uuid'
import DomainError from './_error/domain.error'

export default class Id {
    readonly value

    constructor(value?: string) {
        this.value = value ?? uuid()

        if (!Id.isValid(this.value))
            DomainError.launch(
                'id.valor-invalido',
                'O ID fornecido está no formato inválido'
            )
    }

    equals(id: Id): boolean {
        return this.value === id.value
    }

    notEquals(id: Id): boolean {
        return this.value !== id.value
    }

    static isValid(id?: Id | string): boolean {
        if (!id) return false
        return id instanceof Id === true
            ? validate(id.value)
            : validate(id)
    }

    static generate() {
        return uuid()
    }
}