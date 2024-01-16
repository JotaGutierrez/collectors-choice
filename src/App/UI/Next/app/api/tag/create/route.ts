import CreateTag from '@Core/Tag/application/CreateTag'
import MongoTagRepository from '@Core/Tag/infrastructure/MongoTagRepository'
import { MongoClient } from 'mongodb'

export async function POST (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const tagRepository = new MongoTagRepository(client)

  const body = await request.json()

  await CreateTag(tagRepository)(body.name, body.realm, body.owner, body.group ?? '')

  return Response.json(await tagRepository.findAll())
}
