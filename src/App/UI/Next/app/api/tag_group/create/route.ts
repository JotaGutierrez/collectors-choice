import createTagGroup from '@Core/TagGroup/application/CreateTagGroup'
import MongoTagGroupRepository from '@Core/TagGroup/infrastructure/MongoTagGroupRepository'
import { MongoClient } from 'mongodb'
import { User, withUser } from '../../../../middleware'

async function handler (request: Request, user: User) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const tagGroupRepository = new MongoTagGroupRepository(client)

  const propertyCreator = createTagGroup(tagGroupRepository)

  const body = await request.json()

  await propertyCreator(body.name, body.realm, user.email)

  const groups = await tagGroupRepository.findByRealm(body.realm)

  return new Response(JSON.stringify(groups))
}

export const POST = withUser(handler)
