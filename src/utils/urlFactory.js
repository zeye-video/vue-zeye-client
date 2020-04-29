export function getProtooUrl({ roomId, peerId, forceH264, forceVP9, hostname, protooPort }) {
  hostname = hostname !== undefined ? hostname : 'localhost'
  protooPort = protooPort !== undefined ? protooPort : '4443'

  let url = `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}`

  if (forceH264) url = `${url}&forceH264=true`
  else if (forceVP9) url = `${url}&forceVP9=true`

  return url
}
