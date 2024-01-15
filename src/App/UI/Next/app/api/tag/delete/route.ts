import DeleteTag from '@Core/Tag/application/DeleteTag'
import MongoTagRepository from '@Core/Tag/infrastructure/MongoTagRepository'
import { MongoClient } from 'mongodb'

export async function DELETE (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const tagRepository = new MongoTagRepository(client)

  const body = await request.json()

  await DeleteTag(tagRepository)(body.id)

  return Response.json(await tagRepository.findAll())
}
