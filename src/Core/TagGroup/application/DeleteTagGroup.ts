import TagGroupRepository from '../domain/TagGroupRepository';

/** @TODO: Ensure realm exists. Ensure TagGroup does not exists */
const deleteTagGroup = (repository: TagGroupRepository) => async (id: string) =>
    repository.deleteById(id);

export default deleteTagGroup;
