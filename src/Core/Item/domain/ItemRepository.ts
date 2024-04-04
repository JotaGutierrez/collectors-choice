import Item from './Item';
import Criteria from './Criteria';

interface ItemRepository {
    create(item: Item): Item;
    update(item: Item): Promise<Item>;
    queryAll(): Promise<Array<Item>>;
    find(id: string): Promise<Item>;
    delete(id: string): Promise<any>;
    query(criteria: Criteria): Promise<Array<Item>>;
}

export default ItemRepository;
