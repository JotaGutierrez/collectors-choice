
import { ItemRepositoryMock } from '../__mocks__/ItemRepositoryMock';
import { ItemBuilder } from '../domain/ItemBuilder';
import ItemsByCriteria from '../../../../src/Core/Item/application/ItemsByCriteria';
import { CriteriaMock } from '../__mocks__/CriteriaMock';
import { CriteriaBuilderMock } from '../__mocks__/CriteriaBuilderMock';

describe('ItemsByCriteria', () => {

    let itemRepository: ItemRepositoryMock;

    beforeAll(() => {
        itemRepository = new ItemRepositoryMock();
    });

    it('should find items filtered by criteria', async () => {
        const items = [ItemBuilder.random(), ItemBuilder.random(), ItemBuilder.random()];
        itemRepository.returnFindByCriteria(items);

        const criteria = new CriteriaMock(new CriteriaBuilderMock());

        const result = await ItemsByCriteria(itemRepository)(criteria);

        itemRepository.assertFindByCriteriaHasBeenCalledWith(criteria);

        expect(items).toEqual(result);
      });
});
