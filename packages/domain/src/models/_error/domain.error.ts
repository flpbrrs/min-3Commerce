export interface DomainErrorProps {
    code?: string,
    value?: any,
    extras?: object
}

export default class DomainError extends Error {
    readonly code?: string
    readonly value?: any
    readonly extras?: any

    constructor(readonly props?: DomainErrorProps) {
        super(props?.code ?? 'domain.generic')

        this.code = props?.code ?? 'domain.generic'
        this.value = props?.value
        this.extras = props?.extras ?? {}
    }

    static create(code?: string, value?: any, extras?: any): DomainError {
        return new DomainError({ code, value, extras })
    }

    static launch(code?: string, value?: any, extras?: any): never {
        throw new DomainError({ code, value, extras })
    }
}