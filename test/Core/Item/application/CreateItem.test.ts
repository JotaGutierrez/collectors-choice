
import CreateItem from '../../../../src/Core/Item/application/CreateItem';
import { ItemRepositoryMock } from '../__mocks__/ItemRepositoryMock';
import { ItemBuilder } from '../domain/ItemBuilder';

describe('ItemCreator', () => {
    it('Creates a new Item', async () => {

        const item = ItemBuilder.random();

        const itemRepository = new ItemRepositoryMock();

        const itemCreator = CreateItem(itemRepository);

        itemCreator(item.name, item.realm);

        itemRepository.assertSaveHasBeenCalledWith(item);
    });
});
