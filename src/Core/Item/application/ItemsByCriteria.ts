import ItemRepository from '../domain/ItemRepository';
import Criteria from '../domain/Criteria';

const ItemsByCriteria = (itemRepository: ItemRepository) => async (criteria: Criteria) =>
    await itemRepository.findByCriteria(criteria);


export default ItemsByCriteria;
