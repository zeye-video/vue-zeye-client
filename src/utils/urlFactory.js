export function getProtooUrl({
  roomId,
  peerId,
  protooHostname,
  protooPort,
  authToken
}) {
  protooHostname = protooHostname !== undefined ? protooHostname : 'localhost'
  protooPort = protooPort !== undefined ? protooPort : '4443'
  authToken = authToken !== undefined ? authToken : ''

  return `wss://${protooHostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}&authToken=${authToken}`
}
