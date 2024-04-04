import setItemProperty from '@Core/Item/application/SetItemProperty'
import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import MongoTagRepository from '@Core/Tag/infrastructure/MongoTagRepository'
import { MongoClient } from 'mongodb'

export async function PATCH (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const itemRepository = new MongoItemRepository(client)

  const body = await request.json()

  const item = await itemRepository.find(body.id)

  const tagRepository = new MongoTagRepository(client)
  const tag = await tagRepository.findById(body.tagId)

  await setItemProperty(itemRepository)(item, tag, body.index)

  return new Response(JSON.stringify(await itemRepository.queryAll()))
}
