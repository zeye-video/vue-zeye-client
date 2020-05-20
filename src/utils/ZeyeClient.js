import protooClient from 'protoo-client'
import * as mediasoupClient from 'mediasoup-client'
import Vue from 'vue'
import axios from 'axios'
import { getProtooUrl } from './urlFactory'
import * as cookiesManager from './cookiesManager'
import randomName from './randomName'
import randomString from './randomString'

const VIDEO_CONSTRAINS = {
  qvga: { width: { ideal: 320 }, height: { ideal: 240 } },
  vga: { width: { ideal: 640 }, height: { ideal: 480 } },
  hd: { width: { ideal: 1280 }, height: { ideal: 720 } }
}

const PC_PROPRIETARY_CONSTRAINTS = {
  optional: [{ googDscp: true }]
}

const VIDEO_SIMULCAST_ENCODINGS = [
  { scaleResolutionDownBy: 4 },
  { scaleResolutionDownBy: 2 },
  { scaleResolutionDownBy: 1 }
]

// Used for VP9 webcam video.
const VIDEO_KSVC_ENCODINGS = [{ scalabilityMode: 'S3T3_KEY' }]

// Used for VP9 desktop sharing.
const VIDEO_SVC_ENCODINGS = [{ scalabilityMode: 'S3T3', dtx: true }]

export default class ZeyeClient {
  constructor({ store, forceH264, forceVP9 }) {
    // Vue Store
    this.store = store

    // Closed flag.
    // @type {Boolean}
    this._closed = false

    // Whether we want to produce audio/video.
    // @type {Boolean}
    this._produce = true

    // Whether we should consume.
    // @type {Boolean}
    this._consume = true

    // Whether we want DataChannels.
    // @type {Boolean}
    this._useDataChannel = true

    // External video.
    // @type {HTMLVideoElement}
    this._externalVideo = null

    // MediaStream of the external video.
    // @type {MediaStream}
    this._externalVideoStream = null

    // Next expected dataChannel test _useDataChannelnumber.
    // @type {Number}
    this._nextDataChannelTestNumber = 0

    // Protoo URL.
    // @type {String}
    this._protooUrl = null

    // protoo-client Peer instance.
    // @type {protooClient.Peer}
    this._protoo = null

    // mediasoup-client Device instance.
    // @type {mediasoupClient.Device}
    this._mediasoupDevice = null

    // mediasoup Transport for sending.
    // @type {mediasoupClient.Transport}
    this._sendTransport = null

    // mediasoup Transport for receiving.
    // @type {mediasoupClient.Transport}
    this._recvTransport = null

    // Local mic mediasoup Producer.
    // @type {mediasoupClient.Producer}
    this._micProducer = null

    // Local webcam mediasoup Producer.
    // @type {mediasoupClient.Producer}
    this._webcamProducer = null

    // Local share mediasoup Producer.
    // @type {mediasoupClient.Producer}
    this._shareProducer = null

    // Local chat DataProducer.
    // @type {mediasoupClient.DataProducer}
    this._chatDataProducer = null

    // Local bot DataProducer.
    // @type {mediasoupClient.DataProducer}
    this._botDataProducer = null

    // mediasoup Consumers.
    // @type {Map<String, mediasoupClient.Consumer>}
    this._consumers = new Map()

    // mediasoup DataConsumers.
    // @type {Map<String, mediasoupClient.DataConsumer>}
    this._dataConsumers = new Map()

    // Map of webcam MediaDeviceInfos indexed by deviceId.
    // @type {Map<String, MediaDeviceInfos>}
    this._webcams = new Map()

    // Array of output audio MediaDeviceInfos indexed by deviceId.
    // @type {Array<MediaDeviceInfos>}
    this._outputDevices = []

    // Local Webcam.
    // @type {Object} with:
    // - {MediaDeviceInfo} [device]
    // - {String} [resolution] - 'qvga' / 'vga' / 'hd'.
    this._webcam = {
      device: null,
      resolution: 'hd'
    }

    // Force H264 codec for sending.
    this._forceH264 = Boolean(forceH264)

    // Force VP9 codec for sending.
    this._forceVP9 = Boolean(forceVP9)

    this.$bus = new Vue()
  }

  close() {
    if (this._closed) return

    this._closed = true

    console.debug('close()')

    if (this._webcamProducer) this._webcamProducer.close()

    if (this._shareProducer) this._shareProducer.close()

    // Close protoo Peer
    if (this._protoo) this._protoo.close()

    // Close mediasoup Transports.
    if (this._sendTransport) this._sendTransport.close()

    if (this._recvTransport) this._recvTransport.close()

    this.store.commit('zeyeClient/room/setRoomState', { state: 'closed' })
  }

  /**
   *
   * @param roomId
   * @param peerId
   * @param displayName
   * @param protooHostname
   * @param protooPort
   * @param wsAuthEndpoint
   * @param wsAuthData
   */
  async join({
    roomId,
    peerId,
    displayName,
    protooHostname,
    protooPort,
    wsAuthEndpoint,
    wsAuthData
  }) {
    protooHostname = protooHostname !== undefined ? protooHostname : false
    protooPort = protooPort !== undefined ? protooPort : false

    wsAuthEndpoint = wsAuthEndpoint !== undefined ? wsAuthEndpoint : false
    wsAuthData = wsAuthData !== undefined ? wsAuthData : {}

    this._displayName = displayName !== undefined ? displayName : randomName()

    let authToken = false

    /*
      wsAuthEndpoint is an authentication backend api POST endpoint which
      in exchange for current session cookies and\or wsAuthData
      will ask backend to store a short lived (e.g. 1 minute) one-time use token (e.g. in DB)
      with some random string in it and send that token back

      Given token must be present in protocol url, so that zeye-server could check it against DB.
      Token should be removed from DB afterwards.

      Typical flow:
      1. User wants to connect
      2. wsAuthEndpoint will return either authToken or empty string (or HTTP 401 for which means empty authTicket as well)
      3. getProtooUrl will form url with authToken
      4. zeye-server if configured to allow guests will open wss as usual
      5. zeye-server if configured to check authorization will check given ticket in DB and remove it from DB afterwards
     */

    if (wsAuthEndpoint) {
      const response = await axios.post(wsAuthEndpoint, wsAuthData, {
        withCredentials: true
      })

      authToken = response.data
    }

    this._protooUrl = getProtooUrl({
      roomId,
      peerId,
      protooHostname,
      protooPort,
      authToken
    })

    const protooTransport = new protooClient.WebSocketTransport(this._protooUrl)

    this._protoo = new protooClient.Peer(protooTransport)

    this.store.commit('zeyeClient/room/setRoomState', { state: 'connecting' })

    this._protoo.on('open', () => this._joinRoom())

    this._protoo.on('failed', () => {
      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: 'WebSocket connection failed'
      })
    })

    this._protoo.on('disconnected', () => {
      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: 'WebSocket disconnected'
      })

      // Close mediasoup Transports.
      if (this._sendTransport) {
        this._sendTransport.close()
        this._sendTransport = null
      }

      if (this._recvTransport) {
        this._recvTransport.close()
        this._recvTransport = null
      }

      this.store.commit('zeyeClient/room/setRoomState', { state: 'closed' })
    })

    this._protoo.on('close', () => {
      if (this._closed) return

      this.close()
    })

    // eslint-disable-next-line no-unused-vars
    this._protoo.on('request', async (request, accept, reject) => {
      console.debug(
        'proto "request" event [method:%s, data:%o]',
        request.method,
        request.data
      )

      switch (request.method) {
        case 'newConsumer': {
          if (!this._consume) {
            reject(403, 'I do not want to consume')

            break
          }

          const {
            peerId,
            producerId,
            id,
            kind,
            rtpParameters,
            type,
            appData,
            producerPaused
          } = request.data

          try {
            const consumer = await this._recvTransport.consume({
              id,
              producerId,
              kind,
              rtpParameters,
              appData: { ...appData, peerId } // Trick.
            })

            // Store in the map.
            this._consumers.set(consumer.id, consumer)

            consumer.on('transportclose', () => {
              this._consumers.delete(consumer.id)
            })

            const {
              spatialLayers,
              temporalLayers
            } = mediasoupClient.parseScalabilityMode(
              consumer.rtpParameters.encodings[0].scalabilityMode
            )

            this.store.commit('zeyeClient/consumers/addConsumer', {
              consumer: {
                id: consumer.id,
                type,
                locallyPaused: false,
                remotelyPaused: producerPaused,
                rtpParameters: consumer.rtpParameters,
                spatialLayers,
                temporalLayers,
                preferredSpatialLayer: spatialLayers - 1,
                preferredTemporalLayer: temporalLayers - 1,
                priority: 1,
                codec: consumer.rtpParameters.codecs[0].mimeType.split('/')[1],
                track: consumer.track
              }
            })

            this.store.commit('zeyeClient/peers/addConsumer', {
              consumer: {
                id: consumer.id
              },
              peerId
            })

            // We are ready. Answer the protoo request so the server will
            // resume this Consumer (which was paused for now if video).
            accept()

            // If audio-only mode is enabled, pause it.
            if (
              consumer.kind === 'video' &&
              this.store.state.zeyeClient.me.audioOnly
            )
              this._pauseConsumer(consumer)
          } catch (error) {
            console.error('"newConsumer" request failed:%o', error)

            this.store.dispatch('zeyeClient/notify', {
              type: 'error',
              text: `Error creating a Consumer: ${error}`
            })

            throw error
          }

          break
        }

        case 'newDataConsumer': {
          if (!this._consume) {
            reject(403, 'I do not want to data consume')

            break
          }

          if (!this._useDataChannel) {
            reject(403, 'I do not want DataChannels')

            break
          }

          const {
            peerId, // NOTE: Null if bot.
            dataProducerId,
            id,
            sctpStreamParameters,
            label,
            protocol,
            appData
          } = request.data

          try {
            const dataConsumer = await this._recvTransport.consumeData({
              id,
              dataProducerId,
              sctpStreamParameters,
              label,
              protocol,
              appData: { ...appData, peerId } // Trick.
            })

            // Store in the map.
            this._dataConsumers.set(dataConsumer.id, dataConsumer)

            dataConsumer.on('transportclose', () => {
              this._dataConsumers.delete(dataConsumer.id)
            })

            dataConsumer.on('open', () => {
              console.debug('DataConsumer "open" event')
            })

            dataConsumer.on('close', () => {
              console.warn('DataConsumer "close" event')

              this._dataConsumers.delete(dataConsumer.id)

              this.store.dispatch('zeyeClient/notify', {
                type: 'error',
                text: 'DataConsumer closed'
              })
            })

            dataConsumer.on('error', (error) => {
              console.error('DataConsumer "error" event:%o', error)

              this.store.dispatch('zeyeClient/notify', {
                type: 'error',
                text: `DataConsumer error: ${error}`
              })
            })

            dataConsumer.on('message', (message) => {
              console.debug(
                'DataConsumer "message" event [streamId:%d]',
                dataConsumer.sctpStreamParameters.streamId
              )

              // TODO: For debugging.
              window.DC_MESSAGE = message

              if (message instanceof ArrayBuffer) {
                const view = new DataView(message)
                const number = view.getUint32()

                if (number === 2 ** 32 - 1) {
                  console.warn('dataChannelTest finished!')

                  this._nextDataChannelTestNumber = 0

                  return
                }

                if (number > this._nextDataChannelTestNumber) {
                  console.warn(
                    'dataChannelTest: %s packets missing',
                    number - this._nextDataChannelTestNumber
                  )
                }

                this._nextDataChannelTestNumber = number + 1

                return
              } else if (typeof message !== 'string') {
                console.warn('ignoring DataConsumer "message" (not a string)')

                return
              }

              switch (dataConsumer.label) {
                case 'chat': {
                  const { peers } = this.store.state
                  const peersArray = Object.keys(peers).map(
                    (_peerId) => peers[_peerId]
                  )
                  const sendingPeer = peersArray.find((peer) =>
                    peer.dataConsumers.includes(dataConsumer.id)
                  )

                  if (!sendingPeer) {
                    console.warn('DataConsumer "message" from unknown peer')

                    break
                  }

                  this.store.dispatch('zeyeClient/notify', {
                    title: `${sendingPeer.displayName} says:`,
                    text: message,
                    timeout: 5000
                  })

                  break
                }

                case 'bot': {
                  this.store.dispatch('zeyeClient/notify', {
                    title: 'Message from Bot:',
                    text: message,
                    timeout: 5000
                  })
                  break
                }
              }
            })

            // TODO: REMOVE
            window.DC = dataConsumer

            this.store.commit('zeyeClient/dataConsumers/addDataConsumer', {
              dataConsumer: {
                id: dataConsumer.id,
                sctpStreamParameters: dataConsumer.sctpStreamParameters,
                label: dataConsumer.label,
                protocol: dataConsumer.protocol
              }
            })

            this.store.commit('zeyeClient/peers/addDataConsumer', {
              dataConsumer: {
                id: dataConsumer.id
              }
            })

            // We are ready. Answer the protoo request.
            accept()
          } catch (error) {
            console.error('"newDataConsumer" request failed:%o', error)

            this.store.dispatch('zeyeClient/notify', {
              type: 'error',
              text: `Error creating a DataConsumer: ${error}`
            })

            throw error
          }

          break
        }
      }
    })

    this._protoo.on('notification', (notification) => {
      console.debug(
        'proto "notification" event [method:%s, data:%o]',
        notification.method,
        notification.data
      )

      switch (notification.method) {
        case 'chatMessage': {
          this.store.commit('zeyeClient/chat/pushMessage', {
            message: notification.data
          })
          break
        }

        case 'producerScore': {
          const { producerId, score } = notification.data

          this.store.commit('zeyeClient/producers/setProducerScore', {
            producerId,
            score
          })

          break
        }

        case 'newPeer': {
          const peer = notification.data

          this.store.commit('zeyeClient/peers/addPeer', {
            peer: {
              ...peer,
              consumers: [],
              dataConsumers: []
            }
          })

          this.store.dispatch('zeyeClient/notify', {
            text: `${peer.displayName} has joined the room`
          })

          break
        }

        case 'peerClosed': {
          const { peerId } = notification.data

          this.store.commit('zeyeClient/peers/removePeer', {
            peerId
          })

          break
        }

        case 'peerDisplayNameChanged': {
          const { peerId, displayName, oldDisplayName } = notification.data

          this.store.commit('zeyeClient/peers/setPeerDisplayName', {
            displayName,
            peerId
          })

          this.store.dispatch('zeyeClient/notify', {
            text: `${oldDisplayName} is now ${displayName}`
          })

          break
        }

        case 'consumerClosed': {
          const { consumerId } = notification.data
          const consumer = this._consumers.get(consumerId)

          if (!consumer) break

          consumer.close()
          this._consumers.delete(consumerId)

          const { peerId } = consumer.appData

          // TODO: probably move peer removers\adders into consumer removers\adders
          this.store.commit('zeyeClient/peers/removeConsumer', {
            consumerId,
            peerId
          })

          this.store.commit('zeyeClient/consumers/removeConsumer', {
            consumerId,
            peerId
          })

          break
        }

        case 'consumerPaused': {
          const { consumerId } = notification.data
          const consumer = this._consumers.get(consumerId)

          if (!consumer) break

          this.store.commit('zeyeClient/consumers/setConsumerPaused', {
            consumerId,
            originator: 'remote'
          })

          break
        }

        case 'consumerResumed': {
          const { consumerId } = notification.data
          const consumer = this._consumers.get(consumerId)

          if (!consumer) break

          this.store.commit('zeyeClient/consumers/setConsumerResumed', {
            consumerId,
            originator: 'remote'
          })

          break
        }

        case 'consumerLayersChanged': {
          const { consumerId, spatialLayer, temporalLayer } = notification.data
          const consumer = this._consumers.get(consumerId)

          if (!consumer) break

          this.store.commit('zeyeClient/consumers/setConsumerCurrentLayers', {
            consumerId,
            spatialLayer,
            temporalLayer
          })

          break
        }

        case 'consumerScore': {
          const { consumerId, score } = notification.data

          this.store.commit('zeyeClient/consumers/setConsumerScore', {
            consumerId,
            score
          })

          break
        }

        case 'dataConsumerClosed': {
          const { dataConsumerId } = notification.data
          const dataConsumer = this._dataConsumers.get(dataConsumerId)

          if (!dataConsumer) break

          dataConsumer.close()
          this._dataConsumers.delete(dataConsumerId)

          const { peerId } = dataConsumer.appData

          this.store.commit('zeyeClient/dataConsumers/removeDataConsumer', {
            dataConsumerId,
            peerId
          })

          break
        }

        case 'activeSpeaker': {
          const { peerId } = notification.data

          this.store.commit('zeyeClient/room/setRoomActiveSpeaker', {
            peerId
          })

          break
        }

        default: {
          console.error(
            'unknown protoo notification.method "%s"',
            notification.method
          )
        }
      }
    })

    this.ready = true
  }

  async enableMic() {
    console.debug('enableMic()')

    if (this._micProducer) return

    if (!this._mediasoupDevice.canProduce('audio')) {
      console.error('enableMic() | cannot produce audio')

      return
    }

    let track

    try {
      if (!this._externalVideo) {
        console.debug('enableMic() | calling getUserMedia()')

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })

        track = stream.getAudioTracks()[0]
      } else {
        const stream = await this._getExternalVideoStream()

        track = stream.getAudioTracks()[0].clone()
      }

      this._micProducer = await this._sendTransport.produce({
        track,
        codecOptions: {
          opusStereo: 1,
          opusDtx: 1
        }
        // NOTE: for testing codec selection.
        // codec : this._mediasoupDevice.rtpCapabilities.codecs
        // 	.find((codec) => codec.mimeType.toLowerCase() === 'audio/pcma')
      })

      this.store.commit('zeyeClient/producers/addProducer', {
        producer: {
          id: this._micProducer.id,
          paused: this._micProducer.paused,
          track: this._micProducer.track,
          rtpParameters: this._micProducer.rtpParameters,
          codec: this._micProducer.rtpParameters.codecs[0].mimeType.split(
            '/'
          )[1]
        }
      })

      this._micProducer.on('transportclose', () => {
        this._micProducer = null
      })

      this._micProducer.on('trackended', () => {
        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: 'Microphone disconnected!'
        })

        this.disableMic().catch(() => {})
      })
    } catch (error) {
      console.error('enableMic() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error enabling microphone: ${error}`
      })

      if (track) track.stop()
    }
  }

  async disableMic() {
    console.debug('disableMic()')

    if (!this._micProducer) return

    this._micProducer.close()

    this.store.commit('zeyeClient/producers/removeProducer', {
      producerId: this._micProducer.id
    })

    try {
      await this._protoo.request('closeProducer', {
        producerId: this._micProducer.id
      })
    } catch (error) {
      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error closing server-side mic Producer: ${error}`
      })
    }

    this._micProducer = null
  }

  async muteMic() {
    console.debug('muteMic()')

    this._micProducer.pause()

    try {
      await this._protoo.request('pauseProducer', {
        producerId: this._micProducer.id
      })

      this.store.commit('zeyeClient/producers/setProducerPaused', {
        producerId: this._micProducer.id
      })
    } catch (error) {
      console.error('muteMic() | failed: %o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error pausing server-side mic Producer: ${error}`
      })
    }
  }

  async unmuteMic() {
    console.debug('unmuteMic()')

    this._micProducer.resume()

    try {
      await this._protoo.request('resumeProducer', {
        producerId: this._micProducer.id
      })

      this.store.commit('zeyeClient/producers/setProducerResumed', {
        producerId: this._micProducer.id
      })
    } catch (error) {
      console.error('unmuteMic() | failed: %o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error resuming server-side mic Producer: ${error}`
      })
    }
  }

  async enableWebcam() {
    console.debug('enableWebcam()')

    if (this._webcamProducer) return
    else if (this._shareProducer) await this.disableShare()

    if (!this._mediasoupDevice.canProduce('video')) {
      console.error('enableWebcam() | cannot produce video')

      return
    }

    let track
    let device

    this.store.commit('zeyeClient/me/setWebcamInProgress', {
      flag: true
    })

    try {
      if (!this._externalVideo) {
        await this._updateWebcams()
        device = this._webcam.device

        const { resolution } = this._webcam

        if (!device) throw new Error('no webcam devices')

        console.debug('enableWebcam() | calling getUserMedia()')

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { ideal: device.deviceId },
            ...VIDEO_CONSTRAINS[resolution]
          }
        })

        track = stream.getVideoTracks()[0]
      } else {
        device = { label: 'external video' }

        const stream = await this._getExternalVideoStream()

        track = stream.getVideoTracks()[0].clone()
      }

      let encodings
      let codec
      const codecOptions = {
        videoGoogleStartBitrate: 1000
      }

      if (this._forceH264) {
        codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.mimeType.toLowerCase() === 'video/h264'
        )

        if (!codec) {
          throw new Error('desired H264 codec+configuration is not supported')
        }
      } else if (this._forceVP9) {
        codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.mimeType.toLowerCase() === 'video/vp9'
        )

        if (!codec) {
          throw new Error('desired VP9 codec+configuration is not supported')
        }
      }

      if (this._useSimulcast) {
        // If VP9 is the only available video codec then use SVC.
        const firstVideoCodec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.kind === 'video'
        )
        if (
          (this._forceVP9 && codec) ||
          firstVideoCodec.mimeType.toLowerCase() === 'video/vp9'
        ) {
          encodings = VIDEO_KSVC_ENCODINGS
        } else {
          encodings = VIDEO_SIMULCAST_ENCODINGS
        }
      }

      this._webcamProducer = await this._sendTransport.produce({
        track,
        encodings,
        codecOptions,
        codec
      })

      this.store.commit('zeyeClient/producers/addProducer', {
        producer: {
          id: this._webcamProducer.id,
          deviceLabel: device.label,
          type: this._getWebcamType(device),
          paused: this._webcamProducer.paused,
          track: this._webcamProducer.track,
          rtpParameters: this._webcamProducer.rtpParameters,
          codec: this._webcamProducer.rtpParameters.codecs[0].mimeType.split(
            '/'
          )[1]
        }
      })

      this._webcamProducer.on('transportclose', () => {
        this._webcamProducer = null
      })

      this._webcamProducer.on('trackended', () => {
        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: 'Webcam disconnected!'
        })

        this.disableWebcam().catch(() => {})
      })
    } catch (error) {
      console.error('enableWebcam() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error enabling webcam: ${error}`
      })

      if (track) track.stop()
    }

    this.store.commit('zeyeClient/me/setWebcamInProgress', {
      flag: false
    })
  }

  async disableWebcam() {
    console.debug('disableWebcam()')

    if (!this._webcamProducer) return

    this._webcamProducer.close()
    this.store.commit('zeyeClient/producers/removeProducer', {
      producerId: this._webcamProducer.id
    })

    try {
      await this._protoo.request('closeProducer', {
        producerId: this._webcamProducer.id
      })
    } catch (error) {
      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error closing server-side webcam Producer: ${error}`
      })
    }

    this._webcamProducer = null
  }

  async changeWebcam() {
    console.debug('changeWebcam()')

    this.store.commit('zeyeClient/me/setWebcamInProgress', {
      flag: true
    })

    try {
      await this._updateWebcams()

      const array = Array.from(this._webcams.keys())
      const len = array.length
      const deviceId = this._webcam.device
        ? this._webcam.device.deviceId
        : undefined
      let idx = array.indexOf(deviceId)

      if (idx < len - 1) idx++
      else idx = 0

      this._webcam.device = this._webcams.get(array[idx])

      console.debug(
        'changeWebcam() | new selected webcam [device:%o]',
        this._webcam.device
      )

      // Reset video resolution to HD.
      this._webcam.resolution = 'hd'

      if (!this._webcam.device) throw new Error('no webcam devices')

      // Closing the current video track before asking for a new one (mobiles do not like
      // having both front/back cameras open at the same time).
      this._webcamProducer.track.stop()

      console.debug('changeWebcam() | calling getUserMedia()')

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: this._webcam.device.deviceId },
          ...VIDEO_CONSTRAINS[this._webcam.resolution]
        }
      })

      const track = stream.getVideoTracks()[0]

      await this._webcamProducer.replaceTrack({ track })

      this.store.commit('zeyeClient/producers/setProducerTrack', {
        producerId: this._webcamProducer.id,
        track
      })
    } catch (error) {
      console.error('changeWebcam() | failed: %o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Could not change webcam: ${error}`
      })
    }

    this.store.commit('zeyeClient/me/setWebcamInProgress', {
      flag: false
    })

    this.$bus.$emit('update-my-media')
  }

  async changeWebcamResolution() {
    console.debug('changeWebcamResolution()')

    this.store.commit('zeyeClient/me/setWebcamInProgress', {
      flag: true
    })

    try {
      switch (this._webcam.resolution) {
        case 'qvga':
          this._webcam.resolution = 'vga'
          break
        case 'vga':
          this._webcam.resolution = 'hd'
          break
        case 'hd':
          this._webcam.resolution = 'qvga'
          break
        default:
          this._webcam.resolution = 'hd'
      }

      console.debug('changeWebcamResolution() | calling getUserMedia()')

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: this._webcam.device.deviceId },
          ...VIDEO_CONSTRAINS[this._webcam.resolution]
        }
      })

      const track = stream.getVideoTracks()[0]

      await this._webcamProducer.replaceTrack({ track })

      this.store.commit('zeyeClient/producers/setProducerTrack', {
        producerId: this._webcamProducer.id,
        track
      })
    } catch (error) {
      console.error('changeWebcamResolution() | failed: %o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Could not change webcam resolution: ${error}`
      })
    }

    this.store.commit('zeyeClient/me/setWebcamInProgress', {
      flag: false
    })
  }

  async enableShare() {
    console.debug('enableShare()')

    let result = true

    if (this._shareProducer) return false
    else if (this._webcamProducer) await this.disableWebcam()

    if (!this._mediasoupDevice.canProduce('video')) {
      console.error('enableShare() | cannot produce video')

      return false
    }

    let track

    this.store.commit('zeyeClient/me/setShareInProgress', {
      flag: true
    })

    try {
      console.debug('enableShare() | calling getUserMedia()')

      const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: false,
        video: {
          displaySurface: 'monitor',
          logicalSurface: true,
          cursor: true,
          width: { max: 1920 },
          height: { max: 1080 },
          frameRate: { max: 30 }
        }
      })

      // May mean cancelled (in some implementations).
      if (!stream) {
        this.store.commit('zeyeClient/me/setShareInProgress', {
          flag: false
        })

        return false
      }

      track = stream.getVideoTracks()[0]
      let encodings
      let codec
      const codecOptions = {
        videoGoogleStartBitrate: 1000
      }

      if (this._forceH264) {
        codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.mimeType.toLowerCase() === 'video/h264'
        )

        if (!codec) {
          throw new Error('desired H264 codec+configuration is not supported')
        }
      } else if (this._forceVP9) {
        codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.mimeType.toLowerCase() === 'video/vp9'
        )

        if (!codec) {
          throw new Error('desired VP9 codec+configuration is not supported')
        }
      }

      if (this._useSharingSimulcast) {
        // If VP9 is the only available video codec then use SVC.
        const firstVideoCodec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.kind === 'video'
        )

        if (
          (this._forceVP9 && codec) ||
          firstVideoCodec.mimeType.toLowerCase() === 'video/vp9'
        ) {
          encodings = VIDEO_SVC_ENCODINGS
        } else {
          encodings = VIDEO_SIMULCAST_ENCODINGS.map((encoding) => ({
            ...encoding,
            dtx: true
          }))
        }
      }

      this._shareProducer = await this._sendTransport.produce({
        track,
        encodings,
        codecOptions,
        codec,
        appData: { share: true }
      })

      this.store.commit('zeyeClient/producers/addProducer', {
        producer: {
          id: this._shareProducer.id,
          type: 'share',
          paused: this._shareProducer.paused,
          track: this._shareProducer.track,
          rtpParameters: this._shareProducer.rtpParameters,
          codec: this._shareProducer.rtpParameters.codecs[0].mimeType.split(
            '/'
          )[1]
        }
      })

      this._shareProducer.on('transportclose', () => {
        this._shareProducer = null
      })

      this._shareProducer.on('trackended', () => {
        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: 'Share disconnected!'
        })

        this.disableShare().catch(() => {})
      })
    } catch (error) {
      console.error('enableShare() | failed:%o', error)

      if (error.name !== 'NotAllowedError') {
        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: `Error sharing: ${error}`
        })
      }

      if (track) track.stop()

      result = false
    }

    this.store.commit('zeyeClient/me/setShareInProgress', {
      flag: false
    })

    return result
  }

  async disableShare() {
    console.debug('disableShare()')

    if (!this._shareProducer) return

    this._shareProducer.close()

    this.store.commit('zeyeClient/producers/removeProducer', {
      producerId: this._shareProducer.id
    })

    try {
      await this._protoo.request('closeProducer', {
        producerId: this._shareProducer.id
      })
    } catch (error) {
      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error closing server-side share Producer: ${error}`
      })
    }

    this._shareProducer = null
  }

  enableAudioOnly() {
    console.debug('enableAudioOnly()')

    this.store.commit('zeyeClient/me/setAudioOnlyInProgress', {
      flag: true
    })

    this.disableWebcam()

    for (const consumer of this._consumers.values()) {
      if (consumer.kind !== 'video') continue

      this._pauseConsumer(consumer)
    }

    this.store.commit('zeyeClient/me/setAudioOnlyState', {
      enabled: true
    })

    this.store.commit('zeyeClient/me/setAudioOnlyInProgress', {
      flag: false
    })
  }

  disableAudioOnly() {
    console.debug('disableAudioOnly()')

    this.store.commit('zeyeClient/me/setAudioOnlyInProgress', {
      flag: true
    })

    if (
      !this._webcamProducer &&
      this._produce &&
      (cookiesManager.getDevices() || {}).webcamEnabled
    ) {
      this.enableWebcam()
    }

    for (const consumer of this._consumers.values()) {
      if (consumer.kind !== 'video') continue

      this._resumeConsumer(consumer)
    }

    this.store.commit('zeyeClient/me/setAudioOnlyState', {
      enabled: false
    })

    this.store.commit('zeyeClient/me/setAudioOnlyInProgress', {
      flag: false
    })
  }

  muteAudio() {
    console.debug('muteAudio()')

    this.store.commit('zeyeClient/me/setAudioMutedState', {
      flag: true
    })
  }

  unmuteAudio() {
    console.debug('unmuteAudio()')

    this.store.commit('zeyeClient/me/setAudioMutedState', {
      flag: false
    })
  }

  async restartIce() {
    console.debug('restartIce()')

    this.store.commit('zeyeClient/me/setRestartIceInProgress', {
      flag: true
    })

    try {
      if (this._sendTransport) {
        const iceParameters = await this._protoo.request('restartIce', {
          transportId: this._sendTransport.id
        })

        await this._sendTransport.restartIce({ iceParameters })
      }

      if (this._recvTransport) {
        const iceParameters = await this._protoo.request('restartIce', {
          transportId: this._recvTransport.id
        })

        await this._recvTransport.restartIce({ iceParameters })
      }
      this.store.dispatch('zeyeClient/notify', {
        text: 'ICE restarted'
      })
    } catch (error) {
      console.error('restartIce() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `ICE restart failed: ${error}`
      })
    }

    this.store.commit('zeyeClient/me/setRestartIceInProgress', {
      flag: false
    })
  }

  async setMaxSendingSpatialLayer(spatialLayer) {
    console.debug('setMaxSendingSpatialLayer() [spatialLayer:%s]', spatialLayer)

    try {
      if (this._webcamProducer)
        await this._webcamProducer.setMaxSpatialLayer(spatialLayer)
      else if (this._shareProducer)
        await this._shareProducer.setMaxSpatialLayer(spatialLayer)
    } catch (error) {
      console.error('setMaxSendingSpatialLayer() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error setting max sending video spatial layer: ${error}`
      })
    }
  }

  async setConsumerPreferredLayers(consumerId, spatialLayer, temporalLayer) {
    console.debug(
      'setConsumerPreferredLayers() [consumerId:%s, spatialLayer:%s, temporalLayer:%s]',
      consumerId,
      spatialLayer,
      temporalLayer
    )

    try {
      await this._protoo.request('setConsumerPreferredLayers', {
        consumerId,
        spatialLayer,
        temporalLayer
      })

      this.store.commit('zeyeClient/consumers/setConsumerPreferredLayers', {
        consumerId,
        spatialLayer,
        temporalLayer
      })
    } catch (error) {
      console.error('setConsumerPreferredLayers() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error setting Consumer preferred layers: ${error}`
      })
    }
  }

  async setConsumerPriority(consumerId, priority) {
    console.debug(
      'setConsumerPriority() [consumerId:%s, priority:%d]',
      consumerId,
      priority
    )

    try {
      await this._protoo.request('setConsumerPriority', {
        consumerId,
        priority
      })

      this.store.commit('zeyeClient/consumers/setConsumerPriority', {
        consumerId,
        priority
      })
    } catch (error) {
      console.error('setConsumerPriority() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error setting Consumer priority: ${error}`
      })
    }
  }

  async requestConsumerKeyFrame(consumerId) {
    console.debug('requestConsumerKeyFrame() [consumerId:%s]', consumerId)

    try {
      await this._protoo.request('requestConsumerKeyFrame', { consumerId })

      this.store.dispatch('zeyeClient/notify', {
        text: 'Keyframe requested for video consumer'
      })
    } catch (error) {
      console.error('requestConsumerKeyFrame() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error requesting key frame for Consumer: ${error}`
      })
    }
  }

  async enableChatDataProducer() {
    console.debug('enableChatDataProducer()')

    if (!this._useDataChannel) return

    // NOTE: Should enable this code but it's useful for testing.
    // if (this._chatDataProducer)
    // 	return;

    try {
      // Create chat DataProducer.
      this._chatDataProducer = await this._sendTransport.produceData({
        ordered: false,
        maxRetransmits: 1,
        label: 'chat',
        priority: 'medium',
        appData: { info: 'my-chat-DataProducer' }
      })

      this.store.commit('zeyeClient/dataProducers/addDataProducer', {
        dataProducer: {
          id: this._chatDataProducer.id,
          sctpStreamParameters: this._chatDataProducer.sctpStreamParameters,
          label: this._chatDataProducer.label,
          protocol: this._chatDataProducer.protocol
        }
      })

      this._chatDataProducer.on('transportclose', () => {
        this._chatDataProducer = null
      })

      this._chatDataProducer.on('open', () => {
        console.debug('chat DataProducer "open" event')
      })

      this._chatDataProducer.on('close', () => {
        console.error('chat DataProducer "close" event')

        this._chatDataProducer = null

        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: 'Chat DataProducer closed'
        })
      })

      this._chatDataProducer.on('error', (error) => {
        console.error('chat DataProducer "error" event:%o', error)

        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: `Chat DataProducer error: ${error}`
        })
      })

      this._chatDataProducer.on('bufferedamountlow', () => {
        console.debug('chat DataProducer "bufferedamountlow" event')
      })
    } catch (error) {
      console.error('enableChatDataProducer() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error enabling chat DataProducer: ${error}`
      })

      throw error
    }
  }

  async enableBotDataProducer() {
    console.debug('enableBotDataProducer()')

    if (!this._useDataChannel) return

    // NOTE: Should enable this code but it's useful for testing.
    // if (this._botDataProducer)
    // 	return;

    try {
      // Create chat DataProducer.
      this._botDataProducer = await this._sendTransport.produceData({
        ordered: false,
        maxPacketLifeTime: 2000,
        label: 'bot',
        priority: 'medium',
        appData: { info: 'my-bot-DataProducer' }
      })

      this.store.commit('zeyeClient/dataProducers/addDataProducer', {
        dataProducer: {
          id: this._botDataProducer.id,
          sctpStreamParameters: this._botDataProducer.sctpStreamParameters,
          label: this._botDataProducer.label,
          protocol: this._botDataProducer.protocol
        }
      })

      this._botDataProducer.on('transportclose', () => {
        this._botDataProducer = null
      })

      this._botDataProducer.on('open', () => {
        console.debug('bot DataProducer "open" event')
      })

      this._botDataProducer.on('close', () => {
        console.error('bot DataProducer "close" event')

        this._botDataProducer = null

        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: 'Bot DataProducer closed'
        })
      })

      this._botDataProducer.on('error', (error) => {
        console.error('bot DataProducer "error" event:%o', error)

        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: `Bot DataProducer error: ${error}`
        })
      })

      this._botDataProducer.on('bufferedamountlow', () => {
        console.debug('bot DataProducer "bufferedamountlow" event')
      })
    } catch (error) {
      console.error('enableBotDataProducer() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error enabling bot DataProducer: ${error}`
      })

      throw error
    }
  }

  sendChatMessage(text) {
    console.debug('sendChatMessage() [text:"%s]', text)

    this._protoo.request('chatMessage', {
      id: randomString(10),
      timestamp: new Date().getTime(),
      author: this.store.state.zeyeClient.me.displayName,
      text
    })
  }

  async changeDisplayName(displayName) {
    console.debug('changeDisplayName() [displayName:"%s"]', displayName)

    // Store in cookie.
    cookiesManager.setUser({ displayName })

    try {
      await this._protoo.request('changeDisplayName', { displayName })

      this._displayName = displayName

      this.store.commit('zeyeClient/me/setDisplayName', {
        displayName
      })

      this.store.dispatch('zeyeClient/notify', {
        text: 'Display name changed'
      })
    } catch (error) {
      console.error('changeDisplayName() | failed: %o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Could not change display name: ${error}`
      })

      // We need to refresh the component for it to render the previous
      // displayName again.

      this.store.commit('zeyeClient/me/setDisplayName', { displayName: false })
    }
  }

  getSendTransportRemoteStats() {
    console.debug('getSendTransportRemoteStats()')

    if (!this._sendTransport) return

    return this._protoo.request('getTransportStats', {
      transportId: this._sendTransport.id
    })
  }

  getRecvTransportRemoteStats() {
    console.debug('getRecvTransportRemoteStats()')

    if (!this._recvTransport) return

    return this._protoo.request('getTransportStats', {
      transportId: this._recvTransport.id
    })
  }

  getAudioRemoteStats() {
    console.debug('getAudioRemoteStats()')

    if (!this._micProducer) return

    return this._protoo.request('getProducerStats', {
      producerId: this._micProducer.id
    })
  }

  getVideoRemoteStats() {
    console.debug('getVideoRemoteStats()')

    const producer = this._webcamProducer || this._shareProducer

    if (!producer) return

    return this._protoo.request('getProducerStats', {
      producerId: producer.id
    })
  }

  getConsumerRemoteStats(consumerId) {
    console.debug('getConsumerRemoteStats()')

    const consumer = this._consumers.get(consumerId)

    if (!consumer) return

    return this._protoo.request('getConsumerStats', { consumerId })
  }

  getChatDataProducerRemoteStats() {
    console.debug('getChatDataProducerRemoteStats()')

    const dataProducer = this._chatDataProducer

    if (!dataProducer) return

    return this._protoo.request('getDataProducerStats', {
      dataProducerId: dataProducer.id
    })
  }

  getBotDataProducerRemoteStats() {
    console.debug('getBotDataProducerRemoteStats()')

    const dataProducer = this._botDataProducer

    if (!dataProducer) return

    return this._protoo.request('getDataProducerStats', {
      dataProducerId: dataProducer.id
    })
  }

  getDataConsumerRemoteStats(dataConsumerId) {
    console.debug('getDataConsumerRemoteStats()')

    const dataConsumer = this._dataConsumers.get(dataConsumerId)

    if (!dataConsumer) return

    return this._protoo.request('getDataConsumerStats', { dataConsumerId })
  }

  getSendTransportLocalStats() {
    console.debug('getSendTransportLocalStats()')

    if (!this._sendTransport) return

    return this._sendTransport.getStats()
  }

  getRecvTransportLocalStats() {
    console.debug('getRecvTransportLocalStats()')

    if (!this._recvTransport) return

    return this._recvTransport.getStats()
  }

  getAudioLocalStats() {
    console.debug('getAudioLocalStats()')

    if (!this._micProducer) return

    return this._micProducer.getStats()
  }

  getVideoLocalStats() {
    console.debug('getVideoLocalStats()')

    const producer = this._webcamProducer || this._shareProducer

    if (!producer) return

    return producer.getStats()
  }

  getConsumerLocalStats(consumerId) {
    const consumer = this._consumers.get(consumerId)

    if (!consumer) return

    return consumer.getStats()
  }

  async applyNetworkThrottle({ uplink, downlink, rtt, secret }) {
    console.debug(
      'applyNetworkThrottle() [uplink:%s, downlink:%s, rtt:%s]',
      uplink,
      downlink,
      rtt
    )

    try {
      await this._protoo.request('applyNetworkThrottle', {
        uplink,
        downlink,
        rtt,
        secret
      })
    } catch (error) {
      console.error('applyNetworkThrottle() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error applying network throttle: ${error}`
      })
    }
  }

  async resetNetworkThrottle({ silent = false, secret }) {
    console.debug('resetNetworkThrottle()')

    try {
      await this._protoo.request('resetNetworkThrottle', { secret })
    } catch (error) {
      if (!silent) {
        console.error('resetNetworkThrottle() | failed:%o', error)

        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: `Error resetting network throttle: ${error}`
        })
      }
    }
  }

  async _joinRoom() {
    console.debug('_joinRoom()')

    try {
      this._mediasoupDevice = new mediasoupClient.Device({
        handlerName: this._handlerName
      })

      const routerRtpCapabilities = await this._protoo.request(
        'getRouterRtpCapabilities'
      )

      await this._mediasoupDevice.load({ routerRtpCapabilities })

      // NOTE: Stuff to play remote audios due to browsers' new autoplay policy.
      //
      // Just get access to the mic and DO NOT close the mic track for a while.
      // Super hack!
      {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true
        })
        const audioTrack = stream.getAudioTracks()[0]

        audioTrack.enabled = false

        setTimeout(() => audioTrack.stop(), 120000)
      }

      // Create mediasoup Transport for sending (unless we don't want to produce).
      if (this._produce) {
        const transportInfo = await this._protoo.request(
          'createWebRtcTransport',
          {
            forceTcp: this._forceTcp,
            producing: true,
            consuming: false,
            sctpCapabilities: this._useDataChannel
              ? this._mediasoupDevice.sctpCapabilities
              : undefined
          }
        )

        const {
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
          sctpParameters
        } = transportInfo

        this._sendTransport = this._mediasoupDevice.createSendTransport({
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
          sctpParameters,
          iceServers: [],
          proprietaryConstraints: PC_PROPRIETARY_CONSTRAINTS
        })

        this._sendTransport.on(
          'connect',
          (
            { dtlsParameters },
            callback,
            errback // eslint-disable-line no-shadow
          ) => {
            this._protoo
              .request('connectWebRtcTransport', {
                transportId: this._sendTransport.id,
                dtlsParameters
              })
              .then(callback)
              .catch(errback)
          }
        )

        this._sendTransport.on(
          'produce',
          async ({ kind, rtpParameters, appData }, callbackfunc, errback) => {
            try {
              // eslint-disable-next-line no-shadow
              const { id } = await this._protoo.request('produce', {
                transportId: this._sendTransport.id,
                kind,
                rtpParameters,
                appData
              })

              callbackfunc({ id })
            } catch (error) {
              errback(error)
            }
          }
        )

        this._sendTransport.on(
          'producedata',
          async (
            { sctpStreamParameters, label, protocol, appData },
            callbackfunc,
            errback
          ) => {
            console.debug(
              '"producedata" event: [sctpStreamParameters:%o, appData:%o]',
              sctpStreamParameters,
              appData
            )

            try {
              // eslint-disable-next-line no-shadow
              const { id } = await this._protoo.request('produceData', {
                transportId: this._sendTransport.id,
                sctpStreamParameters,
                label,
                protocol,
                appData
              })

              callbackfunc({ id })
            } catch (error) {
              errback(error)
            }
          }
        )
      }

      // Create mediasoup Transport for sending (unless we don't want to consume).
      if (this._consume) {
        const transportInfo = await this._protoo.request(
          'createWebRtcTransport',
          {
            forceTcp: this._forceTcp,
            producing: false,
            consuming: true,
            sctpCapabilities: this._useDataChannel
              ? this._mediasoupDevice.sctpCapabilities
              : undefined
          }
        )

        const {
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
          sctpParameters
        } = transportInfo

        this._recvTransport = this._mediasoupDevice.createRecvTransport({
          id,
          iceParameters,
          iceCandidates,
          dtlsParameters,
          sctpParameters,
          iceServers: []
        })

        this._recvTransport.on(
          'connect',
          (
            { dtlsParameters },
            callback,
            errback // eslint-disable-line no-shadow
          ) => {
            this._protoo
              .request('connectWebRtcTransport', {
                transportId: this._recvTransport.id,
                dtlsParameters
              })
              .then(callback)
              .catch(errback)
          }
        )
      }

      // Join now into the room.
      // NOTE: Don't send our RTP capabilities if we don't want to consume.
      const { peers } = await this._protoo.request('join', {
        displayName: this._displayName,
        device: this._device,
        rtpCapabilities: this._consume
          ? this._mediasoupDevice.rtpCapabilities
          : undefined,
        sctpCapabilities:
          this._useDataChannel && this._consume
            ? this._mediasoupDevice.sctpCapabilities
            : undefined
      })

      this.store.commit('zeyeClient/room/setRoomState', {
        state: 'connected'
      })

      // Clean all the existing notifcations.
      this.store.commit('zeyeClient/notifications/removeAllNotifications')

      this.store.dispatch('zeyeClient/notify', {
        text: 'You are in the room!',
        timeout: 3000
      })

      for (const peer of peers) {
        this.store.commit('zeyeClient/peers/addPeer', {
          peer: { ...peer, consumers: [], dataConsumers: [] }
        })
      }

      // Enable mic/webcam.
      if (this._produce) {
        // Set our media capabilities.

        this.store.commit('zeyeClient/me/setMediaCapabilities', {
          canSendMic: this._mediasoupDevice.canProduce('audio'),
          canSendWebcam: this._mediasoupDevice.canProduce('video')
        })

        this.enableMic()

        const devicesCookie = cookiesManager.getDevices()

        if (
          !devicesCookie ||
          devicesCookie.webcamEnabled ||
          this._externalVideo
        )
          this.enableWebcam()

        this._sendTransport.on('connectionstatechange', (connectionState) => {
          if (connectionState === 'connected') {
            // this.enableChatDataProducer()
            // this.enableBotDataProducer()
          }
        })
      }

      // NOTE: For testing.
      if (window.SHOW_INFO) {
        const { me } = this.store.state

        this.store.commit('zeyeClient/room/setRoomStatsPeerId', {
          peerId: me.id
        })
      }
    } catch (error) {
      console.error('_joinRoom() failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Could not join the room: ${error}`
      })

      this.close()
    }
  }

  async _updateWebcams() {
    console.debug('_updateWebcams()')

    // Reset the list.
    this._webcams = new Map()

    console.debug('_updateWebcams() | calling enumerateDevices()')

    const devices = await navigator.mediaDevices.enumerateDevices()

    for (const device of devices) {
      if (device.kind === 'audiooutput') {
        this._outputDevices.push(device)
      }

      if (device.kind === 'videoinput') {
        this._webcams.set(device.deviceId, device)
      }
    }

    this.store.commit('zeyeClient/me/setCurrentAudioOutputDevice', {
      currentAudioOutputDevice: this._outputDevices[0]
    })

    const array = Array.from(this._webcams.values())
    const len = array.length
    const currentWebcamId = this._webcam.device
      ? this._webcam.device.deviceId
      : undefined

    console.debug('_updateWebcams() [webcams:%o]', array)

    if (len === 0) this._webcam.device = null
    else if (!this._webcams.has(currentWebcamId)) this._webcam.device = array[0]

    this.store.commit('zeyeClient/me/setCanChangeWebcam', {
      flag: this._webcams.size > 1
    })
  }

  _getWebcamType(device) {
    if (/(back|rear)/i.test(device.label)) {
      console.debug('_getWebcamType() | it seems to be a back camera')

      return 'back'
    } else {
      console.debug('_getWebcamType() | it seems to be a front camera')

      return 'front'
    }
  }

  async _pauseConsumer(consumer) {
    if (consumer.paused) return

    try {
      await this._protoo.request('pauseConsumer', { consumerId: consumer.id })

      consumer.pause()

      this.store.commit('zeyeClient/consumers/setConsumerPaused', {
        consumerId: consumer.id,
        originator: 'local'
      })
    } catch (error) {
      console.error('_pauseConsumer() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error pausing Consumer: ${error}`
      })
    }
  }

  async _resumeConsumer(consumer) {
    if (!consumer.paused) return

    try {
      await this._protoo.request('resumeConsumer', { consumerId: consumer.id })

      consumer.resume()

      this.store.commit('zeyeClient/consumers/setConsumerResumed', {
        consumerId: consumer.id,
        originator: 'local'
      })
    } catch (error) {
      console.error('_resumeConsumer() | failed:%o', error)

      this.store.dispatch('zeyeClient/notify', {
        type: 'error',
        text: `Error resuming Consumer: ${error}`
      })
    }
  }

  async _getExternalVideoStream() {
    if (this._externalVideoStream) return this._externalVideoStream

    if (this._externalVideo.readyState < 3) {
      await new Promise((resolve) =>
        this._externalVideo.addEventListener('canplay', resolve)
      )
    }

    if (this._externalVideo.captureStream)
      this._externalVideoStream = this._externalVideo.captureStream()
    else if (this._externalVideo.mozCaptureStream)
      this._externalVideoStream = this._externalVideo.mozCaptureStream()
    else throw new Error('video.captureStream() not supported')

    return this._externalVideoStream
  }
}
