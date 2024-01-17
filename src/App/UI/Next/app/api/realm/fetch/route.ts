import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'
import { User, withUser } from '../../../../middleware'

const handler = async (request: Request, user: User) => {
  const client = await MongoClient.connect(process.env.DB_URI ?? '')
  const realmRepository = new MongoRealmRepository(client)

  return NextResponse.json(await realmRepository.findAll(user.email))
}

export const GET = withUser(handler)
