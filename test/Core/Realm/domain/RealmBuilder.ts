import faker from "@faker-js/faker";

import Realm from '../../../../src/Core/Realm/domain/Realm';

export class RealmBuilder {
    static random() {
        return new Realm(faker.lorem.word(), faker.lorem.word());
    }
}
