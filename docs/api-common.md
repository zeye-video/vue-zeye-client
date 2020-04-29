# Common function

#### this.$zeyeClient.join({ roomId, peerId, displayName, forceH264, forceVP9, hostname, protooPort }) :void
Join specified room

Parameters:
- roomId - id of selected room
- peerId - id of current user, usually something unique like randomString(6)
- hostname - server hostame
- protooPort - server protoo port
- displayName [optional] - display name of current user, random pokemon name if not specified
- forceH264 [optional]
- forceVP9 [optional]
#

#### this.$zeyeClient.isConnected() :bool
Is connected to server
#

#### this.$zeyeClient.getGlobalAudioMuted() :bool
Is global audio mute enabled for current user
#

#### this.$zeyeClient.getVideoVisible() :bool
Is global video visible (or hidden) for current user