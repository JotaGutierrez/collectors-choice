import CriteriaConstraintsBuilder from '../domain/CriteriaConstraintsBuilder';

class QueryParamsCriteriaConstraintsBuilder implements CriteriaConstraintsBuilder
{
    realm: string;
    tags: Array<string>;
    _owner: string;

    constructor(queryParams)
    {
        this.realm = queryParams.realm
        this.tags = JSON.parse(queryParams.filter ?? "[]")
        this._owner = queryParams._owner
    }
}

export default QueryParamsCriteriaConstraintsBuilder;
