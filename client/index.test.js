import { MongoRemoteClient } from './index.js'

// const client = MongoRemoteClient('mongodb://admin:password@cluster.xyzabc.mongodb.net:27017?retryWrites=true&w=majority&readPreference=nearest', { useUnifiedTopology: true })
// const client = MongoRemoteClient('mongodb://localhost:27017', { useUnifiedTopology: true })
const client = MongoRemoteClient({ cluster: 'demo', apiKey: process.env.API_KEY })


const insertResults = await client.db('test').collection('test').insertOne({ test: 123 })
const findResults = await client.db('test').collection('test').find({}).sort({_id: -1}).limit(100).toArray()

console.log({ findResults, insertResults })

