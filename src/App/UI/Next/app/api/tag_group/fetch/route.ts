import MongoTagGroupRepository from '@Core/TagGroup/infrastructure/MongoTagGroupRepository'
import { MongoClient } from 'mongodb'

export async function GET (request: Request) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const tagGroupRepository = new MongoTagGroupRepository(client)

  const { searchParams } = new URL(request.url)

  const groups = await tagGroupRepository.findByRealm(searchParams.get('realm') ?? '')

  return new Response(JSON.stringify(groups))
}
