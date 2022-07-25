
import Tag from '../../Tag/domain/Tag';

class ItemTagOrder {
    tag: Tag;
    order: number;

    constructor(tag: Tag, order: number) {
        this.tag = tag;
        this.order = order;
    }
}

export default ItemTagOrder;
