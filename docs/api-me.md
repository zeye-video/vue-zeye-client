# Me functions
#### this.$zeyeClient.getMe() :object
Get user info

output example: 
```
{
    audioMuted:false
    audioOnly:false
    audioOnlyInProgress:false
    canChangeWebcam:undefined
    canSendMic:true
    canSendWebcam:true
    device:Object
    displayName:"Ursaring"
    id:"example0.19417503186118013"
    restartIceInProgress:false
    shareInProgress:false
    webcamInProgress:false
}
```

---

#### this.$zeyeClient.setMe(peerId, displayName) :void
Set user peerId and display name

---

#### this.$zeyeClient.getWebcamState() :string
Webcam state. 

returns 'on', 'off' or 'unsupported'

---

#### this.$zeyeClient.canIChangeWebcam() :bool
Can user change his webcam? (e.g. toggle between front and back one)

---

#### this.$zeyeClient.getScreenShareState() :bool
User`s screen share state

returns 'on' or 'off'

---

#### this.$zeyeClient.getMicState() :bool
User`s mic state

returns 'on', 'off' or 'unsupported'

---

#### this.$zeyeClient.toggleWebcam() :void
Turns user`s webcam on\off

Also available as 

`this.$zeyeClient.enableWebcam()` and 
`this.$zeyeClient.disableWebcam()`

---

#### this.$zeyeClient.changeWebcam() :void
Rotates camera (on mobile phones for ex.)

---

#### this.$zeyeClient.toggleShare() :void
Toggles user`s webcam on\off

---

#### this.$zeyeClient.toggleMicState() :void
Toggles user`s mic

Also available as 

`this.$zeyeClient.muteMic()` and 
`this.$zeyeClient.unmuteMic()`

