import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET () {
  const client = await MongoClient.connect(process.env.DB_URI)

  const realmRepository = new MongoRealmRepository(client)

  return NextResponse.json(await realmRepository.findAll())
}
