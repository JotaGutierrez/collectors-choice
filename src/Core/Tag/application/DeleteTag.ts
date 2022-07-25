import Tag from '../domain/Tag';
import TagRepository from '../domain/TagRepository';

/** @TODO: Refactor. create TagCreator class or change first letter to lowerCase */
const DeleteTag = (repository: TagRepository) => async (id: string) =>
    await repository.deleteById(id);

export default DeleteTag;
