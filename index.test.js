import { MongoRPCClient } from './index.js'

const client = MongoRPCClient('mongodb://localhost:27017', { useUnifiedTopology: true })

client.db('test').collection('test').find({}).sort({_id: -1}).limit(10).toArray()

const test = client.db('anotherTest').collection('anotherTest')

test.find({}).sort({_id: -1}).limit(100).toArray()