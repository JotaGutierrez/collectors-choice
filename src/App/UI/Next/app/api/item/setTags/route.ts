import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import { MongoClient } from 'mongodb'

export async function PATCH (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const itemRepository = new MongoItemRepository(client)

  const body = await request.json()

  const item = await itemRepository.findById(body.id)

  item.tags = body.tags

  await itemRepository.update(item)

  return Response.json(await itemRepository.findAll())
}
