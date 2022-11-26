import { MongoClient } from 'mongodb'
import ItemsByCriteria from '../../../../../../Core/Item/application/ItemsByCriteria'
import MongoCriteria from '../../../../../../Core/Item/infrastructure/MongoCriteria'
import MongoItemRepository from '../../../../../../Core/Item/infrastructure/MongoItemRepository'
import QueryParamsCriteriaConstraintsBuilder from '../../../../../../Core/Item/infrastructure/QueryParamsCriteriaConstraintsBuilder'

export default async function handler (req, res) {
  /** @TODO: use middleware to avoid connecting from each controller */
  const client = await MongoClient.connect(process.env.DB_URI)

  const itemRepository = new MongoItemRepository(client)

  try {
    res.status(200).json(await ItemsByCriteria(itemRepository)(new MongoCriteria(new QueryParamsCriteriaConstraintsBuilder(req.query))))
  } catch (error) {
    res.status(200).json([])
  }
}
