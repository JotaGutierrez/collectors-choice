import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import { MongoClient } from 'mongodb'

export async function GET (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI)
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name') ?? ''

  const realmRepository = new MongoRealmRepository(client)

  const realm = await realmRepository.findByName(name)

  return Response.json(realm === null ? {} : realm)
}
