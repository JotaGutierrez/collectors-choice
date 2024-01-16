import TagGroup from '../domain/TagGroup';
import TagGroupRepository from '../domain/TagGroupRepository';

/** @TODO: Ensure realm exists. Ensure TagGroup does not exists */
const createTagGroup = (repository: TagGroupRepository) => async (name: string, realm: string, owner: string) =>
    repository.create(new TagGroup(name, realm, owner));

export default createTagGroup;
