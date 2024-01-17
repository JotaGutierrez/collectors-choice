import Criteria from '../domain/Criteria';
import CriteriaConstraintsBuilder from '../domain/CriteriaConstraintsBuilder';

class MongoCriteria implements Criteria
{
    realmName: string;
    tags: Array<string>;
    _owner: string;

    constructor({ realm, tags, _owner }: CriteriaConstraintsBuilder) {
        this.realmName = realm;
        this.tags = tags;
        this._owner = _owner;
    }

    criteria() : any {
        const tagFilter = this.tags.length > 0 ? {"tags.name": {"$all": [...this.tags] }} : {};

        return  {
            "realm": this.realmName,
            "_owner": this._owner,
            ...tagFilter
        }
    }
}

export default MongoCriteria;
