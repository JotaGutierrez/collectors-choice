
import Tag from '../../../../src/Core/Tag/domain/Tag';
import TagRepository from '../../../../src/Core/Tag/domain/TagRepository';

export class TagRepositoryMock implements TagRepository
{
    private mockCreate = jest.fn();

    create(tag: Tag): Tag {
        this.mockCreate(tag);

        return tag;
    }

    assertSaveHasBeenCalledWith(tag: Tag) {
        expect(this.mockCreate).toHaveBeenCalledWith(tag);
    }

    findById(id: string): Promise<Tag> {
        throw new Error('Method not implemented.');
    }
    findByName(name: string): Promise<Tag> {
        throw new Error('Method not implemented.');
    }
    findByRealm(realm: string): Promise<Tag[]> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Tag[]> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
