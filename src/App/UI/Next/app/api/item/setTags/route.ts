import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import { MongoClient } from 'mongodb'

export async function PATCH (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const itemRepository = new MongoItemRepository(client)

  const body = await request.json()

  const item = await itemRepository.find(body.id)

  item.tags = body.tags

  await itemRepository.update(item)

  return new Response(JSON.stringify(await itemRepository.queryAll()))
}
