
import faker from "@faker-js/faker";

import TagGroup from '../../../../src/Core/TagGroup/domain/TagGroup';

export class TagGroupBuilder {
    static random() {
        return new TagGroup(faker.lorem.word(), faker.lorem.word());
    }
}
