import CreateItem from '@Core/Item/application/CreateItem'
import ItemCreatedEvent from '@Core/Item/domain/ItemCreatedEvent'
import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import ItemCountIncrement from '@Core/Realm/application/ItemCountIncrement'
import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import EventBus from '@Core/Shared/Infrastructure/EventBus/EventBus'
import { MongoClient } from 'mongodb'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const itemRepository = new MongoItemRepository(client)
  const realmRepository = new MongoRealmRepository(client)

  EventBus.getInstance().subscribe(ItemCreatedEvent, ItemCountIncrement(realmRepository))

  /** @TODO: Use DI from yaml files */
  const itemCreator = CreateItem(itemRepository)

  itemCreator(req.body.name, req.body.realm)

  res.status(200).json(await itemRepository.findAll())
}
