
import Criteria from '../domain/Criteria';
import CriteriaConstraintsBuilder from '../domain/CriteriaConstraintsBuilder';

class MongoCriteria implements Criteria
{
    realmName: String;
    filter: Array<String>;

    constructor({ realm, filter }: CriteriaConstraintsBuilder) {
        this.realmName = realm;
        this.filter = filter;
    }

    criteria() : any {
        if (this.filter.length > 0) {
            return {
                "realm": this.realmName,
                "tags.name": {"$all": [...this.filter] },
            }
        }

        return  {
            "realm": this.realmName,
        }
    }
}

export default MongoCriteria;
