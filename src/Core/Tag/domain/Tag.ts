class Tag {
    _id: any;
    name: string;
    realm: string;
    private _owner: string;
    group: string;

    constructor(name: string, realm: string, owner: string, group: string) {
        this._owner = owner;
        this.name = name;
        this.realm = realm;
        this.group = group;
    }

    getId(): string {
        return this._id;
    }

    get owner(): string {
        return this._owner;
    }

    isProperty(): boolean {
        return this.group !== '';
    }
}

export default Tag;
