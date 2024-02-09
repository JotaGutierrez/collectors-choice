import Criteria from '../domain/Criteria';
import CriteriaConstraintsBuilder from '../domain/CriteriaConstraintsBuilder';

class MongoCriteria implements Criteria
{
    realmName: string;
    tags: Array<string>;
    archived: boolean;
    _owner: string;

    constructor({ realm, tags, archived, _owner }: CriteriaConstraintsBuilder) {
        this.realmName = realm;
        this.tags = tags;
        this.archived = archived;
        this._owner = _owner;
    }

    criteria() : any {
        const tagFilter = this.tags.length > 0 ? {"tags.name": {"$all": [...this.tags] }} : {};

        return  {
            "realm": this.realmName,
            "_owner": this._owner,
            "archived": this.archived,
            ...tagFilter
        }
    }
}

export default MongoCriteria;
