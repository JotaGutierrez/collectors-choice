import TagGroup from './TagGroup';

interface TagGroupRepository {
    create(tagGroup: TagGroup): TagGroup;
    findByName(name: string): Promise<TagGroup>;
    findByRealm(realm: string): Promise<Array<TagGroup>>;
    deleteById(id: string): Promise<any>;
}

export default TagGroupRepository;
