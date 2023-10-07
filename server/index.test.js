import 'dotenv/config'
import { MongoRemoteServer } from './index.js'

const server = MongoRemoteServer({ 
  clusters: {
    demo: process.env.MONGO_URI,
  }
})

await server.handle(new Request('https://彡.sh/demo/client.db("test2").collection("test2").insertOne({"test":123})'))

server.close()

// const headers = { 
//   authorization: 'basic ' + btoa('username:password'),
//   'x-connection-protocol': 'mongodb+srv:',
//   'x-connection-hostname': 'cluster.xyzabc.mongodb.net',
//   'x-connection-port': 27017,
//   'x-connection-pathname': '/',
//   'x-connection-options': 'retryWrites=true&w=majority&readPreference=nearest',
// }
// server.handle(new Request('https://彡.sh/cluster.xyzabc.mongodb.net/client.db("test2").collection("test2").insertOne({"test":123})', { headers }))