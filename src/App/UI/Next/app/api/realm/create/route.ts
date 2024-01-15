import CreateRealm from '@Core/Realm/application/CreateRealm'
import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import { MongoClient } from 'mongodb'

export async function POST (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const realmRepository = new MongoRealmRepository(client)
  const body = await request.json()

  CreateRealm(realmRepository)(body.name)

  return Response.json(await realmRepository.findAll())
}
