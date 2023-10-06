export const MongoRPCClient = (connectionString, options) => {
  let timer

  const sendCommand = async url => {
    console.log(url)
    const startTime = Date.now()
    const results = await fetch(url).then(res => res.json())
    const latency = Date.now() - startTime
    console.log({ results, latency })
    return results
  }

  const recursiveProxy = ({ stack = [], command = 'https://彡.sh/client' }) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(sendCommand, null, command)
    // console.log({ timer })
    return new Proxy({ stack = [] } = {}, {
      get: (target, prop) => {
        // console.log('get', { target, prop })
        return (...args) => {
          // console.log('call', { command, method: prop, args })
          const argString = args.map(arg => JSON.stringify(arg)).join(',') //.replaceAll('"',`'`)
          return recursiveProxy({ command: `${command}.${prop}(${argString})`, stack: [...stack, { method: prop, args }] })
        }
      },
    })
  }

  return recursiveProxy({})

}
