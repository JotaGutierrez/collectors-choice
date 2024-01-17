import ItemDeletedEvent from '@Core/Item/domain/ItemDeletedEvent'
import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import ItemCountDecrement from '@Core/Realm/application/ItemCountDecrement'
import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import EventBus from '@Core/Shared/Infrastructure/EventBus/EventBus'
import { MongoClient } from 'mongodb'

export async function DELETE (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const itemRepository = new MongoItemRepository(client)
  const realmRepository = new MongoRealmRepository(client)

  EventBus.getInstance().subscribe(ItemDeletedEvent, ItemCountDecrement(realmRepository))

  const body = await request.json()

  const id = body?.id

  try {
    const result = await itemRepository.deleteById(id)

    if (result && result.deletedCount) {
      return new Response()
    } else if (!result) {
      return Response.error()
    } else if (!result.deletedCount) {
      return Response.error()
    }
  } catch (error) {
    console.error(error.message)
    return Response.error()
  }
}
