import Tag from '../domain/Tag';
import TagRepository from '../domain/TagRepository';

/** @TODO: Refactor. create TagCreator class or change first letter to lowerCase */
const CreateTag = (repository: TagRepository) => async (name: string, realm: string, group: string | '') =>
    await repository.create(new Tag(name, realm, group));

export default CreateTag;
