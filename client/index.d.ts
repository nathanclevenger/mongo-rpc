import type { Collection, Db, MongoClient, MongoClientOptions } from 'mongodb'

export type MongoRemoteClient = (options: MongoRemoteClientOptions) =>  {
  db: (databaseName: string) => Database
  [key: string]: Database
} extends MongoClient ? MongoClient : never

export interface Database extends Db {
  collection: (collectionName: string) => Collection
  [key: string]: Collection
}

export interface MongoRemoteClientOptions {
  cluster: string,
  apiKey: string,
  baseURL?: string,
}