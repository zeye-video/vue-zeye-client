export const state = () => ({
  messages: []
})

export const mutations = {
  pushMessage(state, payload) {
    const { message } = payload

    state.messages.push(message)
  }
}
