import MongoTagRepository from '@Core/Tag/infrastructure/MongoTagRepository'
import { MongoClient } from 'mongodb'

export async function GET (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const tagRepository = new MongoTagRepository(client)

  const { searchParams } = new URL(request.url)
  const realm = searchParams.get('realm') ?? ''

  return new Response(JSON.stringify(await tagRepository.findByRealm(realm)))
}
