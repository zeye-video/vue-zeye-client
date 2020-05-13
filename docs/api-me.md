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


---

#### this.$zeyeClient.setOutputDevice(audioOutputIndex) :void
Change audio output by its id

```
const devices = await navigator.mediaDevices.enumerateDevices()
const audioDevices = devices.filter(
  (device) => device.kind === 'audiooutput'
)

<a v-for="(device, index) in audioDevices" :key="device.deviceId" @click="$zeyeClient.setOutputDevice(device.deviceId)">Output {{index}}</a>
```

---

#### this.$zeyeClient.updateAudioOutputDevices() :void
Update known audio output devices + set current as default one

---


#### this.$zeyeClient.getAudioOutputDevices() :Array<MediaDeviceInfo>
Get array of known output devices
Should be called only after updateAudioOutputDevices

---


#### this.$zeyeClient.getCurrentAudioOutputDevice() :MediaDeviceInfo
get known audio output devices
Should be called only after updateAudioOutputDevices

---


#### this.$zeyeClient.setAudioOutputDevice(mediaDeviceInfo) :void
Set audio output device

```vue
<v-list-item
  v-for="outputDevice in $zeyeClient.getAudioOutputDevices()"
  :key="outputDevice.deviceId"
  @click="$zeyeClient.setAudioOutputDevice(outputDevice)"
>
  <v-list-item-title>
    <v-icon
      v-if="
        $zeyeClient.getCurrentAudioOutputDevice().deviceId ===
          outputDevice.deviceId
      "
    >
      mdi-check
    </v-icon>
    {{ outputDevice.label }}
  </v-list-item-title>
</v-list-item>
```
---
