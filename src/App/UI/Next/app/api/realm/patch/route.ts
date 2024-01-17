import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import { MongoClient } from 'mongodb'
import { User, withUser } from '../../../../middleware'

export async function handler (request: Request, user: User) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const realmRepository = new MongoRealmRepository(client)

  const req = await request.json()

  const realm = await realmRepository.findById(req.realm._id)

  realm.notes = req.description ?? realm.notes
  realm.config = req.config ?? realm.config

  await realmRepository.update(realm)

  return new Response(JSON.stringify(await realmRepository.findAll(user.email)))
}

export const PATCH = withUser(handler)
