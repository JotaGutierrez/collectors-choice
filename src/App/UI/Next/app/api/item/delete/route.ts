import ItemDeletedEvent from '@Core/Item/domain/ItemDeletedEvent'
import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import ItemCountDecrement from '@Core/Realm/application/ItemCountDecrement'
import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import EventBus from '@Core/Shared/Infrastructure/EventBus/EventBus'
import { MongoClient } from 'mongodb'
import { User, withUser } from '../../../../middleware'

async function handler (request: Request, user: User) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const itemRepository = new MongoItemRepository(client)
  const realmRepository = new MongoRealmRepository(client)

  EventBus.getInstance().subscribe(ItemDeletedEvent, ItemCountDecrement(realmRepository, user))

  const body = await request.json()

  const id = body?.id

  try {
    const result = await itemRepository.delete(id)

    if (!result) {
      return new Response(null, { status: 404 })
    } else if (!result.deletedCount) {
      return new Response(null, { status: 400 })
    }
  } catch (error) {
    return new Response(null, { status: 500 })
  }

  return new Response()
}

export const DELETE = withUser(handler)
