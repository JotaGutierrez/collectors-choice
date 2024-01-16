import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import { MongoClient } from 'mongodb'

export async function PATCH (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const realmRepository = new MongoRealmRepository(client)

  const req = await request.json()

  const realm = await realmRepository.findById(req.realm._id)

  realm.notes = req.description ?? realm.notes
  realm.config = req.config ?? realm.config

  await realmRepository.update(realm)

  return Response.json(await realmRepository.findAll())
}
