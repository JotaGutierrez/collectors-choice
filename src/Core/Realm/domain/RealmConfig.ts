interface RealmConfigInterface {
    view: string;
    property: string|null;
}

class RealmConfig {
    view: string;
    property: string|null;

    constructor({view, property}: RealmConfigInterface) {
        this.view = view;
        this.property = property;
    }
}

export default RealmConfig;