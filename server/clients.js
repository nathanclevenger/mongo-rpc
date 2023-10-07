export const getClient = async req => {
  const { pathname } = new URL(req.url)
  const headers = Object.fromEntries(req.headers)
  const procedurePosition = pathname.slice(1).indexOf('/')
  const cluster = pathname.slice(1, procedurePosition + 1)
  const credentials = atob(headers['authorization']?.split(' ')[1])
  const protocol = headers['x-connection-protocol']
  const hostname = headers['x-connection-hostname']
  const port = headers['x-connection-port']
  const path = headers['x-connection-pathname']
  const connectionOptions = headers['x-connection-options']
  const mongoUri = `${protocol}//${credentials}@${hostname}:${port}${path}?${connectionOptions}`
  const client = await getClientFromUri(mongoUri)
  return { client, cluster }
}