import { MongoClient } from 'mongodb'
import JSON5 from 'json5'

let clients = {}

export const MongoRemoteServer = options => {

  const { clusters, ...opts } = options ?? {}
  if (!clusters) throw new Error('Missing clusters option')

  Object.entries(clusters).forEach(([ cluster, connectionString ]) => {
    clients[cluster] = new MongoClient(connectionString, { ...opts })
    clients[cluster].connect()
  })

  return { 
    handle: async req => {
      const { pathname } = new URL(req.url)
      const headers = Object.fromEntries(req.headers)
      const procedurePosition = pathname.slice(1).indexOf('/')
      const cluster = pathname.slice(1, procedurePosition + 1)

      if (!clients[cluster]) throw new Error(`Cluster ${cluster} not found`)

      const client = await clients[cluster]

      const procedures = pathname.slice(procedurePosition + 2, -1).split(').')
      const procedureCalls = procedures.map(procedure => {
        const [ method, ...args ] = procedure.split('(')
        return { method, args: args.map(arg => JSON5.parse(decodeURIComponent(arg))) }
      })
      procedureCalls[0].method = procedureCalls[0].method.replace('client.','')
      console.log({ cluster, headers })
      console.log(procedureCalls)


      let chain = client

      for (const { method, args } of procedureCalls) {
        if (!chain[method]) throw new Error(`Method ${method} not found`)
        console.log({ method, args })
        chain = chain[method](...args)
      }

      const results = await chain

      console.log({ results })

    },
    close: async () => {
      for (const client of Object.values(clients)) {
        await client.close()
      }
    }
  }
} 