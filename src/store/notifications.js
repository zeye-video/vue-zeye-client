export const state = () => ({
  notifications: []
})

export const mutations = {
  addNotification(state, payload) {
    state.notifications.push(payload)
  },

  removeNotification(state, payload) {
    const { notificationId } = payload

    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationId
    )
  },

  removeAllNotifications(state) {
    state.notifications = []
  }
}

const module = {
  namespaced: true,
  state,
  mutations
}

export default module
