import jsCookie from 'js-cookie'

const USER_COOKIE = 'zeye.user'
const DEVICES_COOKIE = 'zeye.devices'

export function getUser() {
  return jsCookie.getJSON(USER_COOKIE)
}

export function setUser({ displayName }) {
  jsCookie.set(USER_COOKIE, { displayName })
}

export function getDevices() {
  return jsCookie.getJSON(DEVICES_COOKIE)
}

export function setDevices({ webcamEnabled }) {
  jsCookie.set(DEVICES_COOKIE, { webcamEnabled })
}
