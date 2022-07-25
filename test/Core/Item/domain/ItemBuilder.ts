
import faker from "@faker-js/faker";

import Item from '../../../../src/Core/Item/domain/Item';

export class ItemBuilder {
    static random() {
        return new Item(faker.lorem.word(), faker.lorem.word());
    }
}
