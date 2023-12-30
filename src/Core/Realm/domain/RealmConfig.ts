import Item from '../../Item/domain/Item';

class Realm {
    _id: any;
    name: string;
    items: Item[] = [];
    notes: string = "";

    constructor(name: string) {
        this.name = name;
    }
}

export default Realm;