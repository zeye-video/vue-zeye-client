# Props

#### :peerId="{string}"
Either `:peerId="$zeyeClient.getMe().id"` or  
```
v-for="peer in $zeyeClient.getPeers()" :peerId="peer.id"
```
#
#### :showVolumeBar="{boolean}"
Display volume bar of the peer

Default: false

#
#### :volumeBarColor="{string}"
default: "greenyellow"

