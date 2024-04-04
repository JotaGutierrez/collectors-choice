import Item from '@Core/Item/domain/Item'
import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import { MongoClient } from 'mongodb'

export async function PATCH (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const itemRepository = new MongoItemRepository(client)

  const body = await request.json()
  const item = await itemRepository.find(body._id)

  return new Response(JSON.stringify(await itemRepository.update(<Item>{ ...item, ...body })))
}
