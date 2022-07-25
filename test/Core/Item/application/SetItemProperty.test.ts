
import { ItemRepositoryMock } from '../__mocks__/ItemRepositoryMock';
import setItemProperty from '../../../../src/Core/Item/application/SetItemProperty';
import { ItemBuilder } from '../domain/ItemBuilder';
import { TagBuilder } from '../../Tag/domain/TagBuilder';
import ItemTagOrder from '../../../../src/Core/Item/domain/ItemTagOrder';
import Item from '../../../../src/Core/Item/domain/Item';

describe('ItemPropertySetter', () => {

    let item: Item;
    let itemRepository: ItemRepositoryMock;

    beforeAll(() => {
        item = ItemBuilder.random();
        itemRepository = new ItemRepositoryMock();
    });

    it('Adds a property to item', async () => {

        const property = TagBuilder.randomProperty();
        const itemPropertySetter = setItemProperty(itemRepository);

        const updatedItem = await itemPropertySetter(item, property, 0);

        itemRepository.assertUpdateHasBeenCalledWith(item);

        expect(updatedItem.tags).toContainEqual(property);
        expect(updatedItem.itemTagOrders).toContainEqual(new ItemTagOrder(property, 0));
    });

    it('Throws exception if tag is not a property', async () => {

        const tag = TagBuilder.randomTag();
        const itemPropertySetter = setItemProperty(itemRepository);

        itemPropertySetter(item, tag, 0).catch(e => expect(e.message).toMatch('Tag is not a property'));
    });
});
