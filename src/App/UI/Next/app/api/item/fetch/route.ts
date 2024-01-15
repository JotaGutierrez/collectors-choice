import ItemsByCriteria from '@Core/Item/application/ItemsByCriteria'
import MongoCriteria from '@Core/Item/infrastructure/MongoCriteria'
import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import QueryParamsCriteriaConstraintsBuilder from '@Core/Item/infrastructure/QueryParamsCriteriaConstraintsBuilder'
import { MongoClient } from 'mongodb'

export async function GET (request: Request) {
  /** @TODO: use middleware to avoid connecting from each controller */
  const client = await MongoClient.connect(process.env.DB_URI)

  const itemRepository = new MongoItemRepository(client)

  const { searchParams } = new URL(request.url)

  const cri = new MongoCriteria(new QueryParamsCriteriaConstraintsBuilder({
    realm: searchParams.get('realm'),
    filter: searchParams.get('filter')
  }))

  try {
    return Response.json(await ItemsByCriteria(itemRepository)(cri))
  } catch (error) {
    return Response.json([])
  }
}
