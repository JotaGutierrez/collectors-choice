import CreateTag from '@Core/Tag/application/CreateTag'
import MongoTagRepository from '@Core/Tag/infrastructure/MongoTagRepository'
import { MongoClient } from 'mongodb'
import { User, withUser } from '../../../../middleware'

async function handler (request: Request, user: User) {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')

  const tagRepository = new MongoTagRepository(client)

  const body = await request.json()

  await CreateTag(tagRepository)(body.name, body.realm, user.email, body.group ?? '')

  return new Response(JSON.stringify(await tagRepository.findAll()))
}

export const POST = withUser(handler)
