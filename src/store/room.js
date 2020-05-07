export const state = () => ({
  url: "",
  state: "", // new/connecting/connected/closed
  activeSpeakerId: ""
  // faceDetection: false
});

export const mutations = {
  setRoomUrl(state, payload) {
    state.url = payload.url;
  },

  setRoomState(state, payload) {
    const roomState = payload.state;

    if (roomState !== "connected") {
      state.state = roomState;
      state.activeSpeakerId = null;
      state.statsPeerId = null;
    } else {
      state.state = roomState;
    }
  },

  setRoomActiveSpeaker(state, payload) {
    const { peerId } = payload;

    state.activeSpeakerId = peerId;
  },

  setFaceDetection(state, payload) {
    const { flag } = payload;

    state.faceDetection = flag;
  },

  removePeer(state, payload) {
    const { peerId } = payload;

    if (peerId && peerId === state.activeSpeakerId) {
      state.activeSpeakerId = null;
    }

    if (peerId && peerId === state.statsPeerId) {
      state.statsPeerId = null;
    }
  }
};

const room = {
  namespaced: true,
  state,
  mutations
};

export default room;
