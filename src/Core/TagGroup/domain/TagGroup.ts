class TagGroup {
    get owner(): string {
        return this._owner;
    }
    name: string;
    realm: string;
    private readonly _owner: string;

    constructor(name: string, realm: string, owner: string) {
        this.name = name;
        this.realm = realm;
        this._owner = owner;
    }
}

export default TagGroup;
