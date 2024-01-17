import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import { MongoClient } from 'mongodb'

export async function GET (request: Request) {
  /** @TODO: use middleware to avoid connecting from each controller */
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const itemRepository = new MongoItemRepository(client)

  const { searchParams } = new URL(request.url)

  try {
    return Response.json(await itemRepository.findById(searchParams.get('id') ?? ''))
  } catch (error) {
    return Response.json(error)
  }
}
