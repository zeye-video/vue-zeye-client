# Docs

You can access all $zeyeClient function in your vue comonents as `this.$zeyeClient`

Almost all of theese is a sugar on top of $store manipulations, so if you are a jedi you can dig in to the source code and use it hard way :)

### Security
To use security you should provide an `wsAuthEndpoint` option 
to the `this.$zeyeClient.join()`

Example:
```javascript
this.$zeyeClient.join({
      roomId,
      peerId,
      displayName: this.$zeyeClient.getMe().displayName,
      protooPort: '4443',
      wsAuthEndpoint: 'https://zeye-server-host:4443/authEndpoint'
    })
```

Mentioned endpoint is already made (mostly as example) in zeye-server (look server.js under createExpressApp)

Because my vision tells me this whole stack is for embdedding in another project of yours,
you should probably use your own auth endpoint to actually check csrf\session\jwt and other stuff you`d want

### API
[Common](./api-common) - Common functions

[Consumers](./api-consumers) - Info on consumers of your media

[Me](./api-me) - Info on current user

[Peers](./api-peers) - Connected peers (usually means in current room)

[Producers](./api-producers) - Info on current user`s producers (from mic and\or webcam)

[Room](./api-room) - Info on current room
