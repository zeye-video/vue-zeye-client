export function getProtooUrl({
  roomId,
  peerId,
  hostname,
  protooPort,
  authToken
}) {
  hostname = hostname !== undefined ? hostname : 'localhost'
  protooPort = protooPort !== undefined ? protooPort : '4443'
  authToken = authToken !== undefined ? authToken : ''

  return `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}&authToken=${authToken}`
}
