# mongo-rpc-server: MongoDB RPC Server for Edge Proxy, Caching, and Connection Pooling

Set up a MongoDB RPC Server to proxy requests to a MongoDB cluster, cache results, and pool connections

```javascript
import { MongoRemoteServer } from 'npm:mongo-rpc-server'

const clusters = {
  demo: `mongodb://admin:${Deno.env.get('MONGO_PASSWORD')}@cluster.xyzabc.mongodb.net:27017?retryWrites=true&w=majority&readPreference=nearest`
}

const mongo = MongoRemoteServer({ clusters })

Deno.serve(async req => {
  try {
    if (req.headers.get('x-api-key') !== Deno.env.get('API_KEY')) throw new Error('Invalid API Key')
    const { method, params } = await req.json()
    const start = Date.now()
    const data = await mongo()
    const latency = Date.now() - start
    Response.json({ latency, data })
  } catch (error) {
    console.error(error)
    Response.json({ error: error.message }, { status: 500 })
  }
})

```

Then you can connect 

```javascript
import { MongoRemoteClient } from 'mongo-rpc'

const client = MongoRemoteClient({ cluster: 'demo', apiKey: 'testing123' })

const findResults = await client.db('test').collection('test').find({}).sort({_id: -1}).limit(100).toArray()
const insertResults = await client.db('test2').collection('test2').insertOne({ test: 123 })

console.log({ findResults, insertResults })
```