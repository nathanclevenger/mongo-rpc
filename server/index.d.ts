import type { MongoClient, MongoClientOptions } from 'mongodb'

export type MongoRemoteServer = (options: MongoRemoteClientOptions) =>  {
  handle: (request: Request) => Promise<Object>
  close: () => Promise<void>
} 

export interface MongoRemoteServerOptions extends MongoClientOptions {
  clusters: Map<string, string>
}