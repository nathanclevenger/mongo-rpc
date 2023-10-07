import type { Collection, Db, MongoClient, MongoClientOptions } from 'mongodb'

// export const MongoRPCClient = (connectionString: string, options: MongoClientOptions) => {
//   db: databaseName: string => 
// }

// export const 

// export class MongoRPC extends MongoClient {
//   constructor(connectionString: string, options: MongoClientOptions) {
//     super(connectionString, options)
//   }

//   db(databaseName: string): Database {
//     return new Database(databaseName)
//   }
// }


export type MongoRemoteClient = (connectionString: string, options: MongoClientOptions) =>  {
  db: (databaseName: string) => Database
  [key: string]: Database
} extends MongoClient ? MongoClient : never

export type Database = {
  collection: (collectionName: string) => Collection
  [key: string]: Collection
}