import Item from './Item';
import Criteria from './Criteria';

interface ItemRepository {
    create(item: Item): Item;
    update(item: Item): Promise<Item>;
    findAll(): Promise<Array<Item>>;
    findById(id: string): Promise<Item>;
    findByTags(tags: Array<string>): Promise<Array<Item>>;
    findByRealm(realm: string) : Promise<Array<Item>>;
    deleteById(id: string): Promise<any>;
    findByCriteria(criteria: Criteria): Promise<Array<Item>>;
}

export default ItemRepository;
