export default function registerFunctions({ app, store }) {
  /**
   * @method
   * @name getCurrentRoom
   * @returns {Object}
   */
  app.$zeyeClient.getCurrentRoom = () => store.state.zeyeClient.room;

  /**
   * @method
   * @name amIActiveSpeaker
   * @returns {Object}
   */
  app.$zeyeClient.amIActiveSpeaker = () =>
    store.state.zeyeClient.me.id ===
    store.state.zeyeClient.room.activeSpeakerId;

  /**
   * @method
   * @name isSpeakerActive
   * @returns {Object}
   */
  app.$zeyeClient.isSpeakerActive = peerId =>
    peerId === store.state.zeyeClient.room.activeSpeakerId;

  /**
   * @method
   * @method
   * @name setRoomUrl
   * @returns {void}
   */
  app.$zeyeClient.setRoomUrl = optionalRoomUrl => {
    optionalRoomUrl =
      optionalRoomUrl !== undefined ? optionalRoomUrl : window.location.href;

    store.commit("zeyeClient/room/setRoomUrl", {
      roomUrl: optionalRoomUrl
    });
  };
}
