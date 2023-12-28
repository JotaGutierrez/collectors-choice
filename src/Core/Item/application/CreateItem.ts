import Item from '../domain/Item';
import ItemRepository from '../domain/ItemRepository';

const CreateItem = (repository: ItemRepository) => (name: string, realm: string) => repository.create(new Item(name, realm));

export default CreateItem;
