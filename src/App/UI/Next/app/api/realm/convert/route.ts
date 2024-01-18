import RealmConfig from '@Core/Realm/domain/RealmConfig'
import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import createTag from '@Core/Tag/application/CreateTag'
import MongoTagRepository from '@Core/Tag/infrastructure/MongoTagRepository'
import createTagGroup from '@Core/TagGroup/application/CreateTagGroup'
import MongoTagGroupRepository from '@Core/TagGroup/infrastructure/MongoTagGroupRepository'
import { MongoClient } from 'mongodb'
import { User, withUser } from '../../../../middleware'

async function handler (request: Request, user: User) {
  const req = await request.json()

  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const realmRepository = new MongoRealmRepository(client)

  const realm = await realmRepository.findById(req.realm._id)

  const tagGroupRepository = new MongoTagGroupRepository(client)

  const propertyCreator = createTagGroup(tagGroupRepository)
  await propertyCreator('state', realm.name, user.email)
  const tagCreator = createTag(new MongoTagRepository(client))

  await tagCreator('TODO', realm.name, user.email, 'state')
  await tagCreator('DOING', realm.name, user.email, 'state')
  await tagCreator('DONE', realm.name, user.email, 'state')

  realm.config = new RealmConfig({ view: 'board', _property: 'state' })

  await realmRepository.update(realm)

  return new Response(JSON.stringify(await realmRepository.findAll(user.email)))
}

export const POST = withUser(handler)
