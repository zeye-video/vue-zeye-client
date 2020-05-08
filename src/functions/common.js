export default function registerFunctions({ app, store }) {
  /**
   * @method
   * @name isConnected
   * @returns {string}
   */
  app.$zeyeClient.isConnected = () =>
    store.state.zeyeClient.room.state === 'connected'

  /**
   * @method
   * @name getGlobalAudioMuted
   * @returns {string}
   */
  app.$zeyeClient.getGlobalAudioMuted = () =>
    store.state.zeyeClient.me.audioMuted

  /**
   * @method
   * @name getGlobalVideoMuted
   * @returns {string}
   */
  app.$zeyeClient.getVideoVisible = (peerId) =>
    Boolean(app.$zeyeClient.getVideoConsumer(peerId)) &&
    !app.$zeyeClient.getVideoConsumer(peerId).locallyPaused &&
    !app.$zeyeClient.getVideoConsumer(peerId).remotelyPaused
}
