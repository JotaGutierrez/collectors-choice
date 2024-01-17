import CriteriaConstraintsBuilder from '../../../../src/Core/Item/domain/CriteriaConstraintsBuilder';

export class CriteriaBuilderMock implements CriteriaConstraintsBuilder
{
    realm: string;
    tags: string[];
    _owner: string;

    constructor() {
        this.realm = 'realm';
        this.tags =  [
            'filter'
        ];
        this._owner= 'owner'
    }
}
