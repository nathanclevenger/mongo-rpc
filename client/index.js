export const MongoRemoteClient = (connectionString, options) => {

  let connectionURL

  try {
    connectionURL = new URL(connectionString)
    console.log({ connectionURL })
  } catch (error) { }
  

  const { apiKey, baseURL = `https://彡.sh/${connectionURL?.hostname ?? 'demo'}/client`, ...opts } = options


  const sendCommand = async url => {
    console.log(url)
    const headers = { 
      'Authorization': apiKey ?? `Basic ${btoa(`${connectionURL?.username}:${connectionURL?.password}`)}`,
      'X-Connection-Protocol': connectionURL?.protocol,
      'X-Connection-Hostname': connectionURL?.hostname,
      'X-Connection-Port': connectionURL?.port,
      'X-Connection-Pathname': connectionURL?.pathname,
      'X-Connection-Options': connectionURL?.search,
    }
    console.log({ headers })
    const startTime = Date.now()
    const results = await fetch(url, { headers }).then(res => res.json())
    const latency = Date.now() - startTime
    console.log({ results, latency })
    return results
  }

  const recursiveProxy = ({ command = baseURL }) => {

    return new Proxy({}, {
      get: (target, prop) => {
        // console.log('get', { target, prop })
        if (prop === 'then') {
          return (resolve) => {
            sendCommand(command).then(data => resolve(recursiveProxy({ command: baseURL }).data = data))
          }
        }

        return (...args) => {
          // console.log('call', { command, method: prop, args })
          const argString = args.map(arg => JSON.stringify(arg)).join(',')
          return recursiveProxy({
            command: `${command}.${prop}(${argString})`
          })
        }
      },
    })
  }

  return recursiveProxy({})
}