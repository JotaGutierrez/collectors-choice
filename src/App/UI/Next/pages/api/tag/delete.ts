import { MongoClient } from 'mongodb'
import DeleteTag from '../../../../../../Core/Tag/application/DeleteTag'
import MongoTagRepository from '../../../../../../Core/Tag/infrastructure/MongoTagRepository'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const tagRepository = new MongoTagRepository(client)

  DeleteTag(tagRepository)(req.body.id)

  res.status(200).json(await tagRepository.findAll())
}
