
import Criteria from '../../../../src/Core/Item/domain/Criteria';
import CriteriaConstraintsBuilder from '../../../../src/Core/Item/domain/CriteriaConstraintsBuilder';

export class CriteriaMock implements Criteria
{
    params: CriteriaConstraintsBuilder;

    constructor(params: CriteriaConstraintsBuilder)
    {
        this.params = params;
    }

    criteria() {
        return {
            reaml: this.params.realm,
            filter: this.params.filter,
        };
    }
}
