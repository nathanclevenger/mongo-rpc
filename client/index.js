export const MongoRemoteClient = ({
  cluster,
  apiKey,
  baseURL = `https://彡.sh/${cluster ?? 'demo'}/client`,
}) => {

  const sendCommand = async url => {
    console.log(url)
    const headers = { 'Authorization': apiKey }
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