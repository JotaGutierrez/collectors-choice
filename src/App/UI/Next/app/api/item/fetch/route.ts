import ItemsByCriteria from '@Core/Item/application/ItemsByCriteria'
import MongoCriteria from '@Core/Item/infrastructure/MongoCriteria'
import MongoItemRepository from '@Core/Item/infrastructure/MongoItemRepository'
import QueryParamsCriteriaConstraintsBuilder from '@Core/Item/infrastructure/QueryParamsCriteriaConstraintsBuilder'
import { MongoClient } from 'mongodb'
import { User, withUser } from '../../../../middleware'

async function handler (request: Request, user: User) {
  /** @TODO: use middleware to avoid connecting from each controller */
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const itemRepository = new MongoItemRepository(client)

  const { searchParams } = new URL(request.url)

  const criteria = new MongoCriteria(new QueryParamsCriteriaConstraintsBuilder({
    realm: searchParams.get('realm'),
    filter: searchParams.get('filter'),
    _owner: user.email
  }))

  try {
    const items = await ItemsByCriteria(itemRepository)(criteria)

    return new Response(JSON.stringify(items))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}

export const GET = withUser(handler)
