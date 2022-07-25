import TagGroup from '../domain/TagGroup';
import TagGroupRepository from '../domain/TagGroupRepository';

/** @TODO: Ensure realm exists. Ensure TagGroup does not exists */
const createTagGroup = (repostory: TagGroupRepository) => async (name: string, realm: string) =>
    repostory.create(new TagGroup(name, realm));

export default createTagGroup;
