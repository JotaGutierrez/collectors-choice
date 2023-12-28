import CreateItem from '@Core/Item/application/CreateItem'
import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import { MongoClient } from 'mongodb'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const itemRepository = new MongoItemRepository(client)

  /** @TODO: Use DI from yaml files */
  const itemCreator = CreateItem(itemRepository)

  itemCreator(req.body.name, req.body.realm)

  res.status(200).json(await itemRepository.findAll())
}
