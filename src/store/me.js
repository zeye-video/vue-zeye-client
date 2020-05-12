export const state = () => ({
  id: '',
  displayName: '',
  device: { flag: '', name: '', version: '' },
  canSendMic: true,
  canSendWebcam: true,
  canChangeWebcam: false,
  webcamInProgress: false,
  shareInProgress: false,
  audioOnly: false,
  audioOnlyInProgress: false,
  audioMuted: false,
  restartIceInProgress: false
})

export const mutations = {
  setRoomState(state, payload) {
    if (payload.state === 'closed') {
      state.webcamInProgress = false
      state.shareInProgress = false
      state.audioOnly = false
      state.audioOnlyInProgress = false
      state.audioMuted = false
      state.restartIceInProgress = false
    }
  },

  setMe(state, payload) {
    const { peerId, displayName, device } = payload
    state.id = peerId
    state.displayName = displayName
    state.device = device
  },

  setMediaCapabilities(state, payload) {
    const { canSendMic, canSendWebcam } = payload

    state.canSendMic = canSendMic
    state.canSendWebcam = canSendWebcam
  },

  setCanChangeWebcam(state, payload) {
    const { flag } = payload

    state.canChangeWebcam = flag
  },

  setWebcamInProgress(state, payload) {
    const { flag } = payload

    state.webcamInProgress = flag
  },

  setShareInProgress(state, payload) {
    const { flag } = payload

    state.shareInProgress = flag
  },

  setDisplayName(state, payload) {
    const { displayName } = payload

    if (displayName) {
      state.displayName = displayName
    }
  },

  setAudioOnlyState(state, payload) {
    const { enabled } = payload

    state.audioOnly = enabled
  },

  setAudioOnlyInProgress(state, payload) {
    const { flag } = payload

    state.audioOnlyInProgress = flag
  },

  setAudioMutedState(state, payload) {
    const { enabled } = payload

    state.audioMuted = enabled
  },

  setRestartIceInProgress(state, payload) {
    const { flag } = payload

    state.restartIceInProgress = flag
  }
}

const module = {
  namespaced: true,
  state,
  mutations
}

export default module
