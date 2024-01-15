import CriteriaConstraintsBuilder from '../domain/CriteriaConstraintsBuilder';

class QueryParamsCriteriaConstraintsBuilder implements CriteriaConstraintsBuilder
{
    realm: String;
    filter: Array<String>;

    constructor(queryParams)
    {
        this.realm = queryParams.realm;
        this.filter = JSON.parse(queryParams.filter ?? "[]");
    }
}

export default QueryParamsCriteriaConstraintsBuilder;
