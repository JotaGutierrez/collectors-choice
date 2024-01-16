import {RealmBuilder} from '../domain/RealmBuilder';
import {RealmRepositoryMock} from '../__mocks__/RealmRepositoryMock';
import CreateRealm from '../../../../src/Core/Realm/application/CreateRealm';

describe('ItemCreator', () => {
    it('Creates a new Realm', async () => {

        const item = RealmBuilder.random();

        const itemRepository = new RealmRepositoryMock();

        const itemCreator = CreateRealm(itemRepository);

        itemCreator(item.name, item.owner);

        itemRepository.assertSaveHasBeenCalledWith(item);
    });
});
