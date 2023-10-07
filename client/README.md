# mongo-rpc: MongoDB RPC Client for Edge Proxy, Caching, and Connection Pooling

```javascript
import { MongoRemoteClient } from 'mongo-rpc'

const client = MongoRemoteClient({ cluster: 'demo', apiKey: 'testing123' })

const findResults = await client.db('test').collection('test').find({}).sort({_id: -1}).limit(100).toArray()
const insertResults = await client.db('test2').collection('test2').insertOne({ test: 123 })

console.log({ findResults, insertResults })
```