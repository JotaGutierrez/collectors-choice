import setItemProperty from '@Core/Item/application/SetItemProperty'
import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import MongoTagRepository from '@Core/Tag/infrastructure/MongoTagRepository'
import { MongoClient } from 'mongodb'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const itemRepository = new MongoItemRepository(client)
  const item = await itemRepository.findById(req.body.id)

  const tagRepository = new MongoTagRepository(client)
  const tag = await tagRepository.findById(req.body.value._id)

  setItemProperty(itemRepository)(item, tag, req.body.index)

  res.status(200).json(await itemRepository.findAll())
}
