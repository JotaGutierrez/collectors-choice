
class Tag {
    name: string;
    realm: string;
    group: string;

    constructor(name: string, realm: string, group: string) {
        this.name = name;
        this.realm = realm;
        this.group = group;
    }

    isProperty() : boolean {
        return this.group !== '';
    }
}

export default Tag;
