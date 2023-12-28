import deleteTagGroup from '@Core/TagGroup/application/DeleteTagGroup'
import MongoTagGroupRepository from '@Core/TagGroup/infrastructure/MongoTagGroupRepository'
import { MongoClient } from 'mongodb'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const tagGroupRepository = new MongoTagGroupRepository(client)

  deleteTagGroup(tagGroupRepository)(req.body.id)

  res.status(200).json(await tagGroupRepository.findByRealm(req.body.realm))
}
