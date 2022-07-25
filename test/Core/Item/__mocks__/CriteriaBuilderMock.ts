
import CriteriaConstraintsBuilder from '../../../../src/Core/Item/domain/CriteriaConstraintsBuilder';

export class CriteriaBuilderMock implements CriteriaConstraintsBuilder
{
    realm: String;
    filter: String[];

    constructor() {
        this.realm = 'realm';
        this.filter =  [
            'filter'
        ];
    }
}
