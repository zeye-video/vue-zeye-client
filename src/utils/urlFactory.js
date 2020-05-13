export function getProtooUrl({ roomId, peerId, hostname, protooPort }) {
  hostname = hostname !== undefined ? hostname : 'localhost'
  protooPort = protooPort !== undefined ? protooPort : '4443'

  return `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}`
}
