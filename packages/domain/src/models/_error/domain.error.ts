export interface DomainErrorProps {
    code: string,
    message: string
}

export default class DomainError extends Error {
    readonly code: string
    readonly message: string

    private constructor(readonly props: DomainErrorProps) {
        super(props.code)

        this.code = props.code
        this.message = props.message
    }

    static create(code: string, message: string): DomainError {
        return new DomainError({ code, message })
    }

    static launch(code: string, message: string): never {
        throw new DomainError({ code, message })
    }
}