import Item from '../../Item/domain/Item';
import RealmConfig from "./RealmConfig";

class Realm {
    _id: any;
    name: string;
    items: Item[] = [];
    notes: string = "";
    config: RealmConfig = null;

    constructor(name: string) {
        this.name = name;
    }
}

export default Realm;