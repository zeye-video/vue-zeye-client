export default function registerFunctions({ app, store }) {
  /**
   * @method
   * @name getProducers
   * @returns {Object}
   */
  app.$zeyeClient.getProducers = () =>
    store.state.zeyeClient.producers.producers;

  /**
   * @method
   * @name getAudioProducer
   * @returns {Object}
   */
  app.$zeyeClient.getAudioProducer = () =>
    app.$zeyeClient
      .getProducers()
      .find(producer => producer.track.kind === "audio");

  /**
   * @method
   * @name getVideoProducer
   * @returns {Object}
   */
  app.$zeyeClient.getVideoProducer = () =>
    app.$zeyeClient
      .getProducers()
      .find(producer => producer.track.kind === "video");
}
