import { describe, expect, it } from '@jest/globals'
import Entity, { EntityProps } from '../../src/models/entity.basis'

interface TestProps extends EntityProps {
    name?: string
}

class TestEntity extends Entity<TestEntity, TestProps> {
    constructor(props: TestProps) {
        super(props)
    }
}

describe("Testes para o objeto de valor: EntityBasis", () => {
    it("Deve criar uma entidade com id gerado automaticamente", () => {
        const entity = new TestEntity({ name: 'Test Entity' });

        expect(entity.id).toBeDefined();
        expect(entity.props.name).toBe('Test Entity');
    });

    it("Deve comparar duas entidades iguais", () => {
        const entity1 = new TestEntity({ name: 'Entity 1' });
        const entity2 = new TestEntity({ name: "Entity 2" });

        expect(entity1.equal(entity2)).toBe(false);
        expect(entity1.notEquals(entity2)).toBe(true);
    });

    it("Deve clonar uma entidade com novas propriedades", () => {
        const entity = new TestEntity({ name: 'Original Entity' });
        const clonedEntity = entity.clone({ name: 'Cloned Entity' });

        expect(clonedEntity.props.name).toBe('Cloned Entity');
        expect(clonedEntity.id.equals(entity.id)).toBe(true);
    });
});