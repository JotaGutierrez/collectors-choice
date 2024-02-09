import CriteriaConstraintsBuilder from '../domain/CriteriaConstraintsBuilder';

class QueryParamsCriteriaConstraintsBuilder implements CriteriaConstraintsBuilder
{
    realm: string;
    tags: Array<string>;
    archived: boolean;
    _owner: string;

    constructor(queryParams)
    {
        this.realm = queryParams.realm
        this.tags = JSON.parse(queryParams.filter.tags ?? "[]")
        this.archived = JSON.parse(queryParams.filter.archived ?? 'false')
        this._owner = queryParams._owner
    }
}

export default QueryParamsCriteriaConstraintsBuilder;
