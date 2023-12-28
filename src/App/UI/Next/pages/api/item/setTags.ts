import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import { MongoClient } from 'mongodb'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const itemRepository = new MongoItemRepository(client)
  const item = await itemRepository.findById(req.body.id)

  item.tags = req.body.tags

  await itemRepository.update(item)

  res.status(200).json(await itemRepository.findAll())
}
