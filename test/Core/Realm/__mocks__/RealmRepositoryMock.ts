
import Realm from '../../../../src/Core/Realm/domain/Realm';
import RealmRepository from '../../../../src/Core/Realm/domain/RealmRepository';

export class RealmRepositoryMock implements RealmRepository
{
    private mockCreate = jest.fn();

    create(realm: Realm): Realm {
        this.mockCreate(realm);

        return realm;
    }

    assertSaveHasBeenCalledWith(realm: Realm) {
        expect(this.mockCreate).toHaveBeenCalledWith(realm);
    }

    update(item: Realm): Promise<Realm> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Realm[]> {
        throw new Error('Method not implemented.');
    }
    findById(id: string): Promise<Realm> {
        throw new Error('Method not implemented.');
    }
    findByName(name: string): Promise<Realm> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
