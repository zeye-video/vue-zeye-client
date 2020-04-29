# Consumers functions
#### this.$zeyeClient.getConsumers() :array
Get connected consumers of your media 

#### this.$zeyeClient.getAudioConsumer(peerId) :object
Get audio consumer by its peerId

Output example:
```
{
    codec:"opus"
    id:"4a13ac10-3e5e-4e37-a0bf-d7251d56f9ca"
    locallyPaused:false
    preferredSpatialLayer:0
    preferredTemporalLayer:0
    priority:1
    remotelyPaused:false
    rtpParameters:Object
    score:Object
    spatialLayers:1
    temporalLayers:1
    track:MediaStreamTrack
    type:"simple"
}
```

#### this.$zeyeClient.getVideoConsumer(peerId) :object
Get video consumer by its peerId

Output example:
```
{
    codec:"VP8"
    id:"bfd09824-9a09-4b34-8f0e-911224007066"
    locallyPaused:false
    preferredSpatialLayer:0
    preferredTemporalLayer:0
    priority:1
    remotelyPaused:false
    rtpParameters:Object
    score:Object
    spatialLayers:1
    temporalLayers:1
    track:MediaStreamTrack
    type:"simple"
}
```