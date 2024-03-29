import CreateItem from '@Core/Item/application/CreateItem'
import ItemCreatedEvent from '@Core/Item/domain/ItemCreatedEvent'
import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import ItemCountIncrement from '@Core/Realm/application/ItemCountIncrement'
import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import EventBus from '@Core/Shared/Infrastructure/EventBus/EventBus'
import { MongoClient } from 'mongodb'
import { User, withUser } from '../../../../middleware'

async function handler (request: Request, user: User) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const itemRepository = new MongoItemRepository(client)
  const realmRepository = new MongoRealmRepository(client)

  EventBus.getInstance().subscribe(ItemCreatedEvent, ItemCountIncrement(realmRepository, user.email))

  const body = await request.json()

  CreateItem(itemRepository)(body.name, body.realm, user.email)

  const items = await itemRepository.findAll()

  return new Response(JSON.stringify(items))
}

export const POST = withUser(handler)
