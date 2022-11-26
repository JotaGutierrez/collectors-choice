
class Tag {
    _id: any;
    name: string;
    realm: string;
    group: string;

    constructor(name: string, realm: string, group: string) {
        this.name = name;
        this.realm = realm;
        this.group = group;
    }

    getId(): string {
        return this._id;
    }

    isProperty(): boolean {
        return this.group !== '';
    }
}

export default Tag;
