import CreateRealm from '@Core/Realm/application/CreateRealm'
import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import { MongoClient } from 'mongodb'
import { User, withUser } from '../../../../middleware'

export async function handler (request: Request, user: User) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const realmRepository = new MongoRealmRepository(client)
  const body = await request.json()

  CreateRealm(realmRepository)(body.name, user.email)

  return new Response(JSON.stringify(await realmRepository.findAll(user.email)))
}

export const POST = withUser(handler)
