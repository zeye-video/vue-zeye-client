export default function registerFunctions({ app, store }) {
  /**
   * @method
   * @name getPeers
   * @returns {Array}
   */
  app.$zeyeClient.getPeers = () => store.state.zeyeClient.peers.peers;

  /**
   * @method
   * @name getPeers
   * @param peerId
   * @returns {Array}
   */
  app.$zeyeClient.getPeer = peerId =>
    store.state.zeyeClient.peers.peers.find(peer => peer.id === peerId);
}
