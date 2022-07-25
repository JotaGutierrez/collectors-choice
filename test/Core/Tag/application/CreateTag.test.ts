
import { TagBuilder } from '../domain/TagBuilder';
import { TagRepositoryMock } from '../__mocks__/TagRepositoryMock';
import CreateTag from '../../../../src/Core/Tag/application/CreateTag';

describe('TagCreator', () => {
    it('Creates a new Tag', async () => {

        const tag = TagBuilder.randomTag();

        const tagRepository = new TagRepositoryMock();

        const tagCreator = CreateTag(tagRepository);

        tagCreator(tag.name, tag.realm, tag.group);

        tagRepository.assertSaveHasBeenCalledWith(tag);
    });
});
