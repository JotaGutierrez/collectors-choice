import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import { MongoClient } from 'mongodb'

export default async function handler (req, res) {
  /** @TODO: use middleware to avoid connecting from each controller */
  const client = await MongoClient.connect(process.env.DB_URI)

  const itemRepository = new MongoItemRepository(client)

  try {
    res.status(200).json(await itemRepository.findById(req.query.id))
  } catch (error) {
    res.status(200).json(error)
  }
}
