import createTagGroup from '@Core/TagGroup/application/CreateTagGroup'
import MongoTagGroupRepository from '@Core/TagGroup/infrastructure/MongoTagGroupRepository'
import { MongoClient } from 'mongodb'

export async function POST (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const tagGroupRepository = new MongoTagGroupRepository(client)

  const propertyCreator = createTagGroup(tagGroupRepository)

  const body = await request.json()

  await propertyCreator(body.name, body.realm)

  return Response.json(await tagGroupRepository.findByRealm(body.realm))
}
