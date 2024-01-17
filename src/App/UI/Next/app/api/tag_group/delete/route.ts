import deleteTagGroup from '@Core/TagGroup/application/DeleteTagGroup'
import MongoTagGroupRepository from '@Core/TagGroup/infrastructure/MongoTagGroupRepository'
import { MongoClient } from 'mongodb'

export async function DELETE (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const tagGroupRepository = new MongoTagGroupRepository(client)

  const body = await request.json()

  await deleteTagGroup(tagGroupRepository)(body.id)

  return new Response(JSON.stringify(await tagGroupRepository.findByRealm(body.realm)))
}
