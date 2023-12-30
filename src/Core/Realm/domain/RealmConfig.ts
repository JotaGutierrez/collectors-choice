interface RealmConfigInterface {
    view: string;
    _property: string;
}

class RealmConfig {
    view: string;
    _property: string;

    constructor({view, _property}: RealmConfigInterface) {
        this.view = view;
        this._property = _property;
    }
}

export default RealmConfig;