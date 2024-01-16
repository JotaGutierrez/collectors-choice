import Item from '../../Item/domain/Item';
import RealmConfig from "./RealmConfig";

class Realm {
    _id: any;
    name: string;
    items: Item[] = [];
    notes: string = "";
    itemCount: number = 0;
    config: RealmConfig|null = null;
    owner: string;

    constructor(name: string, owner: string) {
        this.name = name;
        this.owner = owner;
    }
}

export default Realm;