import faker from "@faker-js/faker";

import Tag from '../../../../src/Core/Tag/domain/Tag';

export class TagBuilder {
    static randomTag() {
        return new Tag(faker.lorem.word(), faker.lorem.word(), faker.lorem.word(),'');
    }

    static randomProperty() {
        return new Tag(faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word());
    }
}
