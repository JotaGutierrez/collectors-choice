import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import { MongoClient } from 'mongodb'
import { User, withUser } from '../../../../middleware'

export async function handler (request: Request, user: User) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name') ?? ''

  const realmRepository = new MongoRealmRepository(client)

  const realm = await realmRepository.findByName(name, user.email)

  return new Response(JSON.stringify(realm === null ? {} : realm))
}

export const GET = withUser(handler)
