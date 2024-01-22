import Item from '../domain/Item';
import Tag from '../../Tag/domain/Tag';
import ItemTagOrder from '../domain/ItemTagOrder';
import ItemRepository from '../domain/ItemRepository';

const setItemProperty = (repository: ItemRepository) => async (itemObject: { name: string; realm: string; owner: string; }, tag: Tag, itemTagOrder: number | 0) => {
    /**
     * @TODO: hydrate Tag class
     * if (!tag.isProperty()) {
     **/
    if (tag.group === '') {
        /** @TODO: Use custom error class */
        throw new Error('Tag is not a property');
    }

    /**
     * f**k...
     * @TODO: Look how to hydrate objects through reflection
     * */
    const item = Object.assign(new Item(itemObject.name,itemObject.realm, itemObject.owner), itemObject)
    item.setProperty(tag);

    item.setItemTagOrder(new ItemTagOrder(tag, itemTagOrder));

    return await repository.update(item);
}

export default setItemProperty;
