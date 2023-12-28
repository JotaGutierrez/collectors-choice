import createTagGroup from '@Core/TagGroup/application/CreateTagGroup'
import MongoTagGroupRepository from '@Core/TagGroup/infrastructure/MongoTagGroupRepository'
import { MongoClient } from 'mongodb'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const tagGroupRepository = new MongoTagGroupRepository(client)

  const propertyCreator = createTagGroup(tagGroupRepository)

  propertyCreator(req.body.name, req.body.realm)

  res.status(200).json(await tagGroupRepository.findByRealm(req.body.realm))
}
