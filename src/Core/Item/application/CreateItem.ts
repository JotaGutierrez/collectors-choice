import Item from '../domain/Item';
import ItemRepository from '../domain/ItemRepository';

const CreateItem = (repository: ItemRepository) => (name: string, realm: string, owner: string) =>
  repository.create(new Item(name, realm, owner));

export default CreateItem;
