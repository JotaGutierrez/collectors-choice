
import { TagGroupBuilder } from '../domain/TagGroupBuilder';
import { TagGroupRepositoryMock } from '../__mocks__/TagGroupRepositoryMock';
import CreateTagGroup from '../../../../src/Core/TagGroup/application/CreateTagGroup';

describe('TagGroupCreator', () => {
    it('Creates a new Tag group', async () => {

        const tagGroup = TagGroupBuilder.random();

        const tagGroupRepository = new TagGroupRepositoryMock();

        const tagGroupCreator = CreateTagGroup(tagGroupRepository);

        tagGroupCreator(tagGroup.name, tagGroup.realm);

        tagGroupRepository.assertSaveHasBeenCalledWith(tagGroup);
    });
});
