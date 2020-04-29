# Producers function

#### this.$zeyeClient.getProducers() :array
Current user`s producers (usually there are two - audio from mic and video from webcam)

#### this.$zeyeClient.getAudioProducer() :object
Current user`s audio producer

output example: 
``` 
{
    codec:"opus"
    id:"dbfdae2a-270a-42a5-9a23-30f34faf56e0"
    paused:false
    rtpParameters:Object
    score:Array[1]
    track:MediaStreamTrack
}
```

#### this.$zeyeClient.getVideoProducer() :object
Current user`s video producer

output example: 
```
{
    codec:"VP8"
    deviceLabel:"Integrated Webcam (0c45:6715)"
    id:"d811aa4c-e53d-4833-b277-96a3db5e0c08"
    paused:false
    rtpParameters:Object
    score:Array[1]
    track:MediaStreamTrack
    type:"front"
} 
```