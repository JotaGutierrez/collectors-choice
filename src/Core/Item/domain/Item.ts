
import Tag from '../../Tag/domain/Tag';
import ItemTagOrder from './ItemTagOrder';

class Item {
    _id: any;
    name: string;
    tags: Tag[] = [];
    notes: string = '';
    realm: string;
    order: number = 0;
    itemTagOrders: ItemTagOrder[] = [];

    constructor(name: string, realm: string) {
        this.name = name
        this.realm = realm
    }

    getId(): string {
        return this._id;
    }

    setTags(tags: Array<Tag>) {
        this.tags = tags;
    }

    addTag(tag: Tag) {
        if (!this.tags.find(e => e.name.includes(tag.name))) {
            this.tags.push(tag);
        }
    }

    removeTag(tag: Tag) {
        if (this.tags.find(e => e.name.includes(tag.name))) {
            this.tags.splice(this.tags.findIndex(e => e.name === tag.name), 1);
        }
    }

    setProperty(property: Tag) {
        const tags = Array.isArray(this.tags) ? this.tags.filter(tag => tag.group != property.group) : [];

        this.tags = [...tags, property];
    }

    /** @TODO: property and tag group describes the same concept. Choose one and refactor. */
    setItemTagOrder(itemTagOrder: ItemTagOrder) {
        const itemTagOrders = Array.isArray(this.itemTagOrders)
            ? this.itemTagOrders.filter(tagOrder => tagOrder.tag.group != itemTagOrder.tag.group)
            : []
        ;

        this.itemTagOrders = [...itemTagOrders, itemTagOrder];
    }
}

export default Item;
