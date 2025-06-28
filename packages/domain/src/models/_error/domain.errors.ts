import DomainError from "./domain.error";

export type ErrorsByField<TFields extends string> = {
    [K in TFields]?: Array<{
        code: string;
        message: string;
    }>;
};

export default class DomainErrors extends Error {

    static groupByField<TFields extends string>(errors: DomainError[]): ErrorsByField<TFields> {

        const result: ErrorsByField<TFields> = {};

        for (const err of errors) {
            const field = DomainErrors.extractFieldFromCode(err.code) as TFields;

            if (!result[field]) {
                result[field] = [];
            }

            result[field]!.push({
                code: err.code,
                message: err.message
            });
        }

        return result;
    }

    // Pattern: code.field-error
    // Example: 'produto.valor-invalid'
    private static extractFieldFromCode(code: string): string {
        const parts = code.split('.');
        const [, fieldAndError] = parts;
        return fieldAndError!.split('-')[0]!;
    }
}