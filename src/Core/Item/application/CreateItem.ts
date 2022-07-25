import Item from '../domain/Item';
import ItemRepository from '../domain/ItemRepository';

const CreateItem = (repository: ItemRepository) => (name, realm) => repository.create(new Item(name, realm));

export default CreateItem;
