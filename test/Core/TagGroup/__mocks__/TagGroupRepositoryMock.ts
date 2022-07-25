
import TagGroup from '../../../../src/Core/TagGroup/domain/TagGroup';
import TagGroupRepository from '../../../../src/Core/TagGroup/domain/TagGroupRepository';

export class TagGroupRepositoryMock implements TagGroupRepository
{
    private mockCreate = jest.fn();

    create(tagGroup: TagGroup): TagGroup {
        this.mockCreate(tagGroup);

        return tagGroup;
    }

    assertSaveHasBeenCalledWith(TagGroup: TagGroup) {
        expect(this.mockCreate).toHaveBeenCalledWith(TagGroup);
    }

    findByName(name: string): Promise<TagGroup> {
        throw new Error('Method not implemented.');
    }

    findByRealm(realm: string): Promise<TagGroup[]> {
        throw new Error('Method not implemented.');
    }

    deleteById(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
