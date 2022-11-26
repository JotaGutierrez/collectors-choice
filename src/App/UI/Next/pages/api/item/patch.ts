import { MongoClient } from 'mongodb'
import MongoItemRepository from '../../../../../../Core/Item/infrastructure/MongoItemRepository'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const itemRepository = new MongoItemRepository(client)
  const item = await itemRepository.findById(req.body._id)

  item.notes = req.body.notes

  await itemRepository.update(item)

  res.status(200).json(await itemRepository.findAll())
}
