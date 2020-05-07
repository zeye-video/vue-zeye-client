export default function registerFunctions({ app, store }) {
  /**
   * @method
   * @name getConsumers
   * @returns {Array}
   */
  app.$zeyeClient.getConsumers = () =>
    store.state.zeyeClient.consumers.consumers;

  /**
   * @method
   * @param peerId
   * @returns {*}
   */
  app.$zeyeClient.getAudioConsumer = peerId => {
    const consumersArray = app.$zeyeClient
      .getPeer(peerId)
      .consumers.map(consumerId =>
        store.state.zeyeClient.consumers.consumers.find(
          consumer => consumer.id === consumerId
        )
      );

    return consumersArray
      .filter(consumer => !!consumer)
      .find(consumer => consumer.track.kind === "audio");
  };

  /**
   * @method
   * @param peerId
   * @returns {*}
   */
  app.$zeyeClient.getVideoConsumer = peerId => {
    const consumersArray = app.$zeyeClient
      .getPeer(peerId)
      .consumers.map(consumerId =>
        store.state.zeyeClient.consumers.consumers.find(
          consumer => consumer.id === consumerId
        )
      );

    return consumersArray
      .filter(consumer => !!consumer)
      .find(consumer => consumer.track.kind === "video");
  };
}
