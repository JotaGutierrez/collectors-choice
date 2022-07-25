
import Criteria from '../../../../src/Core/Item/domain/Criteria';
import Item from '../../../../src/Core/Item/domain/Item';
import ItemRepository from '../../../../src/Core/Item/domain/ItemRepository';

export class ItemRepositoryMock implements ItemRepository {

    private mockCreate = jest.fn();
    private mockUpdate = jest.fn();
    private mockFindByCriteria = jest.fn();
    private items: Array<Item> = [];

    create(item: Item): Item {
        this.mockCreate(item);

        return item;
    }

    assertSaveHasBeenCalledWith(item: Item) {
        expect(this.mockCreate).toHaveBeenCalledWith(item);
    }

    async update(item: Item): Promise<Item> {
        this.mockUpdate(item);

        return item;
    }

    assertUpdateHasBeenCalledWith(item: Item) {
        expect(this.mockUpdate).toHaveBeenCalledWith(item);
    }

    findAll(): Promise<Item[]> {
        throw new Error('Method not implemented.');
    }

    findById(id: string): Promise<Item> {
        throw new Error('Method not implemented.');
    }

    findByTags(tags: string[]): Promise<Item[]> {
        throw new Error('Method not implemented.');
    }

    findByRealm(realm: string): Promise<Item[]> {
        throw new Error('Method not implemented.');
    }

    deleteById(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async findByCriteria(criteria: Criteria): Promise<Item[]> {
        this.mockFindByCriteria(criteria);

        return this.items;
    }

    returnFindByCriteria(items: Array<Item>) {
        this.items = items;
    }

    assertFindByCriteriaHasBeenCalledWith(criteria: Criteria) {
        expect(this.mockFindByCriteria).toHaveBeenCalledWith(criteria);
    }
}
