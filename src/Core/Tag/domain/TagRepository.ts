import Tag from './Tag';

interface TagRepository {
    create(tag: Tag): Tag;
    findById(id: string): Promise<Tag>;
    findByName(name: string): Promise<Tag>;
    findByRealm(realm: string): Promise<Array<Tag>>;
    findAll(): Promise<Array<Tag>>;
    deleteById(id: string): Promise<any>;
}

export default TagRepository;
