import { MongoClient } from 'mongodb'
import CreateTag from '../../../../../../Core/Tag/application/CreateTag'
import MongoTagRepository from '../../../../../../Core/Tag/infrastructure/MongoTagRepository'

export default async function handler (req, res) {
  const client = await MongoClient.connect('mongodb://mongo:27017/lotion')

  const tagRepository = new MongoTagRepository(client)

  CreateTag(tagRepository)(req.body.name, req.body.realm, req.body.group ?? '')

  res.status(200).json(await tagRepository.findAll())
}
