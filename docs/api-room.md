# Room function

#### this.$zeyeClient.getCurrentRoom() :bool
Gets current room info

example output:
```
{
    activeSpeakerId:"example0.948354575553958"
    state:"connected"
    url:"https://demo.loc/?room=1337"
} 
```

#
#### this.$zeyeClient.amIActiveSpeaker() :bool
Checks if current user is talking 

#
#### this.$zeyeClient.isSpeakerActive(peerId) :bool
Checks if specified peer id is talking 
#

#### this.$zeyeClient.setRoomUrl(optionalRoomUrl?) :void
Sets url of current room.

if called without `optionalRoomUrl` it sets `window.location.href`