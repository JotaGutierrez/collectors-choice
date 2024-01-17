interface RealmConfigInterface {
    view: string;
    _property: string|null;
}

class RealmConfig {
    view: string;
    _property: string|null;

    constructor({view, _property}: RealmConfigInterface) {
        this.view = view;
        this._property = _property;
    }
}

export default RealmConfig;