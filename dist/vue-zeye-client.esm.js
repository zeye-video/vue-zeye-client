/*!
 * vue-zeye-client v0.1.0 
 * (c) 2020 stasoft91@gmail.com
 * Released under the ISC License.
 */
import Vue from 'vue';
import jsCookie from 'js-cookie';
import { random } from 'pokemon';
import protooClient from 'protoo-client';
import { parseScalabilityMode, Device } from 'mediasoup-client';
import hark from 'hark';

var state = function state() {
  return {
    consumers: []
  };
};
var mutations = {
  setRoomState: function setRoomState(state, payload) {
    if (payload.state === 'closed') {
      state.consumers = [];
    }
  },
  addConsumer: function addConsumer(state, payload) {
    state.consumers.push(payload.consumer);
  },
  removeConsumer: function removeConsumer(state, payload) {
    var consumerId = payload.consumerId;
    state.consumers = state.consumers.filter(function (consumer) {
      return consumer.id !== consumerId;
    });
  },
  setConsumerPaused: function setConsumerPaused(state, payload) {
    var consumerId = payload.consumerId,
        originator = payload.originator;
    var consumer = state.consumers.find(function (consumer) {
      return consumer.id === consumerId;
    });

    if (originator === 'local') {
      Vue.set(consumer, 'locallyPaused', true);
    } else {
      Vue.set(consumer, 'remotelyPaused', true);
    }
  },
  setConsumerResumed: function setConsumerResumed(state, payload) {
    var consumerId = payload.consumerId,
        originator = payload.originator;
    var consumer = state.consumers.find(function (consumer) {
      return consumer.id === consumerId;
    });

    if (originator === 'local') {
      Vue.set(consumer, 'locallyPaused', false);
    } else {
      Vue.set(consumer, 'remotelyPaused', false);
    }
  },
  setConsumerCurrentLayers: function setConsumerCurrentLayers(state, payload) {
    var consumerId = payload.consumerId,
        spatialLayer = payload.spatialLayer,
        temporalLayer = payload.temporalLayer;
    var consumer = state.consumers.find(function (consumer) {
      return consumer.id === consumerId;
    });
    Vue.set(consumer, 'currentSpatialLayer', spatialLayer);
    Vue.set(consumer, 'currentTemporalLayer', temporalLayer);
  },
  setConsumerPreferredLayers: function setConsumerPreferredLayers(state, payload) {
    var consumerId = payload.consumerId,
        spatialLayer = payload.spatialLayer,
        temporalLayer = payload.temporalLayer;
    var consumer = state.consumers.find(function (consumer) {
      return consumer.id === consumerId;
    });
    Vue.set(consumer, 'preferredSpatialLayer', spatialLayer);
    Vue.set(consumer, 'preferredTemporalLayer', temporalLayer);
  },
  setConsumerPriority: function setConsumerPriority(state, payload) {
    var consumerId = payload.consumerId,
        priority = payload.priority;
    var consumer = state.consumers.find(function (consumer) {
      return consumer.id === consumerId;
    });
    Vue.set(consumer, 'priority', priority);
  },
  setConsumerTrack: function setConsumerTrack(state, payload) {
    var consumerId = payload.consumerId,
        track = payload.track;
    var consumer = state.consumers.find(function (consumer) {
      return consumer.id === consumerId;
    });
    Vue.set(consumer, 'track', track);
  },
  setConsumerScore: function setConsumerScore(state, payload) {
    var consumerId = payload.consumerId,
        score = payload.score;
    var consumer = state.consumers.find(function (consumer) {
      return consumer.id === consumerId;
    });
    Vue.set(consumer, 'score', score);
  }
};
var module = {
  namespaced: true,
  state: state,
  mutations: mutations
};

var state$1 = function state() {
  return {
    dataConsumers: []
  };
};
var mutations$1 = {
  setRoomState: function setRoomState(state, payload) {
    if (payload.state === 'closed') {
      state.dataConsumers = [];
    }
  },
  addDataConsumer: function addDataConsumer(state, payload) {
    var dataConsumer = payload.dataConsumer;
    state.dataConsumers.push(dataConsumer);
  },
  removeDataConsumer: function removeDataConsumer(state, payload) {
    var dataConsumerId = payload.dataConsumerId;
    state.dataConsumers = state.dataConsumers.filter(function (consumer) {
      return consumer.id !== dataConsumerId;
    });
  }
};
var module$1 = {
  namespaced: true,
  state: state$1,
  mutations: mutations$1
};

var state$2 = function state() {
  return {
    dataProducers: []
  };
};
var mutations$2 = {
  setRoomState: function setRoomState(state, payload) {
    if (payload.state === 'closed') {
      state.dataProducers = [];
    }
  },
  addDataProducer: function addDataProducer(state, payload) {
    var dataProducer = payload.dataProducer;
    state.dataProducers.push(dataProducer);
  },
  removeDataProducer: function removeDataProducer(state, payload) {
    var dataProducerId = payload.dataProducerId;
    state.dataProducers = state.dataProducers.filter(function (consumer) {
      return consumer.id !== dataProducerId;
    });
  }
};
var module$2 = {
  namespaced: true,
  state: state$2,
  mutations: mutations$2
};

function randomString (length) {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

var actions = {
  notify: function notify(_ref, _ref2) {
    var commit = _ref.commit;
    var _ref2$type = _ref2.type,
        type = _ref2$type === void 0 ? 'info' : _ref2$type,
        text = _ref2.text,
        title = _ref2.title,
        timeout = _ref2.timeout;

    if (!timeout) {
      switch (type) {
        case 'info':
          timeout = 3000;
          break;

        case 'error':
          timeout = 5000;
          break;
      }
    }

    var notification = {
      id: randomString(6),
      type: type,
      title: title,
      text: text,
      timeout: timeout
    };
    commit('notifications/addNotification', notification);
    setTimeout(function () {
      commit('notifications/removeNotification', {
        notificationId: notification.id
      });
    }, timeout);
  }
};
var module$3 = {
  actions: actions
};

var state$3 = function state() {
  return {
    id: '',
    displayName: '',
    device: {
      flag: '',
      name: '',
      version: ''
    },
    canSendMic: true,
    canSendWebcam: true,
    canChangeWebcam: false,
    webcamInProgress: false,
    shareInProgress: false,
    audioOnly: false,
    audioOnlyInProgress: false,
    audioMuted: false,
    restartIceInProgress: false
  };
};
var mutations$3 = {
  setRoomState: function setRoomState(state, payload) {
    if (payload.state === 'closed') {
      state.webcamInProgress = false;
      state.shareInProgress = false;
      state.audioOnly = false;
      state.audioOnlyInProgress = false;
      state.audioMuted = false;
      state.restartIceInProgress = false;
    }
  },
  setMe: function setMe(state, payload) {
    var peerId = payload.peerId,
        displayName = payload.displayName,
        device = payload.device;
    state.id = peerId;
    state.displayName = displayName;
    state.device = device;
  },
  setMediaCapabilities: function setMediaCapabilities(state, payload) {
    var canSendMic = payload.canSendMic,
        canSendWebcam = payload.canSendWebcam;
    state.canSendMic = canSendMic;
    state.canSendWebcam = canSendWebcam;
  },
  setCanChangeWebcam: function setCanChangeWebcam(state, payload) {
    var canChangeWebcam = payload.canChangeWebcam;
    state.canChangeWebcam = canChangeWebcam;
  },
  setWebcamInProgress: function setWebcamInProgress(state, payload) {
    var flag = payload.flag;
    state.webcamInProgress = flag;
  },
  setShareInProgress: function setShareInProgress(state, payload) {
    var flag = payload.flag;
    state.shareInProgress = flag;
  },
  setDisplayName: function setDisplayName(state, payload) {
    var displayName = payload.displayName;

    if (displayName) {
      state.displayName = displayName;
    }
  },
  setAudioOnlyState: function setAudioOnlyState(state, payload) {
    var enabled = payload.enabled;
    state.audioOnly = enabled;
  },
  setAudioOnlyInProgress: function setAudioOnlyInProgress(state, payload) {
    var flag = payload.flag;
    state.audioOnlyInProgress = flag;
  },
  setAudioMutedState: function setAudioMutedState(state, payload) {
    var enabled = payload.enabled;
    state.audioMuted = enabled;
  },
  setRestartIceInProgress: function setRestartIceInProgress(state, payload) {
    var flag = payload.flag;
    state.restartIceInProgress = flag;
  }
};
var module$4 = {
  namespaced: true,
  state: state$3,
  mutations: mutations$3
};

var state$4 = function state() {
  return {
    notifications: []
  };
};
var mutations$4 = {
  addNotification: function addNotification(state, payload) {
    state.notifications.push(payload);
  },
  removeNotification: function removeNotification(state, payload) {
    var notificationId = payload.notificationId;
    state.notifications = state.notifications.filter(function (notification) {
      return notification.id !== notificationId;
    });
  },
  removeAllNotifications: function removeAllNotifications(state) {
    state.notifications = [];
  }
};
var module$5 = {
  namespaced: true,
  state: state$4,
  mutations: mutations$4
};

var state$5 = function state() {
  return {
    peers: []
  };
};
var mutations$5 = {
  setRoomState: function setRoomState(state, payload) {
    if (payload.state === 'closed') {
      state.peers = [];
    }
  },
  addPeer: function addPeer(state, payload) {
    var peer = payload.peer;
    state.peers.push(peer);
  },
  removePeer: function removePeer(state, payload) {
    var peerId = payload.peerId;
    state.peers = state.peers.filter(function (peer) {
      return peer.id !== peerId;
    });
  },
  setPeerDisplayName: function setPeerDisplayName(state, payload) {
    var displayName = payload.displayName,
        peerId = payload.peerId;
    var peer = state.peers.find(function (peer) {
      return peer.id === peerId;
    });

    if (!peer) {
      throw new Error('no Peer found');
    }

    state.peer.displayName = displayName;
  },
  addConsumer: function addConsumer(state, payload) {
    var consumer = payload.consumer,
        peerId = payload.peerId;
    var peer = state.peers.find(function (peer) {
      return peer.id === peerId;
    });

    if (!peer) {
      throw new Error('no Peer found for new Consumer');
    }

    peer.consumers.push(consumer.id);
  },
  removeConsumer: function removeConsumer(state, payload) {
    var consumerId = payload.consumerId,
        peerId = payload.peerId;
    var peer = state.peers.find(function (peer) {
      return peer.id === peerId;
    }); // NOTE: This means that the Peer was closed before, so it's ok.

    if (!peer) {
      return;
    }

    peer.consumers = peer.consumers.filter(function (consumer) {
      return consumer === consumerId;
    });
  },
  addDataConsumer: function addDataConsumer(state, payload) {
    var dataConsumer = payload.dataConsumer,
        peerId = payload.peerId; // special case for bot DataConsumer.

    if (!peerId) {
      return;
    }

    var peer = state.peers.find(function (peer) {
      return peer.id === peerId;
    });

    if (!peer) {
      throw new Error('no Peer found for new DataConsumer');
    }

    peer.dataConsumers.push(dataConsumer.id);
  },
  removeDataConsumer: function removeDataConsumer(state, payload) {
    var dataConsumerId = payload.dataConsumerId,
        peerId = payload.peerId; // special case for bot DataConsumer.

    if (!peerId) {
      return;
    }

    var peer = state.peers.find(function (peer) {
      return peer.id === peerId;
    }); // NOTE: This means that the Peer was closed before, so it's ok.

    if (!peer) {
      return;
    }

    peer.dataConsumers = peer.dataConsumers.filter(function (dataConsumer) {
      return dataConsumer === dataConsumerId;
    });
  }
};
var module$6 = {
  namespaced: true,
  state: state$5,
  mutations: mutations$5
};

var state$6 = function state() {
  return {
    producers: []
  };
};
var mutations$6 = {
  setRoomState: function setRoomState(state, payload) {
    if (payload.state === 'closed') {
      state.producers = [];
    }
  },
  addProducer: function addProducer(state, payload) {
    var producer = payload.producer;
    state.producers.push(producer);
  },
  removeProducer: function removeProducer(state, payload) {
    var producerId = payload.producerId;
    state.producers = state.producers.filter(function (producer) {
      return producer.id !== producerId;
    });
  },
  setProducerPaused: function setProducerPaused(state, payload) {
    var producerId = payload.producerId;
    var producer = state.producers.find(function (producer) {
      return producer.id === producerId;
    });
    producer.paused = true;
  },
  setProducerResumed: function setProducerResumed(state, payload) {
    var producerId = payload.producerId;
    var producer = state.producers.find(function (producer) {
      return producer.id === producerId;
    });
    producer.paused = false;
  },
  setProducerTrack: function setProducerTrack(state, payload) {
    var producerId = payload.producerId,
        track = payload.track;
    var producer = state.producers.find(function (producer) {
      return producer.id === producerId;
    });
    producer.track = track;
  },
  setProducerScore: function setProducerScore(state, payload) {
    var producerId = payload.producerId,
        score = payload.score;
    var producer = state.producers.find(function (producer) {
      return producer.id === producerId;
    });
    producer.score = score;
  }
};
var module$7 = {
  namespaced: true,
  state: state$6,
  mutations: mutations$6
};

var state$7 = function state() {
  return {
    url: '',
    state: '',
    // new/connecting/connected/closed
    activeSpeakerId: '' // faceDetection: false

  };
};
var mutations$7 = {
  setRoomUrl: function setRoomUrl(state, payload) {
    state.url = payload.url;
  },
  setRoomState: function setRoomState(state, payload) {
    var roomState = payload.state;

    if (roomState !== 'connected') {
      state.state = roomState;
      state.activeSpeakerId = null;
      state.statsPeerId = null;
    } else {
      state.state = roomState;
    }
  },
  setRoomActiveSpeaker: function setRoomActiveSpeaker(state, payload) {
    var peerId = payload.peerId;
    state.activeSpeakerId = peerId;
  },
  setFaceDetection: function setFaceDetection(state, payload) {
    var flag = payload.flag;
    state.faceDetection = flag;
  },
  removePeer: function removePeer(state, payload) {
    var peerId = payload.peerId;

    if (peerId && peerId === state.activeSpeakerId) {
      state.activeSpeakerId = null;
    }

    if (peerId && peerId === state.statsPeerId) {
      state.statsPeerId = null;
    }
  }
};
var room = {
  namespaced: true,
  state: state$7,
  mutations: mutations$7
};

function registerFunctions(_ref) {
  var app = _ref.app,
      store = _ref.store;

  /**
   * @method
   * @name getCurrentRoom
   * @returns {Object}
   */
  app.$zeyeClient.getCurrentRoom = function () {
    return store.state.zeyeClient.room;
  };
  /**
   * @method
   * @name amIActiveSpeaker
   * @returns {Object}
   */


  app.$zeyeClient.amIActiveSpeaker = function () {
    return store.state.zeyeClient.me.id === store.state.zeyeClient.room.activeSpeakerId;
  };
  /**
   * @method
   * @name isSpeakerActive
   * @returns {Object}
   */


  app.$zeyeClient.isSpeakerActive = function (peerId) {
    return peerId === store.state.zeyeClient.room.activeSpeakerId;
  };
  /**
   * @method
   * @method
   * @name setRoomUrl
   * @returns {void}
   */


  app.$zeyeClient.setRoomUrl = function (optionalRoomUrl) {
    optionalRoomUrl = optionalRoomUrl !== undefined ? optionalRoomUrl : window.location.href;
    store.commit('zeyeClient/room/setRoomUrl', {
      roomUrl: optionalRoomUrl
    });
  };
}

var USER_COOKIE = 'mediasoup-demo.user';
var DEVICES_COOKIE = 'mediasoup-demo.devices';
function setUser(_ref) {
  var displayName = _ref.displayName;
  jsCookie.set(USER_COOKIE, {
    displayName: displayName
  });
}
function getDevices() {
  return jsCookie.getJSON(DEVICES_COOKIE);
}
function setDevices(_ref2) {
  var webcamEnabled = _ref2.webcamEnabled;
  jsCookie.set(DEVICES_COOKIE, {
    webcamEnabled: webcamEnabled
  });
}

function randomName () {
  var lang = 'en';
  return random(lang);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o) {
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var it,
      normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

// NOTE: this list must be up-to-date with browsers listed in
// test/acceptance/useragentstrings.yml
var BROWSER_ALIASES_MAP = {
  'Amazon Silk': 'amazon_silk',
  'Android Browser': 'android',
  Bada: 'bada',
  BlackBerry: 'blackberry',
  Chrome: 'chrome',
  Chromium: 'chromium',
  Electron: 'electron',
  Epiphany: 'epiphany',
  Firefox: 'firefox',
  Focus: 'focus',
  Generic: 'generic',
  'Google Search': 'google_search',
  Googlebot: 'googlebot',
  'Internet Explorer': 'ie',
  'K-Meleon': 'k_meleon',
  Maxthon: 'maxthon',
  'Microsoft Edge': 'edge',
  'MZ Browser': 'mz',
  'NAVER Whale Browser': 'naver',
  Opera: 'opera',
  'Opera Coast': 'opera_coast',
  PhantomJS: 'phantomjs',
  Puffin: 'puffin',
  QupZilla: 'qupzilla',
  QQ: 'qq',
  QQLite: 'qqlite',
  Safari: 'safari',
  Sailfish: 'sailfish',
  'Samsung Internet for Android': 'samsung_internet',
  SeaMonkey: 'seamonkey',
  Sleipnir: 'sleipnir',
  Swing: 'swing',
  Tizen: 'tizen',
  'UC Browser': 'uc',
  Vivaldi: 'vivaldi',
  'WebOS Browser': 'webos',
  WeChat: 'wechat',
  'Yandex Browser': 'yandex',
  Roku: 'roku'
};
var BROWSER_MAP = {
  amazon_silk: 'Amazon Silk',
  android: 'Android Browser',
  bada: 'Bada',
  blackberry: 'BlackBerry',
  chrome: 'Chrome',
  chromium: 'Chromium',
  electron: 'Electron',
  epiphany: 'Epiphany',
  firefox: 'Firefox',
  focus: 'Focus',
  generic: 'Generic',
  googlebot: 'Googlebot',
  google_search: 'Google Search',
  ie: 'Internet Explorer',
  k_meleon: 'K-Meleon',
  maxthon: 'Maxthon',
  edge: 'Microsoft Edge',
  mz: 'MZ Browser',
  naver: 'NAVER Whale Browser',
  opera: 'Opera',
  opera_coast: 'Opera Coast',
  phantomjs: 'PhantomJS',
  puffin: 'Puffin',
  qupzilla: 'QupZilla',
  qq: 'QQ Browser',
  qqlite: 'QQ Browser Lite',
  safari: 'Safari',
  sailfish: 'Sailfish',
  samsung_internet: 'Samsung Internet for Android',
  seamonkey: 'SeaMonkey',
  sleipnir: 'Sleipnir',
  swing: 'Swing',
  tizen: 'Tizen',
  uc: 'UC Browser',
  vivaldi: 'Vivaldi',
  webos: 'WebOS Browser',
  wechat: 'WeChat',
  yandex: 'Yandex Browser'
};
var PLATFORMS_MAP = {
  tablet: 'tablet',
  mobile: 'mobile',
  desktop: 'desktop',
  tv: 'tv'
};
var OS_MAP = {
  WindowsPhone: 'Windows Phone',
  Windows: 'Windows',
  MacOS: 'macOS',
  iOS: 'iOS',
  Android: 'Android',
  WebOS: 'WebOS',
  BlackBerry: 'BlackBerry',
  Bada: 'Bada',
  Tizen: 'Tizen',
  Linux: 'Linux',
  ChromeOS: 'Chrome OS',
  PlayStation4: 'PlayStation 4',
  Roku: 'Roku'
};
var ENGINE_MAP = {
  EdgeHTML: 'EdgeHTML',
  Blink: 'Blink',
  Trident: 'Trident',
  Presto: 'Presto',
  Gecko: 'Gecko',
  WebKit: 'WebKit'
};

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "getFirstMatch",

    /**
     * Get first matched item for a string
     * @param {RegExp} regexp
     * @param {String} ua
     * @return {Array|{index: number, input: string}|*|boolean|string}
     */
    value: function getFirstMatch(regexp, ua) {
      var match = ua.match(regexp);
      return match && match.length > 0 && match[1] || '';
    }
    /**
     * Get second matched item for a string
     * @param regexp
     * @param {String} ua
     * @return {Array|{index: number, input: string}|*|boolean|string}
     */

  }, {
    key: "getSecondMatch",
    value: function getSecondMatch(regexp, ua) {
      var match = ua.match(regexp);
      return match && match.length > 1 && match[2] || '';
    }
    /**
     * Match a regexp and return a constant or undefined
     * @param {RegExp} regexp
     * @param {String} ua
     * @param {*} _const Any const that will be returned if regexp matches the string
     * @return {*}
     */

  }, {
    key: "matchAndReturnConst",
    value: function matchAndReturnConst(regexp, ua, _const) {
      if (regexp.test(ua)) {
        return _const;
      }

      return void 0;
    }
  }, {
    key: "getWindowsVersionName",
    value: function getWindowsVersionName(version) {
      switch (version) {
        case 'NT':
          return 'NT';

        case 'XP':
          return 'XP';

        case 'NT 5.0':
          return '2000';

        case 'NT 5.1':
          return 'XP';

        case 'NT 5.2':
          return '2003';

        case 'NT 6.0':
          return 'Vista';

        case 'NT 6.1':
          return '7';

        case 'NT 6.2':
          return '8';

        case 'NT 6.3':
          return '8.1';

        case 'NT 10.0':
          return '10';

        default:
          return undefined;
      }
    }
    /**
     * Get macOS version name
     *    10.5 - Leopard
     *    10.6 - Snow Leopard
     *    10.7 - Lion
     *    10.8 - Mountain Lion
     *    10.9 - Mavericks
     *    10.10 - Yosemite
     *    10.11 - El Capitan
     *    10.12 - Sierra
     *    10.13 - High Sierra
     *    10.14 - Mojave
     *    10.15 - Catalina
     *
     * @example
     *   getMacOSVersionName("10.14") // 'Mojave'
     *
     * @param  {string} version
     * @return {string} versionName
     */

  }, {
    key: "getMacOSVersionName",
    value: function getMacOSVersionName(version) {
      var v = version.split('.').splice(0, 2).map(function (s) {
        return parseInt(s, 10) || 0;
      });
      v.push(0);
      if (v[0] !== 10) return undefined;

      switch (v[1]) {
        case 5:
          return 'Leopard';

        case 6:
          return 'Snow Leopard';

        case 7:
          return 'Lion';

        case 8:
          return 'Mountain Lion';

        case 9:
          return 'Mavericks';

        case 10:
          return 'Yosemite';

        case 11:
          return 'El Capitan';

        case 12:
          return 'Sierra';

        case 13:
          return 'High Sierra';

        case 14:
          return 'Mojave';

        case 15:
          return 'Catalina';

        default:
          return undefined;
      }
    }
    /**
     * Get Android version name
     *    1.5 - Cupcake
     *    1.6 - Donut
     *    2.0 - Eclair
     *    2.1 - Eclair
     *    2.2 - Froyo
     *    2.x - Gingerbread
     *    3.x - Honeycomb
     *    4.0 - Ice Cream Sandwich
     *    4.1 - Jelly Bean
     *    4.4 - KitKat
     *    5.x - Lollipop
     *    6.x - Marshmallow
     *    7.x - Nougat
     *    8.x - Oreo
     *    9.x - Pie
     *
     * @example
     *   getAndroidVersionName("7.0") // 'Nougat'
     *
     * @param  {string} version
     * @return {string} versionName
     */

  }, {
    key: "getAndroidVersionName",
    value: function getAndroidVersionName(version) {
      var v = version.split('.').splice(0, 2).map(function (s) {
        return parseInt(s, 10) || 0;
      });
      v.push(0);
      if (v[0] === 1 && v[1] < 5) return undefined;
      if (v[0] === 1 && v[1] < 6) return 'Cupcake';
      if (v[0] === 1 && v[1] >= 6) return 'Donut';
      if (v[0] === 2 && v[1] < 2) return 'Eclair';
      if (v[0] === 2 && v[1] === 2) return 'Froyo';
      if (v[0] === 2 && v[1] > 2) return 'Gingerbread';
      if (v[0] === 3) return 'Honeycomb';
      if (v[0] === 4 && v[1] < 1) return 'Ice Cream Sandwich';
      if (v[0] === 4 && v[1] < 4) return 'Jelly Bean';
      if (v[0] === 4 && v[1] >= 4) return 'KitKat';
      if (v[0] === 5) return 'Lollipop';
      if (v[0] === 6) return 'Marshmallow';
      if (v[0] === 7) return 'Nougat';
      if (v[0] === 8) return 'Oreo';
      if (v[0] === 9) return 'Pie';
      return undefined;
    }
    /**
     * Get version precisions count
     *
     * @example
     *   getVersionPrecision("1.10.3") // 3
     *
     * @param  {string} version
     * @return {number}
     */

  }, {
    key: "getVersionPrecision",
    value: function getVersionPrecision(version) {
      return version.split('.').length;
    }
    /**
     * Calculate browser version weight
     *
     * @example
     *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
     *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
     *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
     *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
     *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
     *
     * @param {String} versionA versions versions to compare
     * @param {String} versionB versions versions to compare
     * @param {boolean} [isLoose] enable loose comparison
     * @return {Number} comparison result: -1 when versionA is lower,
     * 1 when versionA is bigger, 0 when both equal
     */

    /* eslint consistent-return: 1 */

  }, {
    key: "compareVersions",
    value: function compareVersions(versionA, versionB) {
      var isLoose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
      var versionAPrecision = Utils.getVersionPrecision(versionA);
      var versionBPrecision = Utils.getVersionPrecision(versionB);
      var precision = Math.max(versionAPrecision, versionBPrecision);
      var lastPrecision = 0;
      var chunks = Utils.map([versionA, versionB], function (version) {
        var delta = precision - Utils.getVersionPrecision(version); // 2) "9" -> "9.0" (for precision = 2)

        var _version = version + new Array(delta + 1).join('.0'); // 3) "9.0" -> ["000000000"", "000000009"]


        return Utils.map(_version.split('.'), function (chunk) {
          return new Array(20 - chunk.length).join('0') + chunk;
        }).reverse();
      }); // adjust precision for loose comparison

      if (isLoose) {
        lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision);
      } // iterate in reverse order by reversed chunks array


      precision -= 1;

      while (precision >= lastPrecision) {
        // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
        if (chunks[0][precision] > chunks[1][precision]) {
          return 1;
        }

        if (chunks[0][precision] === chunks[1][precision]) {
          if (precision === lastPrecision) {
            // all version chunks are same
            return 0;
          }

          precision -= 1;
        } else if (chunks[0][precision] < chunks[1][precision]) {
          return -1;
        }
      }

      return undefined;
    }
    /**
     * Array::map polyfill
     *
     * @param  {Array} arr
     * @param  {Function} iterator
     * @return {Array}
     */

  }, {
    key: "map",
    value: function map(arr, iterator) {
      var result = [];
      var i;

      if (Array.prototype.map) {
        return Array.prototype.map.call(arr, iterator);
      }

      for (i = 0; i < arr.length; i += 1) {
        result.push(iterator(arr[i]));
      }

      return result;
    }
    /**
     * Array::find polyfill
     *
     * @param  {Array} arr
     * @param  {Function} predicate
     * @return {Array}
     */

  }, {
    key: "find",
    value: function find(arr, predicate) {
      var i;
      var l;

      if (Array.prototype.find) {
        return Array.prototype.find.call(arr, predicate);
      }

      for (i = 0, l = arr.length; i < l; i += 1) {
        var value = arr[i];

        if (predicate(value, i)) {
          return value;
        }
      }

      return undefined;
    }
    /**
     * Object::assign polyfill
     *
     * @param  {Object} obj
     * @param  {Object} ...objs
     * @return {Object}
     */

  }, {
    key: "assign",
    value: function assign(obj) {
      var result = obj;
      var i;
      var l;

      for (var _len = arguments.length, assigners = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        assigners[_key - 1] = arguments[_key];
      }

      if (Object.assign) {
        return Object.assign.apply(Object, [obj].concat(assigners));
      }

      var _loop = function _loop() {
        var assigner = assigners[i];

        if (_typeof(assigner) === 'object' && assigner !== null) {
          var keys = Object.keys(assigner);
          keys.forEach(function (key) {
            result[key] = assigner[key];
          });
        }
      };

      for (i = 0, l = assigners.length; i < l; i += 1) {
        _loop();
      }

      return obj;
    }
    /**
     * Get short version/alias for a browser name
     *
     * @example
     *   getBrowserAlias('Microsoft Edge') // edge
     *
     * @param  {string} browserName
     * @return {string}
     */

  }, {
    key: "getBrowserAlias",
    value: function getBrowserAlias(browserName) {
      return BROWSER_ALIASES_MAP[browserName];
    }
    /**
     * Get short version/alias for a browser name
     *
     * @example
     *   getBrowserAlias('edge') // Microsoft Edge
     *
     * @param  {string} browserAlias
     * @return {string}
     */

  }, {
    key: "getBrowserTypeByAlias",
    value: function getBrowserTypeByAlias(browserAlias) {
      return BROWSER_MAP[browserAlias] || '';
    }
  }]);

  return Utils;
}();

/**
 * Browsers' descriptors
 *
 * The idea of descriptors is simple. You should know about them two simple things:
 * 1. Every descriptor has a method or property called `test` and a `describe` method.
 * 2. Order of descriptors is important.
 *
 * More details:
 * 1. Method or property `test` serves as a way to detect whether the UA string
 * matches some certain browser or not. The `describe` method helps to make a result
 * object with params that show some browser-specific things: name, version, etc.
 * 2. Order of descriptors is important because a Parser goes through them one by one
 * in course. For example, if you insert Chrome's descriptor as the first one,
 * more then a half of browsers will be described as Chrome, because they will pass
 * the Chrome descriptor's test.
 *
 * Descriptor's `test` could be a property with an array of RegExps, where every RegExp
 * will be applied to a UA string to test it whether it matches or not.
 * If a descriptor has two or more regexps in the `test` array it tests them one by one
 * with a logical sum operation. Parser stops if it has found any RegExp that matches the UA.
 *
 * Or `test` could be a method. In that case it gets a Parser instance and should
 * return true/false to get the Parser know if this browser descriptor matches the UA or not.
 */
var commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;
var browsersList = [
/* Googlebot */
{
  test: [/googlebot/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Googlebot'
    };
    var version = Utils.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
},
/* Opera < 13.0 */
{
  test: [/opera/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Opera'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
},
/* Opera > 13.0 */
{
  test: [/opr\/|opios/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Opera'
    };
    var version = Utils.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/SamsungBrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Samsung Internet for Android'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/Whale/i],
  describe: function describe(ua) {
    var browser = {
      name: 'NAVER Whale Browser'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/MZBrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: 'MZ Browser'
    };
    var version = Utils.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/focus/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Focus'
    };
    var version = Utils.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/swing/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Swing'
    };
    var version = Utils.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/coast/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Opera Coast'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/yabrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Yandex Browser'
    };
    var version = Utils.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/ucbrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: 'UC Browser'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/Maxthon|mxios/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Maxthon'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/epiphany/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Epiphany'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/puffin/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Puffin'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/sleipnir/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Sleipnir'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/k-meleon/i],
  describe: function describe(ua) {
    var browser = {
      name: 'K-Meleon'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/micromessenger/i],
  describe: function describe(ua) {
    var browser = {
      name: 'WeChat'
    };
    var version = Utils.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/qqbrowser/i],
  describe: function describe(ua) {
    var browser = {
      name: /qqbrowserlite/i.test(ua) ? 'QQ Browser Lite' : 'QQ Browser'
    };
    var version = Utils.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/msie|trident/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Internet Explorer'
    };
    var version = Utils.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/\sedg\//i],
  describe: function describe(ua) {
    var browser = {
      name: 'Microsoft Edge'
    };
    var version = Utils.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/edg([ea]|ios)/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Microsoft Edge'
    };
    var version = Utils.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/vivaldi/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Vivaldi'
    };
    var version = Utils.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/seamonkey/i],
  describe: function describe(ua) {
    var browser = {
      name: 'SeaMonkey'
    };
    var version = Utils.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/sailfish/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Sailfish'
    };
    var version = Utils.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/silk/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Amazon Silk'
    };
    var version = Utils.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/phantom/i],
  describe: function describe(ua) {
    var browser = {
      name: 'PhantomJS'
    };
    var version = Utils.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/slimerjs/i],
  describe: function describe(ua) {
    var browser = {
      name: 'SlimerJS'
    };
    var version = Utils.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
  describe: function describe(ua) {
    var browser = {
      name: 'BlackBerry'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/(web|hpw)[o0]s/i],
  describe: function describe(ua) {
    var browser = {
      name: 'WebOS Browser'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/bada/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Bada'
    };
    var version = Utils.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/tizen/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Tizen'
    };
    var version = Utils.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/qupzilla/i],
  describe: function describe(ua) {
    var browser = {
      name: 'QupZilla'
    };
    var version = Utils.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/firefox|iceweasel|fxios/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Firefox'
    };
    var version = Utils.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/electron/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Electron'
    };
    var version = Utils.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/chromium/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Chromium'
    };
    var version = Utils.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/chrome|crios|crmo/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Chrome'
    };
    var version = Utils.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
}, {
  test: [/GSA/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Google Search'
    };
    var version = Utils.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
},
/* Android Browser */
{
  test: function test(parser) {
    var notLikeAndroid = !parser.test(/like android/i);
    var butAndroid = parser.test(/android/i);
    return notLikeAndroid && butAndroid;
  },
  describe: function describe(ua) {
    var browser = {
      name: 'Android Browser'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
},
/* PlayStation 4 */
{
  test: [/playstation 4/i],
  describe: function describe(ua) {
    var browser = {
      name: 'PlayStation 4'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
},
/* Safari */
{
  test: [/safari|applewebkit/i],
  describe: function describe(ua) {
    var browser = {
      name: 'Safari'
    };
    var version = Utils.getFirstMatch(commonVersionIdentifier, ua);

    if (version) {
      browser.version = version;
    }

    return browser;
  }
},
/* Something else */
{
  test: [/.*/i],
  describe: function describe(ua) {
    /* Here we try to make sure that there are explicit details about the device
     * in order to decide what regexp exactly we want to apply
     * (as there is a specific decision based on that conclusion)
     */
    var regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
    var regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
    var hasDeviceSpec = ua.search('\\(') !== -1;
    var regexp = hasDeviceSpec ? regexpWithDeviceSpec : regexpWithoutDeviceSpec;
    return {
      name: Utils.getFirstMatch(regexp, ua),
      version: Utils.getSecondMatch(regexp, ua)
    };
  }
}];

var osParsersList = [
/* Roku */
{
  test: [/Roku\/DVP/],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, ua);
    return {
      name: OS_MAP.Roku,
      version: version
    };
  }
},
/* Windows Phone */
{
  test: [/windows phone/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
    return {
      name: OS_MAP.WindowsPhone,
      version: version
    };
  }
},
/* Windows */
{
  test: [/windows /i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
    var versionName = Utils.getWindowsVersionName(version);
    return {
      name: OS_MAP.Windows,
      version: version,
      versionName: versionName
    };
  }
},
/* Firefox on iPad */
{
  test: [/Macintosh(.*?) FxiOS(.*?) Version\//],
  describe: function describe(ua) {
    var version = Utils.getSecondMatch(/(Version\/)(\d[\d.]+)/, ua);
    return {
      name: OS_MAP.iOS,
      version: version
    };
  }
},
/* macOS */
{
  test: [/macintosh/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, '.');
    var versionName = Utils.getMacOSVersionName(version);
    var os = {
      name: OS_MAP.MacOS,
      version: version
    };

    if (versionName) {
      os.versionName = versionName;
    }

    return os;
  }
},
/* iOS */
{
  test: [/(ipod|iphone|ipad)/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, '.');
    return {
      name: OS_MAP.iOS,
      version: version
    };
  }
},
/* Android */
{
  test: function test(parser) {
    var notLikeAndroid = !parser.test(/like android/i);
    var butAndroid = parser.test(/android/i);
    return notLikeAndroid && butAndroid;
  },
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
    var versionName = Utils.getAndroidVersionName(version);
    var os = {
      name: OS_MAP.Android,
      version: version
    };

    if (versionName) {
      os.versionName = versionName;
    }

    return os;
  }
},
/* WebOS */
{
  test: [/(web|hpw)[o0]s/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
    var os = {
      name: OS_MAP.WebOS
    };

    if (version && version.length) {
      os.version = version;
    }

    return os;
  }
},
/* BlackBerry */
{
  test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua) || Utils.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua) || Utils.getFirstMatch(/\bbb(\d+)/i, ua);
    return {
      name: OS_MAP.BlackBerry,
      version: version
    };
  }
},
/* Bada */
{
  test: [/bada/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);
    return {
      name: OS_MAP.Bada,
      version: version
    };
  }
},
/* Tizen */
{
  test: [/tizen/i],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);
    return {
      name: OS_MAP.Tizen,
      version: version
    };
  }
},
/* Linux */
{
  test: [/linux/i],
  describe: function describe() {
    return {
      name: OS_MAP.Linux
    };
  }
},
/* Chrome OS */
{
  test: [/CrOS/],
  describe: function describe() {
    return {
      name: OS_MAP.ChromeOS
    };
  }
},
/* Playstation 4 */
{
  test: [/PlayStation 4/],
  describe: function describe(ua) {
    var version = Utils.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, ua);
    return {
      name: OS_MAP.PlayStation4,
      version: version
    };
  }
}];

/*
 * Tablets go first since usually they have more specific
 * signs to detect.
 */

var platformParsersList = [
/* Googlebot */
{
  test: [/googlebot/i],
  describe: function describe() {
    return {
      type: 'bot',
      vendor: 'Google'
    };
  }
},
/* Huawei */
{
  test: [/huawei/i],
  describe: function describe(ua) {
    var model = Utils.getFirstMatch(/(can-l01)/i, ua) && 'Nova';
    var platform = {
      type: PLATFORMS_MAP.mobile,
      vendor: 'Huawei'
    };

    if (model) {
      platform.model = model;
    }

    return platform;
  }
},
/* Nexus Tablet */
{
  test: [/nexus\s*(?:7|8|9|10).*/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet,
      vendor: 'Nexus'
    };
  }
},
/* iPad */
{
  test: [/ipad/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet,
      vendor: 'Apple',
      model: 'iPad'
    };
  }
},
/* Firefox on iPad */
{
  test: [/Macintosh(.*?) FxiOS(.*?) Version\//],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet,
      vendor: 'Apple',
      model: 'iPad'
    };
  }
},
/* Amazon Kindle Fire */
{
  test: [/kftt build/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet,
      vendor: 'Amazon',
      model: 'Kindle Fire HD 7'
    };
  }
},
/* Another Amazon Tablet with Silk */
{
  test: [/silk/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet,
      vendor: 'Amazon'
    };
  }
},
/* Tablet */
{
  test: [/tablet(?! pc)/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet
    };
  }
},
/* iPod/iPhone */
{
  test: function test(parser) {
    var iDevice = parser.test(/ipod|iphone/i);
    var likeIDevice = parser.test(/like (ipod|iphone)/i);
    return iDevice && !likeIDevice;
  },
  describe: function describe(ua) {
    var model = Utils.getFirstMatch(/(ipod|iphone)/i, ua);
    return {
      type: PLATFORMS_MAP.mobile,
      vendor: 'Apple',
      model: model
    };
  }
},
/* Nexus Mobile */
{
  test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile,
      vendor: 'Nexus'
    };
  }
},
/* Mobile */
{
  test: [/[^-]mobi/i],
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile
    };
  }
},
/* BlackBerry */
{
  test: function test(parser) {
    return parser.getBrowserName(true) === 'blackberry';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile,
      vendor: 'BlackBerry'
    };
  }
},
/* Bada */
{
  test: function test(parser) {
    return parser.getBrowserName(true) === 'bada';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile
    };
  }
},
/* Windows Phone */
{
  test: function test(parser) {
    return parser.getBrowserName() === 'windows phone';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile,
      vendor: 'Microsoft'
    };
  }
},
/* Android Tablet */
{
  test: function test(parser) {
    var osMajorVersion = Number(String(parser.getOSVersion()).split('.')[0]);
    return parser.getOSName(true) === 'android' && osMajorVersion >= 3;
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tablet
    };
  }
},
/* Android Mobile */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'android';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.mobile
    };
  }
},
/* desktop */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'macos';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.desktop,
      vendor: 'Apple'
    };
  }
},
/* Windows */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'windows';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.desktop
    };
  }
},
/* Linux */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'linux';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.desktop
    };
  }
},
/* PlayStation 4 */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'playstation 4';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tv
    };
  }
},
/* Roku */
{
  test: function test(parser) {
    return parser.getOSName(true) === 'roku';
  },
  describe: function describe() {
    return {
      type: PLATFORMS_MAP.tv
    };
  }
}];

/*
 * More specific goes first
 */

var enginesParsersList = [
/* EdgeHTML */
{
  test: function test(parser) {
    return parser.getBrowserName(true) === 'microsoft edge';
  },
  describe: function describe(ua) {
    var isBlinkBased = /\sedg\//i.test(ua); // return blink if it's blink-based one

    if (isBlinkBased) {
      return {
        name: ENGINE_MAP.Blink
      };
    } // otherwise match the version and return EdgeHTML


    var version = Utils.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);
    return {
      name: ENGINE_MAP.EdgeHTML,
      version: version
    };
  }
},
/* Trident */
{
  test: [/trident/i],
  describe: function describe(ua) {
    var engine = {
      name: ENGINE_MAP.Trident
    };
    var version = Utils.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      engine.version = version;
    }

    return engine;
  }
},
/* Presto */
{
  test: function test(parser) {
    return parser.test(/presto/i);
  },
  describe: function describe(ua) {
    var engine = {
      name: ENGINE_MAP.Presto
    };
    var version = Utils.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      engine.version = version;
    }

    return engine;
  }
},
/* Gecko */
{
  test: function test(parser) {
    var isGecko = parser.test(/gecko/i);
    var likeGecko = parser.test(/like gecko/i);
    return isGecko && !likeGecko;
  },
  describe: function describe(ua) {
    var engine = {
      name: ENGINE_MAP.Gecko
    };
    var version = Utils.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      engine.version = version;
    }

    return engine;
  }
},
/* Blink */
{
  test: [/(apple)?webkit\/537\.36/i],
  describe: function describe() {
    return {
      name: ENGINE_MAP.Blink
    };
  }
},
/* WebKit */
{
  test: [/(apple)?webkit/i],
  describe: function describe(ua) {
    var engine = {
      name: ENGINE_MAP.WebKit
    };
    var version = Utils.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);

    if (version) {
      engine.version = version;
    }

    return engine;
  }
}];

/**
 * The main class that arranges the whole parsing process.
 */

var Parser = /*#__PURE__*/function () {
  /**
   * Create instance of Parser
   *
   * @param {String} UA User-Agent string
   * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
   * improvements if you need to make a more particular parsing
   * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
   *
   * @throw {Error} in case of empty UA String
   *
   * @constructor
   */
  function Parser(UA) {
    var skipParsing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Parser);

    if (UA === void 0 || UA === null || UA === '') {
      throw new Error("UserAgent parameter can't be empty");
    }

    this._ua = UA;
    /**
     * @typedef ParsedResult
     * @property {Object} browser
     * @property {String|undefined} [browser.name]
     * Browser name, like `"Chrome"` or `"Internet Explorer"`
     * @property {String|undefined} [browser.version] Browser version as a String `"12.01.45334.10"`
     * @property {Object} os
     * @property {String|undefined} [os.name] OS name, like `"Windows"` or `"macOS"`
     * @property {String|undefined} [os.version] OS version, like `"NT 5.1"` or `"10.11.1"`
     * @property {String|undefined} [os.versionName] OS name, like `"XP"` or `"High Sierra"`
     * @property {Object} platform
     * @property {String|undefined} [platform.type]
     * platform type, can be either `"desktop"`, `"tablet"` or `"mobile"`
     * @property {String|undefined} [platform.vendor] Vendor of the device,
     * like `"Apple"` or `"Samsung"`
     * @property {String|undefined} [platform.model] Device model,
     * like `"iPhone"` or `"Kindle Fire HD 7"`
     * @property {Object} engine
     * @property {String|undefined} [engine.name]
     * Can be any of this: `WebKit`, `Blink`, `Gecko`, `Trident`, `Presto`, `EdgeHTML`
     * @property {String|undefined} [engine.version] String version of the engine
     */

    this.parsedResult = {};

    if (skipParsing !== true) {
      this.parse();
    }
  }
  /**
   * Get UserAgent string of current Parser instance
   * @return {String} User-Agent String of the current <Parser> object
   *
   * @public
   */


  _createClass(Parser, [{
    key: "getUA",
    value: function getUA() {
      return this._ua;
    }
    /**
     * Test a UA string for a regexp
     * @param {RegExp} regex
     * @return {Boolean}
     */

  }, {
    key: "test",
    value: function test(regex) {
      return regex.test(this._ua);
    }
    /**
     * Get parsed browser object
     * @return {Object}
     */

  }, {
    key: "parseBrowser",
    value: function parseBrowser() {
      var _this = this;

      this.parsedResult.browser = {};
      var browserDescriptor = Utils.find(browsersList, function (_browser) {
        if (typeof _browser.test === 'function') {
          return _browser.test(_this);
        }

        if (_browser.test instanceof Array) {
          return _browser.test.some(function (condition) {
            return _this.test(condition);
          });
        }

        throw new Error("Browser's test function is not valid");
      });

      if (browserDescriptor) {
        this.parsedResult.browser = browserDescriptor.describe(this.getUA());
      }

      return this.parsedResult.browser;
    }
    /**
     * Get parsed browser object
     * @return {Object}
     *
     * @public
     */

  }, {
    key: "getBrowser",
    value: function getBrowser() {
      if (this.parsedResult.browser) {
        return this.parsedResult.browser;
      }

      return this.parseBrowser();
    }
    /**
     * Get browser's name
     * @return {String} Browser's name or an empty string
     *
     * @public
     */

  }, {
    key: "getBrowserName",
    value: function getBrowserName(toLowerCase) {
      if (toLowerCase) {
        return String(this.getBrowser().name).toLowerCase() || '';
      }

      return this.getBrowser().name || '';
    }
    /**
     * Get browser's version
     * @return {String} version of browser
     *
     * @public
     */

  }, {
    key: "getBrowserVersion",
    value: function getBrowserVersion() {
      return this.getBrowser().version;
    }
    /**
     * Get OS
     * @return {Object}
     *
     * @example
     * this.getOS();
     * {
     *   name: 'macOS',
     *   version: '10.11.12'
     * }
     */

  }, {
    key: "getOS",
    value: function getOS() {
      if (this.parsedResult.os) {
        return this.parsedResult.os;
      }

      return this.parseOS();
    }
    /**
     * Parse OS and save it to this.parsedResult.os
     * @return {*|{}}
     */

  }, {
    key: "parseOS",
    value: function parseOS() {
      var _this2 = this;

      this.parsedResult.os = {};
      var os = Utils.find(osParsersList, function (_os) {
        if (typeof _os.test === 'function') {
          return _os.test(_this2);
        }

        if (_os.test instanceof Array) {
          return _os.test.some(function (condition) {
            return _this2.test(condition);
          });
        }

        throw new Error("Browser's test function is not valid");
      });

      if (os) {
        this.parsedResult.os = os.describe(this.getUA());
      }

      return this.parsedResult.os;
    }
    /**
     * Get OS name
     * @param {Boolean} [toLowerCase] return lower-cased value
     * @return {String} name of the OS — macOS, Windows, Linux, etc.
     */

  }, {
    key: "getOSName",
    value: function getOSName(toLowerCase) {
      var _this$getOS = this.getOS(),
          name = _this$getOS.name;

      if (toLowerCase) {
        return String(name).toLowerCase() || '';
      }

      return name || '';
    }
    /**
     * Get OS version
     * @return {String} full version with dots ('10.11.12', '5.6', etc)
     */

  }, {
    key: "getOSVersion",
    value: function getOSVersion() {
      return this.getOS().version;
    }
    /**
     * Get parsed platform
     * @return {{}}
     */

  }, {
    key: "getPlatform",
    value: function getPlatform() {
      if (this.parsedResult.platform) {
        return this.parsedResult.platform;
      }

      return this.parsePlatform();
    }
    /**
     * Get platform name
     * @param {Boolean} [toLowerCase=false]
     * @return {*}
     */

  }, {
    key: "getPlatformType",
    value: function getPlatformType() {
      var toLowerCase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var _this$getPlatform = this.getPlatform(),
          type = _this$getPlatform.type;

      if (toLowerCase) {
        return String(type).toLowerCase() || '';
      }

      return type || '';
    }
    /**
     * Get parsed platform
     * @return {{}}
     */

  }, {
    key: "parsePlatform",
    value: function parsePlatform() {
      var _this3 = this;

      this.parsedResult.platform = {};
      var platform = Utils.find(platformParsersList, function (_platform) {
        if (typeof _platform.test === 'function') {
          return _platform.test(_this3);
        }

        if (_platform.test instanceof Array) {
          return _platform.test.some(function (condition) {
            return _this3.test(condition);
          });
        }

        throw new Error("Browser's test function is not valid");
      });

      if (platform) {
        this.parsedResult.platform = platform.describe(this.getUA());
      }

      return this.parsedResult.platform;
    }
    /**
     * Get parsed engine
     * @return {{}}
     */

  }, {
    key: "getEngine",
    value: function getEngine() {
      if (this.parsedResult.engine) {
        return this.parsedResult.engine;
      }

      return this.parseEngine();
    }
    /**
     * Get engines's name
     * @return {String} Engines's name or an empty string
     *
     * @public
     */

  }, {
    key: "getEngineName",
    value: function getEngineName(toLowerCase) {
      if (toLowerCase) {
        return String(this.getEngine().name).toLowerCase() || '';
      }

      return this.getEngine().name || '';
    }
    /**
     * Get parsed platform
     * @return {{}}
     */

  }, {
    key: "parseEngine",
    value: function parseEngine() {
      var _this4 = this;

      this.parsedResult.engine = {};
      var engine = Utils.find(enginesParsersList, function (_engine) {
        if (typeof _engine.test === 'function') {
          return _engine.test(_this4);
        }

        if (_engine.test instanceof Array) {
          return _engine.test.some(function (condition) {
            return _this4.test(condition);
          });
        }

        throw new Error("Browser's test function is not valid");
      });

      if (engine) {
        this.parsedResult.engine = engine.describe(this.getUA());
      }

      return this.parsedResult.engine;
    }
    /**
     * Parse full information about the browser
     */

  }, {
    key: "parse",
    value: function parse() {
      this.parseBrowser();
      this.parseOS();
      this.parsePlatform();
      this.parseEngine();
      return this;
    }
    /**
     * Get parsed result
     * @return {ParsedResult}
     */

  }, {
    key: "getResult",
    value: function getResult() {
      return Utils.assign({}, this.parsedResult);
    }
    /**
     * Check if parsed browser matches certain conditions
     *
     * @param {Object} checkTree It's one or two layered object,
     * which can include a platform or an OS on the first layer
     * and should have browsers specs on the bottom-laying layer
     *
     * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
     * Returns `undefined` when the browser is no described in the checkTree object.
     *
     * @example
     * const browser = Bowser.getParser(window.navigator.userAgent);
     * if (browser.satisfies({chrome: '>118.01.1322' }))
     * // or with os
     * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
     * // or with platforms
     * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
     */

  }, {
    key: "satisfies",
    value: function satisfies(checkTree) {
      var _this5 = this;

      var platformsAndOSes = {};
      var platformsAndOSCounter = 0;
      var browsers = {};
      var browsersCounter = 0;
      var allDefinitions = Object.keys(checkTree);
      allDefinitions.forEach(function (key) {
        var currentDefinition = checkTree[key];

        if (typeof currentDefinition === 'string') {
          browsers[key] = currentDefinition;
          browsersCounter += 1;
        } else if (_typeof(currentDefinition) === 'object') {
          platformsAndOSes[key] = currentDefinition;
          platformsAndOSCounter += 1;
        }
      });

      if (platformsAndOSCounter > 0) {
        var platformsAndOSNames = Object.keys(platformsAndOSes);
        var OSMatchingDefinition = Utils.find(platformsAndOSNames, function (name) {
          return _this5.isOS(name);
        });

        if (OSMatchingDefinition) {
          var osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);

          if (osResult !== void 0) {
            return osResult;
          }
        }

        var platformMatchingDefinition = Utils.find(platformsAndOSNames, function (name) {
          return _this5.isPlatform(name);
        });

        if (platformMatchingDefinition) {
          var platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);

          if (platformResult !== void 0) {
            return platformResult;
          }
        }
      }

      if (browsersCounter > 0) {
        var browserNames = Object.keys(browsers);
        var matchingDefinition = Utils.find(browserNames, function (name) {
          return _this5.isBrowser(name, true);
        });

        if (matchingDefinition !== void 0) {
          return this.compareVersion(browsers[matchingDefinition]);
        }
      }

      return undefined;
    }
    /**
     * Check if the browser name equals the passed string
     * @param browserName The string to compare with the browser name
     * @param [includingAlias=false] The flag showing whether alias will be included into comparison
     * @returns {boolean}
     */

  }, {
    key: "isBrowser",
    value: function isBrowser(browserName) {
      var includingAlias = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var defaultBrowserName = this.getBrowserName().toLowerCase();
      var browserNameLower = browserName.toLowerCase();
      var alias = Utils.getBrowserTypeByAlias(browserNameLower);

      if (includingAlias && alias) {
        browserNameLower = alias.toLowerCase();
      }

      return browserNameLower === defaultBrowserName;
    }
  }, {
    key: "compareVersion",
    value: function compareVersion(version) {
      var expectedResults = [0];
      var comparableVersion = version;
      var isLoose = false;
      var currentBrowserVersion = this.getBrowserVersion();

      if (typeof currentBrowserVersion !== 'string') {
        return void 0;
      }

      if (version[0] === '>' || version[0] === '<') {
        comparableVersion = version.substr(1);

        if (version[1] === '=') {
          isLoose = true;
          comparableVersion = version.substr(2);
        } else {
          expectedResults = [];
        }

        if (version[0] === '>') {
          expectedResults.push(1);
        } else {
          expectedResults.push(-1);
        }
      } else if (version[0] === '=') {
        comparableVersion = version.substr(1);
      } else if (version[0] === '~') {
        isLoose = true;
        comparableVersion = version.substr(1);
      }

      return expectedResults.indexOf(Utils.compareVersions(currentBrowserVersion, comparableVersion, isLoose)) > -1;
    }
  }, {
    key: "isOS",
    value: function isOS(osName) {
      return this.getOSName(true) === String(osName).toLowerCase();
    }
  }, {
    key: "isPlatform",
    value: function isPlatform(platformType) {
      return this.getPlatformType(true) === String(platformType).toLowerCase();
    }
  }, {
    key: "isEngine",
    value: function isEngine(engineName) {
      return this.getEngineName(true) === String(engineName).toLowerCase();
    }
    /**
     * Is anything? Check if the browser is called "anything",
     * the OS called "anything" or the platform called "anything"
     * @param {String} anything
     * @returns {Boolean}
     */

  }, {
    key: "is",
    value: function is(anything) {
      return this.isBrowser(anything) || this.isOS(anything) || this.isPlatform(anything);
    }
    /**
     * Check if any of the given values satisfies this.is(anything)
     * @param {String[]} anythings
     * @returns {Boolean}
     */

  }, {
    key: "some",
    value: function some() {
      var _this6 = this;

      var anythings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return anythings.some(function (anything) {
        return _this6.is(anything);
      });
    }
  }]);

  return Parser;
}();

/**
 * Bowser class.
 * Keep it simple as much as it can be.
 * It's supposed to work with collections of {@link Parser} instances
 * rather then solve one-instance problems.
 * All the one-instance stuff is located in Parser class.
 *
 * @class
 * @classdesc Bowser is a static object, that provides an API to the Parsers
 * @hideconstructor
 */

var Bowser = /*#__PURE__*/function () {
  function Bowser() {
    _classCallCheck(this, Bowser);
  }

  _createClass(Bowser, null, [{
    key: "getParser",

    /**
     * Creates a {@link Parser} instance
     *
     * @param {String} UA UserAgent string
     * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
     * explicitly. Same as `skipParsing` for {@link Parser}.
     * @returns {Parser}
     * @throws {Error} when UA is not a String
     *
     * @example
     * const parser = Bowser.getParser(window.navigator.userAgent);
     * const result = parser.getResult();
     */
    value: function getParser(UA) {
      var skipParsing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (typeof UA !== 'string') {
        throw new Error('UserAgent should be a string');
      }

      return new Parser(UA, skipParsing);
    }
    /**
     * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
     *
     * @param UA
     * @return {ParsedResult}
     *
     * @example
     * const result = Bowser.parse(window.navigator.userAgent);
     */

  }, {
    key: "parse",
    value: function parse(UA) {
      return new Parser(UA).getResult();
    }
  }, {
    key: "BROWSER_MAP",
    get: function get() {
      return BROWSER_MAP;
    }
  }, {
    key: "ENGINE_MAP",
    get: function get() {
      return ENGINE_MAP;
    }
  }, {
    key: "OS_MAP",
    get: function get() {
      return OS_MAP;
    }
  }, {
    key: "PLATFORMS_MAP",
    get: function get() {
      return PLATFORMS_MAP;
    }
  }]);

  return Bowser;
}();

window.BOWSER = Bowser;
function deviceInfo () {
  var ua = navigator.userAgent;
  var browser = Bowser.getParser(ua);
  var flag;
  if (browser.satisfies({
    chrome: '>=0',
    chromium: '>=0'
  })) flag = 'chrome';else if (browser.satisfies({
    firefox: '>=0'
  })) flag = 'firefox';else if (browser.satisfies({
    safari: '>=0'
  })) flag = 'safari';else if (browser.satisfies({
    opera: '>=0'
  })) flag = 'opera';else if (browser.satisfies({
    'microsoft edge': '>=0'
  })) flag = 'edge';else flag = 'unknown';
  return {
    flag: flag,
    name: browser.getBrowserName(),
    version: browser.getBrowserVersion()
  };
}

function registerFunctions$1(_ref) {
  var app = _ref.app,
      store = _ref.store;

  /**
   * @method
   * @name getMe
   * @returns {Object}
   */
  app.$zeyeClient.getMe = function () {
    return store.state.zeyeClient.me;
  };
  /**
   * @method
   * @param peerId?
   * @param displayName?
   * @returns {void}
   */


  app.$zeyeClient.setMe = function (peerId, displayName) {
    peerId = peerId !== undefined ? peerId : randomString(6);
    displayName = displayName !== undefined ? displayName : randomName();
    store.commit('zeyeClient/me/setMe', {
      peerId: peerId,
      displayName: displayName,
      device: deviceInfo()
    });
  };
  /**
   * @method
   * @name getWebcamState
   * @returns {string}
   */


  app.$zeyeClient.getWebcamState = function () {
    var webcamState;

    if (!app.$zeyeClient.getMe().canSendWebcam) {
      webcamState = 'unsupported';
    } else if (app.$zeyeClient.getVideoProducer() && app.$zeyeClient.getVideoProducer().type !== 'share') {
      webcamState = 'on';
    } else {
      webcamState = 'off';
    }

    return webcamState;
  };
  /**
   * @method
   * @name canIChangeWebcam
   * @returns {boolean}
   */


  app.$zeyeClient.canIChangeWebcam = function () {
    return app.$zeyeClient.getVideoProducer() && app.$zeyeClient.getVideoProducer().type !== 'share' && app.$zeyeClient.getMe().canChangeWebcam;
  };
  /**
   * @method
   * @name getScreenShareState
   * @returns {string}
   */


  app.$zeyeClient.getScreenShareState = function () {
    return app.$zeyeClient.getVideoProducer() && app.$zeyeClient.getVideoProducer().type === 'share' ? 'on' : 'off';
  };
  /**
   * @method
   * @name getMicAvailability
   * @returns {string}
   */


  app.$zeyeClient.getMicState = function () {
    var micState;

    if (!app.$zeyeClient.getMe().canSendMic) {
      micState = 'unsupported';
    } else if (!app.$zeyeClient.getAudioProducer()) {
      micState = 'unsupported';
    } else if (!app.$zeyeClient.getAudioProducer().paused) {
      micState = 'on';
    } else {
      micState = 'off';
    }

    return micState;
  };
  /**
   * @method
   * @name toggleWebcam
   */


  app.$zeyeClient.toggleWebcam = function () {
    if (app.$zeyeClient.getWebcamState() === 'on') {
      setDevices({
        webcamEnabled: false
      });
      app.$zeyeClient.disableWebcam();
    } else {
      setDevices({
        webcamEnabled: true
      });
      app.$zeyeClient.enableWebcam();
    }
  };
  /**
   * @method
   * @name toggleShare
   */


  app.$zeyeClient.toggleShare = function () {
    if (app.$zeyeClient.getScreenShareState() === 'on') {
      app.$zeyeClient.disableShare();
    } else {
      app.$zeyeClient.enableShare();
    }
  };
  /**
   * @method
   * @name toggleMicState
   */


  app.$zeyeClient.toggleMicState = function () {
    app.$zeyeClient.getMicState() === 'on' ? app.$zeyeClient.muteMic() : app.$zeyeClient.unmuteMic();
  };
}

function registerFunctions$2(_ref) {
  var app = _ref.app,
      store = _ref.store;

  /**
   * @method
   * @name isConnected
   * @returns {string}
   */
  app.$zeyeClient.isConnected = function () {
    return store.state.zeyeClient.room.state === 'connected';
  };
  /**
   * @method
   * @name getGlobalAudioMuted
   * @returns {string}
   */


  app.$zeyeClient.getGlobalAudioMuted = function () {
    return store.state.zeyeClient.me.audioMuted;
  };
  /**
   * @method
   * @name getGlobalVideoMuted
   * @returns {string}
   */


  app.$zeyeClient.getVideoVisible = function (peerId) {
    return Boolean(app.$zeyeClient.getVideoConsumer(peerId)) && !app.$zeyeClient.getVideoConsumer(peerId).locallyPaused && !app.$zeyeClient.getVideoConsumer(peerId).remotelyPaused;
  };
}

function registerFunctions$3(_ref) {
  var app = _ref.app,
      store = _ref.store;

  /**
   * @method
   * @name getProducers
   * @returns {Object}
   */
  app.$zeyeClient.getProducers = function () {
    return store.state.zeyeClient.producers.producers;
  };
  /**
   * @method
   * @name getAudioProducer
   * @returns {Object}
   */


  app.$zeyeClient.getAudioProducer = function () {
    return app.$zeyeClient.getProducers().find(function (producer) {
      return producer.track.kind === 'audio';
    });
  };
  /**
   * @method
   * @name getVideoProducer
   * @returns {Object}
   */


  app.$zeyeClient.getVideoProducer = function () {
    return app.$zeyeClient.getProducers().find(function (producer) {
      return producer.track.kind === 'video';
    });
  };
}

function registerFunctions$4(_ref) {
  var app = _ref.app,
      store = _ref.store;

  /**
   * @method
   * @name getPeers
   * @returns {Array}
   */
  app.$zeyeClient.getPeers = function () {
    return store.state.zeyeClient.peers.peers;
  };
  /**
   * @method
   * @name getPeers
   * @param peerId
   * @returns {Array}
   */


  app.$zeyeClient.getPeer = function (peerId) {
    return store.state.zeyeClient.peers.peers.find(function (peer) {
      return peer.id === peerId;
    });
  };
}

function registerFunctions$5(_ref) {
  var app = _ref.app,
      store = _ref.store;

  /**
   * @method
   * @name getConsumers
   * @returns {Array}
   */
  app.$zeyeClient.getConsumers = function () {
    return store.state.zeyeClient.consumers.consumers;
  };
  /**
   * @method
   * @param peerId
   * @returns {*}
   */


  app.$zeyeClient.getAudioConsumer = function (peerId) {
    var consumersArray = app.$zeyeClient.getPeer(peerId).consumers.map(function (consumerId) {
      return store.state.zeyeClient.consumers.consumers.find(function (consumer) {
        return consumer.id === consumerId;
      });
    });
    return consumersArray.filter(function (consumer) {
      return !!consumer;
    }).find(function (consumer) {
      return consumer.track.kind === 'audio';
    });
  };
  /**
   * @method
   * @param peerId
   * @returns {*}
   */


  app.$zeyeClient.getVideoConsumer = function (peerId) {
    var consumersArray = app.$zeyeClient.getPeer(peerId).consumers.map(function (consumerId) {
      return store.state.zeyeClient.consumers.consumers.find(function (consumer) {
        return consumer.id === consumerId;
      });
    });
    return consumersArray.filter(function (consumer) {
      return !!consumer;
    }).find(function (consumer) {
      return consumer.track.kind === 'video';
    });
  };
}

function registerFunctions$6(_ref) {
  var app = _ref.app,
      store = _ref.store;
  registerFunctions({
    app: app,
    store: store
  });
  registerFunctions$1({
    app: app,
    store: store
  });
  registerFunctions$2({
    app: app,
    store: store
  });
  registerFunctions$3({
    app: app,
    store: store
  });
  registerFunctions$5({
    app: app,
    store: store
  });
  registerFunctions$4({
    app: app,
    store: store
  });
}
/**
 ** In case you`ll ever need computed property
 **

 Object.defineProperties(app.$zeyeClient, {
    amIActiveSpeaker: {
      get() {
        return (
          store.state.zeyeClient.me.id ===
          store.state.zeyeClient.room.activeSpeakerId
        )
      }
    }
  })
*/

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

function getProtooUrl(_ref) {
  var roomId = _ref.roomId,
      peerId = _ref.peerId,
      forceH264 = _ref.forceH264,
      forceVP9 = _ref.forceVP9,
      hostname = _ref.hostname,
      protooPort = _ref.protooPort;
  hostname = hostname !== undefined ? hostname : 'localhost';
  protooPort = protooPort !== undefined ? protooPort : '4443';
  var url = "wss://".concat(hostname, ":").concat(protooPort, "/?roomId=").concat(roomId, "&peerId=").concat(peerId);
  if (forceH264) url = "".concat(url, "&forceH264=true");else if (forceVP9) url = "".concat(url, "&forceVP9=true");
  return url;
}

var VIDEO_CONSTRAINS = {
  qvga: {
    width: {
      ideal: 320
    },
    height: {
      ideal: 240
    }
  },
  vga: {
    width: {
      ideal: 640
    },
    height: {
      ideal: 480
    }
  },
  hd: {
    width: {
      ideal: 1280
    },
    height: {
      ideal: 720
    }
  }
};
var PC_PROPRIETARY_CONSTRAINTS = {
  optional: [{
    googDscp: true
  }]
};
var VIDEO_SIMULCAST_ENCODINGS = [{
  scaleResolutionDownBy: 4
}, {
  scaleResolutionDownBy: 2
}, {
  scaleResolutionDownBy: 1
}]; // Used for VP9 webcam video.

var VIDEO_KSVC_ENCODINGS = [{
  scalabilityMode: 'S3T3_KEY'
}]; // Used for VP9 desktop sharing.

var VIDEO_SVC_ENCODINGS = [{
  scalabilityMode: 'S3T3',
  dtx: true
}];

var ZeyeClient = /*#__PURE__*/function () {
  function ZeyeClient(_ref) {
    var store = _ref.store;

    _classCallCheck(this, ZeyeClient);

    // Vue Store
    this.store = store; // Closed flag.
    // @type {Boolean}

    this._closed = false; // Whether we want to produce audio/video.
    // @type {Boolean}

    this._produce = true; // Whether we should consume.
    // @type {Boolean}

    this._consume = true; // Whether we want DataChannels.
    // @type {Boolean}

    this._useDataChannel = true; // External video.
    // @type {HTMLVideoElement}

    this._externalVideo = null; // MediaStream of the external video.
    // @type {MediaStream}

    this._externalVideoStream = null; // Next expected dataChannel test _useDataChannelnumber.
    // @type {Number}

    this._nextDataChannelTestNumber = 0; // Protoo URL.
    // @type {String}

    this._protooUrl = null; // protoo-client Peer instance.
    // @type {protooClient.Peer}

    this._protoo = null; // mediasoup-client Device instance.
    // @type {mediasoupClient.Device}

    this._mediasoupDevice = null; // mediasoup Transport for sending.
    // @type {mediasoupClient.Transport}

    this._sendTransport = null; // mediasoup Transport for receiving.
    // @type {mediasoupClient.Transport}

    this._recvTransport = null; // Local mic mediasoup Producer.
    // @type {mediasoupClient.Producer}

    this._micProducer = null; // Local webcam mediasoup Producer.
    // @type {mediasoupClient.Producer}

    this._webcamProducer = null; // Local share mediasoup Producer.
    // @type {mediasoupClient.Producer}

    this._shareProducer = null; // Local chat DataProducer.
    // @type {mediasoupClient.DataProducer}

    this._chatDataProducer = null; // Local bot DataProducer.
    // @type {mediasoupClient.DataProducer}

    this._botDataProducer = null; // mediasoup Consumers.
    // @type {Map<String, mediasoupClient.Consumer>}

    this._consumers = new Map(); // mediasoup DataConsumers.
    // @type {Map<String, mediasoupClient.DataConsumer>}

    this._dataConsumers = new Map(); // Map of webcam MediaDeviceInfos indexed by deviceId.
    // @type {Map<String, MediaDeviceInfos>}

    this._webcams = new Map(); // Local Webcam.
    // @type {Object} with:
    // - {MediaDeviceInfo} [device]
    // - {String} [resolution] - 'qvga' / 'vga' / 'hd'.

    this._webcam = {
      device: null,
      resolution: 'hd'
    };
  }

  _createClass(ZeyeClient, [{
    key: "close",
    value: function close() {
      if (this._closed) return;
      this._closed = true;
      console.debug('close()'); // Close protoo Peer

      this._protoo.close(); // Close mediasoup Transports.


      if (this._sendTransport) this._sendTransport.close();
      if (this._recvTransport) this._recvTransport.close();
      this.store.commit('zeyeClient/room/setRoomState', {
        state: 'closed'
      });
    }
    /**
     *
     * @param roomId
     * @param peerId
     * @param displayName
     * @param forceH264
     * @param forceVP9
     * @param hostname
     * @param protooPort
     */

  }, {
    key: "join",
    value: function join(_ref2) {
      var _this = this;

      var roomId = _ref2.roomId,
          peerId = _ref2.peerId,
          displayName = _ref2.displayName,
          forceH264 = _ref2.forceH264,
          forceVP9 = _ref2.forceVP9,
          hostname = _ref2.hostname,
          protooPort = _ref2.protooPort;
      forceH264 = forceH264 !== undefined ? forceH264 : false;
      forceVP9 = forceVP9 !== undefined ? forceVP9 : false;
      hostname = hostname !== undefined ? hostname : false;
      protooPort = protooPort !== undefined ? protooPort : false;
      this._displayName = displayName !== undefined ? displayName : randomName();
      this._protooUrl = getProtooUrl({
        roomId: roomId,
        peerId: peerId,
        forceH264: forceH264,
        forceVP9: forceVP9,
        hostname: hostname,
        protooPort: protooPort
      });
      var protooTransport = new protooClient.WebSocketTransport(this._protooUrl);
      this._protoo = new protooClient.Peer(protooTransport);
      this.store.commit('zeyeClient/room/setRoomState', {
        state: 'connecting'
      });

      this._protoo.on('open', function () {
        return _this._joinRoom();
      });

      this._protoo.on('failed', function () {
        _this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: 'WebSocket connection failed'
        });
      });

      this._protoo.on('disconnected', function () {
        _this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: 'WebSocket disconnected'
        }); // Close mediasoup Transports.


        if (_this._sendTransport) {
          _this._sendTransport.close();

          _this._sendTransport = null;
        }

        if (_this._recvTransport) {
          _this._recvTransport.close();

          _this._recvTransport = null;
        }

        _this.store.commit('zeyeClient/room/setRoomState', {
          state: 'closed'
        });
      });

      this._protoo.on('close', function () {
        if (_this._closed) return;

        _this.close();
      }); // eslint-disable-next-line no-unused-vars


      this._protoo.on('request', /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(request, accept, reject) {
          var _request$data, _peerId2, producerId, id, kind, rtpParameters, type, appData, producerPaused, consumer, _mediasoupClient$pars, spatialLayers, temporalLayers, _request$data2, _peerId3, dataProducerId, _id, sctpStreamParameters, label, protocol, _appData, dataConsumer;

          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.debug('proto "request" event [method:%s, data:%o]', request.method, request.data);
                  _context.t0 = request.method;
                  _context.next = _context.t0 === 'newConsumer' ? 4 : _context.t0 === 'newDataConsumer' ? 27 : 56;
                  break;

                case 4:
                  if (_this._consume) {
                    _context.next = 7;
                    break;
                  }

                  reject(403, 'I do not want to consume');
                  return _context.abrupt("break", 56);

                case 7:
                  _request$data = request.data, _peerId2 = _request$data.peerId, producerId = _request$data.producerId, id = _request$data.id, kind = _request$data.kind, rtpParameters = _request$data.rtpParameters, type = _request$data.type, appData = _request$data.appData, producerPaused = _request$data.producerPaused;
                  _context.prev = 8;
                  _context.next = 11;
                  return _this._recvTransport.consume({
                    id: id,
                    producerId: producerId,
                    kind: kind,
                    rtpParameters: rtpParameters,
                    appData: _objectSpread2({}, appData, {
                      peerId: _peerId2
                    }) // Trick.

                  });

                case 11:
                  consumer = _context.sent;

                  // Store in the map.
                  _this._consumers.set(consumer.id, consumer);

                  consumer.on('transportclose', function () {
                    _this._consumers.delete(consumer.id);
                  });
                  _mediasoupClient$pars = parseScalabilityMode(consumer.rtpParameters.encodings[0].scalabilityMode), spatialLayers = _mediasoupClient$pars.spatialLayers, temporalLayers = _mediasoupClient$pars.temporalLayers;

                  _this.store.commit('zeyeClient/peers/addConsumer', {
                    consumer: {
                      id: consumer.id
                    },
                    peerId: _peerId2
                  });

                  _this.store.commit('zeyeClient/consumers/addConsumer', {
                    consumer: {
                      id: consumer.id,
                      type: type,
                      locallyPaused: false,
                      remotelyPaused: producerPaused,
                      rtpParameters: consumer.rtpParameters,
                      spatialLayers: spatialLayers,
                      temporalLayers: temporalLayers,
                      preferredSpatialLayer: spatialLayers - 1,
                      preferredTemporalLayer: temporalLayers - 1,
                      priority: 1,
                      codec: consumer.rtpParameters.codecs[0].mimeType.split('/')[1],
                      track: consumer.track
                    }
                  }); // We are ready. Answer the protoo request so the server will
                  // resume this Consumer (which was paused for now if video).


                  accept(); // If audio-only mode is enabled, pause it.

                  if (consumer.kind === 'video' && _this.store.state.zeyeClient.me.audioOnly) _this._pauseConsumer(consumer);
                  _context.next = 26;
                  break;

                case 21:
                  _context.prev = 21;
                  _context.t1 = _context["catch"](8);
                  console.error('"newConsumer" request failed:%o', _context.t1);

                  _this.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: "Error creating a Consumer: ".concat(_context.t1)
                  });

                  throw _context.t1;

                case 26:
                  return _context.abrupt("break", 56);

                case 27:
                  if (_this._consume) {
                    _context.next = 30;
                    break;
                  }

                  reject(403, 'I do not want to data consume');
                  return _context.abrupt("break", 56);

                case 30:
                  if (_this._useDataChannel) {
                    _context.next = 33;
                    break;
                  }

                  reject(403, 'I do not want DataChannels');
                  return _context.abrupt("break", 56);

                case 33:
                  _request$data2 = request.data, _peerId3 = _request$data2.peerId, dataProducerId = _request$data2.dataProducerId, _id = _request$data2.id, sctpStreamParameters = _request$data2.sctpStreamParameters, label = _request$data2.label, protocol = _request$data2.protocol, _appData = _request$data2.appData;
                  _context.prev = 34;
                  _context.next = 37;
                  return _this._recvTransport.consumeData({
                    id: _id,
                    dataProducerId: dataProducerId,
                    sctpStreamParameters: sctpStreamParameters,
                    label: label,
                    protocol: protocol,
                    appData: _objectSpread2({}, _appData, {
                      peerId: _peerId3
                    }) // Trick.

                  });

                case 37:
                  dataConsumer = _context.sent;

                  // Store in the map.
                  _this._dataConsumers.set(dataConsumer.id, dataConsumer);

                  dataConsumer.on('transportclose', function () {
                    _this._dataConsumers.delete(dataConsumer.id);
                  });
                  dataConsumer.on('open', function () {
                    console.debug('DataConsumer "open" event');
                  });
                  dataConsumer.on('close', function () {
                    console.warn('DataConsumer "close" event');

                    _this._dataConsumers.delete(dataConsumer.id);

                    _this.store.dispatch('zeyeClient/notify', {
                      type: 'error',
                      text: 'DataConsumer closed'
                    });
                  });
                  dataConsumer.on('error', function (error) {
                    console.error('DataConsumer "error" event:%o', error);

                    _this.store.dispatch('zeyeClient/notify', {
                      type: 'error',
                      text: "DataConsumer error: ".concat(error)
                    });
                  });
                  dataConsumer.on('message', function (message) {
                    console.debug('DataConsumer "message" event [streamId:%d]', dataConsumer.sctpStreamParameters.streamId); // TODO: For debugging.

                    window.DC_MESSAGE = message;

                    if (message instanceof ArrayBuffer) {
                      var view = new DataView(message);
                      var number = view.getUint32();

                      if (number === Math.pow(2, 32) - 1) {
                        console.warn('dataChannelTest finished!');
                        _this._nextDataChannelTestNumber = 0;
                        return;
                      }

                      if (number > _this._nextDataChannelTestNumber) {
                        console.warn('dataChannelTest: %s packets missing', number - _this._nextDataChannelTestNumber);
                      }

                      _this._nextDataChannelTestNumber = number + 1;
                      return;
                    } else if (typeof message !== 'string') {
                      console.warn('ignoring DataConsumer "message" (not a string)');
                      return;
                    }

                    switch (dataConsumer.label) {
                      case 'chat':
                        {
                          var peers = _this.store.state.peers;
                          var peersArray = Object.keys(peers).map(function (_peerId) {
                            return peers[_peerId];
                          });
                          var sendingPeer = peersArray.find(function (peer) {
                            return peer.dataConsumers.includes(dataConsumer.id);
                          });

                          if (!sendingPeer) {
                            console.warn('DataConsumer "message" from unknown peer');
                            break;
                          }

                          _this.store.dispatch('zeyeClient/notify', {
                            title: "".concat(sendingPeer.displayName, " says:"),
                            text: message,
                            timeout: 5000
                          });

                          break;
                        }

                      case 'bot':
                        {
                          _this.store.dispatch('zeyeClient/notify', {
                            title: 'Message from Bot:',
                            text: message,
                            timeout: 5000
                          });

                          break;
                        }
                    }
                  }); // TODO: REMOVE

                  window.DC = dataConsumer;

                  _this.store.commit('zeyeClient/peers/addDataConsumer', {
                    dataConsumer: {
                      id: dataConsumer.id
                    }
                  });

                  _this.store.commit('zeyeClient/dataConsumers/addDataConsumer', {
                    dataConsumer: {
                      id: dataConsumer.id,
                      sctpStreamParameters: dataConsumer.sctpStreamParameters,
                      label: dataConsumer.label,
                      protocol: dataConsumer.protocol
                    }
                  }); // We are ready. Answer the protoo request.


                  accept();
                  _context.next = 55;
                  break;

                case 50:
                  _context.prev = 50;
                  _context.t2 = _context["catch"](34);
                  console.error('"newDataConsumer" request failed:%o', _context.t2);

                  _this.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: "Error creating a DataConsumer: ".concat(_context.t2)
                  });

                  throw _context.t2;

                case 55:
                  return _context.abrupt("break", 56);

                case 56:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[8, 21], [34, 50]]);
        }));

        return function (_x, _x2, _x3) {
          return _ref3.apply(this, arguments);
        };
      }());

      this._protoo.on('notification', function (notification) {
        console.debug('proto "notification" event [method:%s, data:%o]', notification.method, notification.data);

        switch (notification.method) {
          case 'producerScore':
            {
              var _notification$data = notification.data,
                  producerId = _notification$data.producerId,
                  score = _notification$data.score;

              _this.store.commit('zeyeClient/producers/setProducerScore', {
                producerId: producerId,
                score: score
              });

              break;
            }

          case 'newPeer':
            {
              var peer = notification.data;

              _this.store.commit('zeyeClient/peers/addPeer', {
                peer: _objectSpread2({}, peer, {
                  consumers: [],
                  dataConsumers: []
                })
              });

              _this.store.dispatch('zeyeClient/notify', {
                text: "".concat(peer.displayName, " has joined the room")
              });

              break;
            }

          case 'peerClosed':
            {
              var _peerId4 = notification.data.peerId;

              _this.store.commit('zeyeClient/peers/removePeer', {
                peerId: _peerId4
              });

              break;
            }

          case 'peerDisplayNameChanged':
            {
              var _notification$data2 = notification.data,
                  _peerId5 = _notification$data2.peerId,
                  _displayName = _notification$data2.displayName,
                  oldDisplayName = _notification$data2.oldDisplayName;

              _this.store.commit('zeyeClient/peers/setPeerDisplayName', {
                displayName: _displayName,
                peerId: _peerId5
              });

              _this.store.dispatch('zeyeClient/notify', {
                text: "".concat(oldDisplayName, " is now ").concat(_displayName)
              });

              break;
            }

          case 'consumerClosed':
            {
              var consumerId = notification.data.consumerId;

              var consumer = _this._consumers.get(consumerId);

              if (!consumer) break;
              consumer.close();

              _this._consumers.delete(consumerId);

              var _peerId6 = consumer.appData.peerId; // TODO: probably move peer removers\adders into consumer removers\adders

              _this.store.commit('zeyeClient/peers/removeConsumer', {
                consumerId: consumerId,
                peerId: _peerId6
              });

              _this.store.commit('zeyeClient/consumers/removeConsumer', {
                consumerId: consumerId,
                peerId: _peerId6
              });

              break;
            }

          case 'consumerPaused':
            {
              var _consumerId = notification.data.consumerId;

              var _consumer = _this._consumers.get(_consumerId);

              if (!_consumer) break;

              _this.store.commit('zeyeClient/consumers/setConsumerPaused', {
                consumerId: _consumerId,
                originator: 'remote'
              });

              break;
            }

          case 'consumerResumed':
            {
              var _consumerId2 = notification.data.consumerId;

              var _consumer2 = _this._consumers.get(_consumerId2);

              if (!_consumer2) break;

              _this.store.commit('zeyeClient/consumers/setConsumerResumed', {
                consumerId: _consumerId2,
                originator: 'remote'
              });

              break;
            }

          case 'consumerLayersChanged':
            {
              var _notification$data3 = notification.data,
                  _consumerId3 = _notification$data3.consumerId,
                  spatialLayer = _notification$data3.spatialLayer,
                  temporalLayer = _notification$data3.temporalLayer;

              var _consumer3 = _this._consumers.get(_consumerId3);

              if (!_consumer3) break;

              _this.store.commit('zeyeClient/consumers/setConsumerCurrentLayers', {
                consumerId: _consumerId3,
                spatialLayer: spatialLayer,
                temporalLayer: temporalLayer
              });

              break;
            }

          case 'consumerScore':
            {
              var _notification$data4 = notification.data,
                  _consumerId4 = _notification$data4.consumerId,
                  _score = _notification$data4.score;

              _this.store.commit('zeyeClient/consumers/setConsumerScore', {
                consumerId: _consumerId4,
                score: _score
              });

              break;
            }

          case 'dataConsumerClosed':
            {
              var dataConsumerId = notification.data.dataConsumerId;

              var dataConsumer = _this._dataConsumers.get(dataConsumerId);

              if (!dataConsumer) break;
              dataConsumer.close();

              _this._dataConsumers.delete(dataConsumerId);

              var _peerId7 = dataConsumer.appData.peerId;

              _this.store.commit('zeyeClient/dataConsumers/removeDataConsumer', {
                dataConsumerId: dataConsumerId,
                peerId: _peerId7
              });

              break;
            }

          case 'activeSpeaker':
            {
              var _peerId8 = notification.data.peerId;

              _this.store.commit('zeyeClient/room/setRoomActiveSpeaker', {
                peerId: _peerId8
              });

              break;
            }

          default:
            {
              console.error('unknown protoo notification.method "%s"', notification.method);
            }
        }
      });

      this.ready = true;
    }
  }, {
    key: "enableMic",
    value: function () {
      var _enableMic = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        var _this2 = this;

        var track, stream, _stream;

        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.debug('enableMic()');

                if (!this._micProducer) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                if (this._mediasoupDevice.canProduce('audio')) {
                  _context2.next = 6;
                  break;
                }

                console.error('enableMic() | cannot produce audio');
                return _context2.abrupt("return");

              case 6:
                _context2.prev = 6;

                if (this._externalVideo) {
                  _context2.next = 15;
                  break;
                }

                console.debug('enableMic() | calling getUserMedia()');
                _context2.next = 11;
                return navigator.mediaDevices.getUserMedia({
                  audio: true
                });

              case 11:
                stream = _context2.sent;
                track = stream.getAudioTracks()[0];
                _context2.next = 19;
                break;

              case 15:
                _context2.next = 17;
                return this._getExternalVideoStream();

              case 17:
                _stream = _context2.sent;
                track = _stream.getAudioTracks()[0].clone();

              case 19:
                _context2.next = 21;
                return this._sendTransport.produce({
                  track: track,
                  codecOptions: {
                    opusStereo: 1,
                    opusDtx: 1
                  } // NOTE: for testing codec selection.
                  // codec : this._mediasoupDevice.rtpCapabilities.codecs
                  // 	.find((codec) => codec.mimeType.toLowerCase() === 'audio/pcma')

                });

              case 21:
                this._micProducer = _context2.sent;
                this.store.commit('zeyeClient/producers/addProducer', {
                  producer: {
                    id: this._micProducer.id,
                    paused: this._micProducer.paused,
                    track: this._micProducer.track,
                    rtpParameters: this._micProducer.rtpParameters,
                    codec: this._micProducer.rtpParameters.codecs[0].mimeType.split('/')[1]
                  }
                });

                this._micProducer.on('transportclose', function () {
                  _this2._micProducer = null;
                });

                this._micProducer.on('trackended', function () {
                  _this2.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: 'Microphone disconnected!'
                  });

                  _this2.disableMic().catch(function () {});
                });

                _context2.next = 32;
                break;

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2["catch"](6);
                console.error('enableMic() | failed:%o', _context2.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error enabling microphone: ".concat(_context2.t0)
                });
                if (track) track.stop();

              case 32:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 27]]);
      }));

      function enableMic() {
        return _enableMic.apply(this, arguments);
      }

      return enableMic;
    }()
  }, {
    key: "disableMic",
    value: function () {
      var _disableMic = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.debug('disableMic()');

                if (this._micProducer) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return");

              case 3:
                this._micProducer.close();

                this.store.commit('zeyeClient/producers/removeProducer', {
                  producerId: this._micProducer.id
                });
                _context3.prev = 5;
                _context3.next = 8;
                return this._protoo.request('closeProducer', {
                  producerId: this._micProducer.id
                });

              case 8:
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](5);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error closing server-side mic Producer: ".concat(_context3.t0)
                });

              case 13:
                this._micProducer = null;

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 10]]);
      }));

      function disableMic() {
        return _disableMic.apply(this, arguments);
      }

      return disableMic;
    }()
  }, {
    key: "muteMic",
    value: function () {
      var _muteMic = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.debug('muteMic()');

                this._micProducer.pause();

                _context4.prev = 2;
                _context4.next = 5;
                return this._protoo.request('pauseProducer', {
                  producerId: this._micProducer.id
                });

              case 5:
                this.store.commit('zeyeClient/producers/setProducerPaused', {
                  producerId: this._micProducer.id
                });
                _context4.next = 12;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](2);
                console.error('muteMic() | failed: %o', _context4.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error pausing server-side mic Producer: ".concat(_context4.t0)
                });

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 8]]);
      }));

      function muteMic() {
        return _muteMic.apply(this, arguments);
      }

      return muteMic;
    }()
  }, {
    key: "unmuteMic",
    value: function () {
      var _unmuteMic = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5() {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.debug('unmuteMic()');

                this._micProducer.resume();

                _context5.prev = 2;
                _context5.next = 5;
                return this._protoo.request('resumeProducer', {
                  producerId: this._micProducer.id
                });

              case 5:
                this.store.commit('zeyeClient/producers/setProducerResumed', {
                  producerId: this._micProducer.id
                });
                _context5.next = 12;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](2);
                console.error('unmuteMic() | failed: %o', _context5.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error resuming server-side mic Producer: ".concat(_context5.t0)
                });

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 8]]);
      }));

      function unmuteMic() {
        return _unmuteMic.apply(this, arguments);
      }

      return unmuteMic;
    }()
  }, {
    key: "enableWebcam",
    value: function () {
      var _enableWebcam = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        var _this3 = this;

        var track, device, resolution, stream, _stream2, firstVideoCodec, encodings;

        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.debug('enableWebcam()');

                if (!this._webcamProducer) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return");

              case 5:
                if (!this._shareProducer) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 8;
                return this.disableShare();

              case 8:
                if (this._mediasoupDevice.canProduce('video')) {
                  _context6.next = 11;
                  break;
                }

                console.error('enableWebcam() | cannot produce video');
                return _context6.abrupt("return");

              case 11:
                this.store.commit('zeyeClient/me/setWebcamInProgress', {
                  flag: true
                });
                _context6.prev = 12;

                if (this._externalVideo) {
                  _context6.next = 27;
                  break;
                }

                _context6.next = 16;
                return this._updateWebcams();

              case 16:
                device = this._webcam.device;
                resolution = this._webcam.resolution;

                if (device) {
                  _context6.next = 20;
                  break;
                }

                throw new Error('no webcam devices');

              case 20:
                console.debug('enableWebcam() | calling getUserMedia()');
                _context6.next = 23;
                return navigator.mediaDevices.getUserMedia({
                  video: _objectSpread2({
                    deviceId: {
                      ideal: device.deviceId
                    }
                  }, VIDEO_CONSTRAINS[resolution])
                });

              case 23:
                stream = _context6.sent;
                track = stream.getVideoTracks()[0];
                _context6.next = 32;
                break;

              case 27:
                device = {
                  label: 'external video'
                };
                _context6.next = 30;
                return this._getExternalVideoStream();

              case 30:
                _stream2 = _context6.sent;
                track = _stream2.getVideoTracks()[0].clone();

              case 32:
                if (!this._useSimulcast) {
                  _context6.next = 40;
                  break;
                }

                // If VP9 is the only available video codec then use SVC.
                firstVideoCodec = this._mediasoupDevice.rtpCapabilities.codecs.find(function (c) {
                  return c.kind === 'video';
                });
                if (firstVideoCodec.mimeType.toLowerCase() === 'video/vp9') encodings = VIDEO_KSVC_ENCODINGS;else encodings = VIDEO_SIMULCAST_ENCODINGS;
                _context6.next = 37;
                return this._sendTransport.produce({
                  track: track,
                  encodings: encodings,
                  codecOptions: {
                    videoGoogleStartBitrate: 1000
                  } // NOTE: for testing codec selection.
                  // codec : this._mediasoupDevice.rtpCapabilities.codecs
                  // 	.find((codec) => codec.mimeType.toLowerCase() === 'video/h264')

                });

              case 37:
                this._webcamProducer = _context6.sent;
                _context6.next = 43;
                break;

              case 40:
                _context6.next = 42;
                return this._sendTransport.produce({
                  track: track
                });

              case 42:
                this._webcamProducer = _context6.sent;

              case 43:
                this.store.commit('zeyeClient/producers/addProducer', {
                  producer: {
                    id: this._webcamProducer.id,
                    deviceLabel: device.label,
                    type: this._getWebcamType(device),
                    paused: this._webcamProducer.paused,
                    track: this._webcamProducer.track,
                    rtpParameters: this._webcamProducer.rtpParameters,
                    codec: this._webcamProducer.rtpParameters.codecs[0].mimeType.split('/')[1]
                  }
                });

                this._webcamProducer.on('transportclose', function () {
                  _this3._webcamProducer = null;
                });

                this._webcamProducer.on('trackended', function () {
                  _this3.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: 'Webcam disconnected!'
                  });

                  _this3.disableWebcam().catch(function () {});
                });

                _context6.next = 53;
                break;

              case 48:
                _context6.prev = 48;
                _context6.t0 = _context6["catch"](12);
                console.error('enableWebcam() | failed:%o', _context6.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error enabling webcam: ".concat(_context6.t0)
                });
                if (track) track.stop();

              case 53:
                this.store.commit('zeyeClient/me/setWebcamInProgress', {
                  flag: false
                });

              case 54:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[12, 48]]);
      }));

      function enableWebcam() {
        return _enableWebcam.apply(this, arguments);
      }

      return enableWebcam;
    }()
  }, {
    key: "disableWebcam",
    value: function () {
      var _disableWebcam = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
        return regenerator.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                console.debug('disableWebcam()');

                if (this._webcamProducer) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return");

              case 3:
                this._webcamProducer.close();

                this.store.commit('zeyeClient/producers/removeProducer', {
                  producerId: this._webcamProducer.id
                });
                _context7.prev = 5;
                _context7.next = 8;
                return this._protoo.request('closeProducer', {
                  producerId: this._webcamProducer.id
                });

              case 8:
                _context7.next = 13;
                break;

              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](5);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error closing server-side webcam Producer: ".concat(_context7.t0)
                });

              case 13:
                this._webcamProducer = null;

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[5, 10]]);
      }));

      function disableWebcam() {
        return _disableWebcam.apply(this, arguments);
      }

      return disableWebcam;
    }()
  }, {
    key: "changeWebcam",
    value: function () {
      var _changeWebcam = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8() {
        var array, len, deviceId, idx, stream, track;
        return regenerator.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                console.debug('changeWebcam()');
                this.store.commit('zeyeClient/me/setWebcamInProgress', {
                  flag: true
                });
                _context8.prev = 2;
                _context8.next = 5;
                return this._updateWebcams();

              case 5:
                array = Array.from(this._webcams.keys());
                len = array.length;
                deviceId = this._webcam.device ? this._webcam.device.deviceId : undefined;
                idx = array.indexOf(deviceId);
                if (idx < len - 1) idx++;else idx = 0;
                this._webcam.device = this._webcams.get(array[idx]);
                console.debug('changeWebcam() | new selected webcam [device:%o]', this._webcam.device); // Reset video resolution to HD.

                this._webcam.resolution = 'hd';

                if (this._webcam.device) {
                  _context8.next = 15;
                  break;
                }

                throw new Error('no webcam devices');

              case 15:
                // Closing the current video track before asking for a new one (mobiles do not like
                // having both front/back cameras open at the same time).
                this._webcamProducer.track.stop();

                console.debug('changeWebcam() | calling getUserMedia()');
                _context8.next = 19;
                return navigator.mediaDevices.getUserMedia({
                  video: _objectSpread2({
                    deviceId: {
                      exact: this._webcam.device.deviceId
                    }
                  }, VIDEO_CONSTRAINS[this._webcam.resolution])
                });

              case 19:
                stream = _context8.sent;
                track = stream.getVideoTracks()[0];
                _context8.next = 23;
                return this._webcamProducer.replaceTrack({
                  track: track
                });

              case 23:
                this.store.commit('zeyeClient/producers/setProducerTrack', {
                  producerId: this._webcamProducer.id,
                  track: track
                });
                _context8.next = 30;
                break;

              case 26:
                _context8.prev = 26;
                _context8.t0 = _context8["catch"](2);
                console.error('changeWebcam() | failed: %o', _context8.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Could not change webcam: ".concat(_context8.t0)
                });

              case 30:
                this.store.commit('zeyeClient/me/setWebcamInProgress', {
                  flag: false
                });

              case 31:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[2, 26]]);
      }));

      function changeWebcam() {
        return _changeWebcam.apply(this, arguments);
      }

      return changeWebcam;
    }()
  }, {
    key: "changeWebcamResolution",
    value: function () {
      var _changeWebcamResolution = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9() {
        var stream, track;
        return regenerator.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                console.debug('changeWebcamResolution()');
                this.store.commit('zeyeClient/me/setWebcamInProgress', {
                  flag: true
                });
                _context9.prev = 2;
                _context9.t0 = this._webcam.resolution;
                _context9.next = _context9.t0 === 'qvga' ? 6 : _context9.t0 === 'vga' ? 8 : _context9.t0 === 'hd' ? 10 : 12;
                break;

              case 6:
                this._webcam.resolution = 'vga';
                return _context9.abrupt("break", 13);

              case 8:
                this._webcam.resolution = 'hd';
                return _context9.abrupt("break", 13);

              case 10:
                this._webcam.resolution = 'qvga';
                return _context9.abrupt("break", 13);

              case 12:
                this._webcam.resolution = 'hd';

              case 13:
                console.debug('changeWebcamResolution() | calling getUserMedia()');
                _context9.next = 16;
                return navigator.mediaDevices.getUserMedia({
                  video: _objectSpread2({
                    deviceId: {
                      exact: this._webcam.device.deviceId
                    }
                  }, VIDEO_CONSTRAINS[this._webcam.resolution])
                });

              case 16:
                stream = _context9.sent;
                track = stream.getVideoTracks()[0];
                _context9.next = 20;
                return this._webcamProducer.replaceTrack({
                  track: track
                });

              case 20:
                this.store.commit('zeyeClient/producers/setProducerTrack', {
                  producerId: this._webcamProducer.id,
                  track: track
                });
                _context9.next = 27;
                break;

              case 23:
                _context9.prev = 23;
                _context9.t1 = _context9["catch"](2);
                console.error('changeWebcamResolution() | failed: %o', _context9.t1);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Could not change webcam resolution: ".concat(_context9.t1)
                });

              case 27:
                this.store.commit('zeyeClient/me/setWebcamInProgress', {
                  flag: false
                });

              case 28:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[2, 23]]);
      }));

      function changeWebcamResolution() {
        return _changeWebcamResolution.apply(this, arguments);
      }

      return changeWebcamResolution;
    }()
  }, {
    key: "enableShare",
    value: function () {
      var _enableShare = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee10() {
        var _this4 = this;

        var track, stream, firstVideoCodec, encodings;
        return regenerator.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                console.debug('enableShare()');

                if (!this._shareProducer) {
                  _context10.next = 5;
                  break;
                }

                return _context10.abrupt("return");

              case 5:
                if (!this._webcamProducer) {
                  _context10.next = 8;
                  break;
                }

                _context10.next = 8;
                return this.disableWebcam();

              case 8:
                if (this._mediasoupDevice.canProduce('video')) {
                  _context10.next = 11;
                  break;
                }

                console.error('enableShare() | cannot produce video');
                return _context10.abrupt("return");

              case 11:
                this.store.commit('zeyeClient/me/setShareInProgress', {
                  flag: true
                });
                _context10.prev = 12;
                console.debug('enableShare() | calling getUserMedia()');
                _context10.next = 16;
                return navigator.mediaDevices.getDisplayMedia({
                  audio: false,
                  video: {
                    displaySurface: 'monitor',
                    logicalSurface: true,
                    cursor: true,
                    width: {
                      max: 1920
                    },
                    height: {
                      max: 1080
                    },
                    frameRate: {
                      max: 30
                    }
                  }
                });

              case 16:
                stream = _context10.sent;

                if (stream) {
                  _context10.next = 20;
                  break;
                }

                this.store.commit('zeyeClient/me/setShareInProgress', {
                  flag: true
                });
                return _context10.abrupt("return");

              case 20:
                track = stream.getVideoTracks()[0];

                if (!this._useSharingSimulcast) {
                  _context10.next = 29;
                  break;
                }

                // If VP9 is the only available video codec then use SVC.
                firstVideoCodec = this._mediasoupDevice.rtpCapabilities.codecs.find(function (c) {
                  return c.kind === 'video';
                });

                if (firstVideoCodec.mimeType.toLowerCase() === 'video/vp9') {
                  encodings = VIDEO_SVC_ENCODINGS;
                } else {
                  encodings = VIDEO_SIMULCAST_ENCODINGS.map(function (encoding) {
                    return _objectSpread2({}, encoding, {
                      dtx: true
                    });
                  });
                }

                _context10.next = 26;
                return this._sendTransport.produce({
                  track: track,
                  encodings: encodings,
                  codecOptions: {
                    videoGoogleStartBitrate: 1000
                  },
                  appData: {
                    share: true
                  }
                });

              case 26:
                this._shareProducer = _context10.sent;
                _context10.next = 32;
                break;

              case 29:
                _context10.next = 31;
                return this._sendTransport.produce({
                  track: track
                });

              case 31:
                this._shareProducer = _context10.sent;

              case 32:
                this.store.commit('zeyeClient/producers/addProducer', {
                  producer: {
                    id: this._shareProducer.id,
                    type: 'share',
                    paused: this._shareProducer.paused,
                    track: this._shareProducer.track,
                    rtpParameters: this._shareProducer.rtpParameters,
                    codec: this._shareProducer.rtpParameters.codecs[0].mimeType.split('/')[1]
                  }
                });

                this._shareProducer.on('transportclose', function () {
                  _this4._shareProducer = null;
                });

                this._shareProducer.on('trackended', function () {
                  _this4.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: 'Share disconnected!'
                  });

                  _this4.disableShare().catch(function () {});
                });

                _context10.next = 42;
                break;

              case 37:
                _context10.prev = 37;
                _context10.t0 = _context10["catch"](12);
                console.error('enableShare() | failed:%o', _context10.t0);

                if (_context10.t0.name !== 'NotAllowedError') {
                  this.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: "Error sharing: ".concat(_context10.t0)
                  });
                }

                if (track) track.stop();

              case 42:
                this.store.commit('zeyeClient/me/setShareInProgress', {
                  flag: false
                });

              case 43:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[12, 37]]);
      }));

      function enableShare() {
        return _enableShare.apply(this, arguments);
      }

      return enableShare;
    }()
  }, {
    key: "disableShare",
    value: function () {
      var _disableShare = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee11() {
        return regenerator.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                console.debug('disableShare()');

                if (this._shareProducer) {
                  _context11.next = 3;
                  break;
                }

                return _context11.abrupt("return");

              case 3:
                this._shareProducer.close();

                this.store.commit('zeyeClient/producers/removeProducer', {
                  producerId: this._shareProducer.id
                });
                _context11.prev = 5;
                _context11.next = 8;
                return this._protoo.request('closeProducer', {
                  producerId: this._shareProducer.id
                });

              case 8:
                _context11.next = 13;
                break;

              case 10:
                _context11.prev = 10;
                _context11.t0 = _context11["catch"](5);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error closing server-side share Producer: ".concat(_context11.t0)
                });

              case 13:
                this._shareProducer = null;

              case 14:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[5, 10]]);
      }));

      function disableShare() {
        return _disableShare.apply(this, arguments);
      }

      return disableShare;
    }()
  }, {
    key: "enableAudioOnly",
    value: function enableAudioOnly() {
      console.debug('enableAudioOnly()');
      this.store.commit('zeyeClient/me/setAudioOnlyInProgress', {
        flag: true
      });
      this.disableWebcam();

      var _iterator = _createForOfIteratorHelper(this._consumers.values()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var consumer = _step.value;
          if (consumer.kind !== 'video') continue;

          this._pauseConsumer(consumer);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.store.commit('zeyeClient/me/setAudioOnlyState', {
        enabled: true
      });
      this.store.commit('zeyeClient/me/setAudioOnlyInProgress', {
        flag: false
      });
    }
  }, {
    key: "disableAudioOnly",
    value: function disableAudioOnly() {
      console.debug('disableAudioOnly()');
      this.store.commit('zeyeClient/me/setAudioOnlyInProgress', {
        flag: true
      });

      if (!this._webcamProducer && this._produce && (getDevices() || {}).webcamEnabled) {
        this.enableWebcam();
      }

      var _iterator2 = _createForOfIteratorHelper(this._consumers.values()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var consumer = _step2.value;
          if (consumer.kind !== 'video') continue;

          this._resumeConsumer(consumer);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.store.commit('zeyeClient/me/setAudioOnlyState', {
        enabled: false
      });
      this.store.commit('zeyeClient/me/setAudioOnlyInProgress', {
        flag: false
      });
    }
  }, {
    key: "muteAudio",
    value: function muteAudio() {
      console.debug('muteAudio()');
      this.store.commit('zeyeClient/me/setAudioMutedState', {
        flag: true
      });
    }
  }, {
    key: "unmuteAudio",
    value: function unmuteAudio() {
      console.debug('unmuteAudio()');
      this.store.commit('zeyeClient/me/setAudioMutedState', {
        flag: false
      });
    }
  }, {
    key: "restartIce",
    value: function () {
      var _restartIce = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee12() {
        var iceParameters, _iceParameters;

        return regenerator.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                console.debug('restartIce()');
                this.store.commit('zeyeClient/me/setRestartIceInProgress', {
                  flag: true
                });
                _context12.prev = 2;

                if (!this._sendTransport) {
                  _context12.next = 9;
                  break;
                }

                _context12.next = 6;
                return this._protoo.request('restartIce', {
                  transportId: this._sendTransport.id
                });

              case 6:
                iceParameters = _context12.sent;
                _context12.next = 9;
                return this._sendTransport.restartIce({
                  iceParameters: iceParameters
                });

              case 9:
                if (!this._recvTransport) {
                  _context12.next = 15;
                  break;
                }

                _context12.next = 12;
                return this._protoo.request('restartIce', {
                  transportId: this._recvTransport.id
                });

              case 12:
                _iceParameters = _context12.sent;
                _context12.next = 15;
                return this._recvTransport.restartIce({
                  iceParameters: _iceParameters
                });

              case 15:
                this.store.dispatch('zeyeClient/notify', {
                  text: 'ICE restarted'
                });
                _context12.next = 22;
                break;

              case 18:
                _context12.prev = 18;
                _context12.t0 = _context12["catch"](2);
                console.error('restartIce() | failed:%o', _context12.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "ICE restart failed: ".concat(_context12.t0)
                });

              case 22:
                this.store.commit('zeyeClient/me/setRestartIceInProgress', {
                  flag: false
                });

              case 23:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[2, 18]]);
      }));

      function restartIce() {
        return _restartIce.apply(this, arguments);
      }

      return restartIce;
    }()
  }, {
    key: "setMaxSendingSpatialLayer",
    value: function () {
      var _setMaxSendingSpatialLayer = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee13(spatialLayer) {
        return regenerator.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                console.debug('setMaxSendingSpatialLayer() [spatialLayer:%s]', spatialLayer);
                _context13.prev = 1;

                if (!this._webcamProducer) {
                  _context13.next = 7;
                  break;
                }

                _context13.next = 5;
                return this._webcamProducer.setMaxSpatialLayer(spatialLayer);

              case 5:
                _context13.next = 10;
                break;

              case 7:
                if (!this._shareProducer) {
                  _context13.next = 10;
                  break;
                }

                _context13.next = 10;
                return this._shareProducer.setMaxSpatialLayer(spatialLayer);

              case 10:
                _context13.next = 16;
                break;

              case 12:
                _context13.prev = 12;
                _context13.t0 = _context13["catch"](1);
                console.error('setMaxSendingSpatialLayer() | failed:%o', _context13.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error setting max sending video spatial layer: ".concat(_context13.t0)
                });

              case 16:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[1, 12]]);
      }));

      function setMaxSendingSpatialLayer(_x4) {
        return _setMaxSendingSpatialLayer.apply(this, arguments);
      }

      return setMaxSendingSpatialLayer;
    }()
  }, {
    key: "setConsumerPreferredLayers",
    value: function () {
      var _setConsumerPreferredLayers = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee14(consumerId, spatialLayer, temporalLayer) {
        return regenerator.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                console.debug('setConsumerPreferredLayers() [consumerId:%s, spatialLayer:%s, temporalLayer:%s]', consumerId, spatialLayer, temporalLayer);
                _context14.prev = 1;
                _context14.next = 4;
                return this._protoo.request('setConsumerPreferredLayers', {
                  consumerId: consumerId,
                  spatialLayer: spatialLayer,
                  temporalLayer: temporalLayer
                });

              case 4:
                this.store.commit('zeyeClient/consumers/setConsumerPreferredLayers', {
                  consumerId: consumerId,
                  spatialLayer: spatialLayer,
                  temporalLayer: temporalLayer
                });
                _context14.next = 11;
                break;

              case 7:
                _context14.prev = 7;
                _context14.t0 = _context14["catch"](1);
                console.error('setConsumerPreferredLayers() | failed:%o', _context14.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error setting Consumer preferred layers: ".concat(_context14.t0)
                });

              case 11:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[1, 7]]);
      }));

      function setConsumerPreferredLayers(_x5, _x6, _x7) {
        return _setConsumerPreferredLayers.apply(this, arguments);
      }

      return setConsumerPreferredLayers;
    }()
  }, {
    key: "setConsumerPriority",
    value: function () {
      var _setConsumerPriority = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee15(consumerId, priority) {
        return regenerator.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                console.debug('setConsumerPriority() [consumerId:%s, priority:%d]', consumerId, priority);
                _context15.prev = 1;
                _context15.next = 4;
                return this._protoo.request('setConsumerPriority', {
                  consumerId: consumerId,
                  priority: priority
                });

              case 4:
                this.store.commit('zeyeClient/consumers/setConsumerPriority', {
                  consumerId: consumerId,
                  priority: priority
                });
                _context15.next = 11;
                break;

              case 7:
                _context15.prev = 7;
                _context15.t0 = _context15["catch"](1);
                console.error('setConsumerPriority() | failed:%o', _context15.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error setting Consumer priority: ".concat(_context15.t0)
                });

              case 11:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[1, 7]]);
      }));

      function setConsumerPriority(_x8, _x9) {
        return _setConsumerPriority.apply(this, arguments);
      }

      return setConsumerPriority;
    }()
  }, {
    key: "requestConsumerKeyFrame",
    value: function () {
      var _requestConsumerKeyFrame = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee16(consumerId) {
        return regenerator.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                console.debug('requestConsumerKeyFrame() [consumerId:%s]', consumerId);
                _context16.prev = 1;
                _context16.next = 4;
                return this._protoo.request('requestConsumerKeyFrame', {
                  consumerId: consumerId
                });

              case 4:
                this.store.dispatch('zeyeClient/notify', {
                  text: 'Keyframe requested for video consumer'
                });
                _context16.next = 11;
                break;

              case 7:
                _context16.prev = 7;
                _context16.t0 = _context16["catch"](1);
                console.error('requestConsumerKeyFrame() | failed:%o', _context16.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error requesting key frame for Consumer: ".concat(_context16.t0)
                });

              case 11:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[1, 7]]);
      }));

      function requestConsumerKeyFrame(_x10) {
        return _requestConsumerKeyFrame.apply(this, arguments);
      }

      return requestConsumerKeyFrame;
    }()
  }, {
    key: "enableChatDataProducer",
    value: function () {
      var _enableChatDataProducer = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee17() {
        var _this5 = this;

        return regenerator.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                console.debug('enableChatDataProducer()');

                if (this._useDataChannel) {
                  _context17.next = 3;
                  break;
                }

                return _context17.abrupt("return");

              case 3:
                _context17.prev = 3;
                _context17.next = 6;
                return this._sendTransport.produceData({
                  ordered: false,
                  maxRetransmits: 1,
                  label: 'chat',
                  priority: 'medium',
                  appData: {
                    info: 'my-chat-DataProducer'
                  }
                });

              case 6:
                this._chatDataProducer = _context17.sent;
                this.store.commit('zeyeClient/dataProducers/addDataProducer', {
                  dataProducer: {
                    id: this._chatDataProducer.id,
                    sctpStreamParameters: this._chatDataProducer.sctpStreamParameters,
                    label: this._chatDataProducer.label,
                    protocol: this._chatDataProducer.protocol
                  }
                });

                this._chatDataProducer.on('transportclose', function () {
                  _this5._chatDataProducer = null;
                });

                this._chatDataProducer.on('open', function () {
                  console.debug('chat DataProducer "open" event');
                });

                this._chatDataProducer.on('close', function () {
                  console.error('chat DataProducer "close" event');
                  _this5._chatDataProducer = null;

                  _this5.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: 'Chat DataProducer closed'
                  });
                });

                this._chatDataProducer.on('error', function (error) {
                  console.error('chat DataProducer "error" event:%o', error);

                  _this5.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: "Chat DataProducer error: ".concat(error)
                  });
                });

                this._chatDataProducer.on('bufferedamountlow', function () {
                  console.debug('chat DataProducer "bufferedamountlow" event');
                });

                _context17.next = 20;
                break;

              case 15:
                _context17.prev = 15;
                _context17.t0 = _context17["catch"](3);
                console.error('enableChatDataProducer() | failed:%o', _context17.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error enabling chat DataProducer: ".concat(_context17.t0)
                });
                throw _context17.t0;

              case 20:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[3, 15]]);
      }));

      function enableChatDataProducer() {
        return _enableChatDataProducer.apply(this, arguments);
      }

      return enableChatDataProducer;
    }()
  }, {
    key: "enableBotDataProducer",
    value: function () {
      var _enableBotDataProducer = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee18() {
        var _this6 = this;

        return regenerator.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                console.debug('enableBotDataProducer()');

                if (this._useDataChannel) {
                  _context18.next = 3;
                  break;
                }

                return _context18.abrupt("return");

              case 3:
                _context18.prev = 3;
                _context18.next = 6;
                return this._sendTransport.produceData({
                  ordered: false,
                  maxPacketLifeTime: 2000,
                  label: 'bot',
                  priority: 'medium',
                  appData: {
                    info: 'my-bot-DataProducer'
                  }
                });

              case 6:
                this._botDataProducer = _context18.sent;
                this.store.commit('zeyeClient/dataProducers/addDataProducer', {
                  dataProducer: {
                    id: this._botDataProducer.id,
                    sctpStreamParameters: this._botDataProducer.sctpStreamParameters,
                    label: this._botDataProducer.label,
                    protocol: this._botDataProducer.protocol
                  }
                });

                this._botDataProducer.on('transportclose', function () {
                  _this6._botDataProducer = null;
                });

                this._botDataProducer.on('open', function () {
                  console.debug('bot DataProducer "open" event');
                });

                this._botDataProducer.on('close', function () {
                  console.error('bot DataProducer "close" event');
                  _this6._botDataProducer = null;

                  _this6.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: 'Bot DataProducer closed'
                  });
                });

                this._botDataProducer.on('error', function (error) {
                  console.error('bot DataProducer "error" event:%o', error);

                  _this6.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: "Bot DataProducer error: ".concat(error)
                  });
                });

                this._botDataProducer.on('bufferedamountlow', function () {
                  console.debug('bot DataProducer "bufferedamountlow" event');
                });

                _context18.next = 20;
                break;

              case 15:
                _context18.prev = 15;
                _context18.t0 = _context18["catch"](3);
                console.error('enableBotDataProducer() | failed:%o', _context18.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error enabling bot DataProducer: ".concat(_context18.t0)
                });
                throw _context18.t0;

              case 20:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[3, 15]]);
      }));

      function enableBotDataProducer() {
        return _enableBotDataProducer.apply(this, arguments);
      }

      return enableBotDataProducer;
    }()
  }, {
    key: "sendChatMessage",
    value: function sendChatMessage(text) {
      console.debug('sendChatMessage() [text:"%s]', text);

      if (!this._chatDataProducer) {
        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: 'No chat DataProducer'
        });
        return;
      }

      try {
        this._chatDataProducer.send(text);
      } catch (error) {
        console.error('chat DataProducer.send() failed:%o', error);
        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: "chat DataProducer.send() failed: ".concat(error)
        });
      }
    }
  }, {
    key: "sendBotMessage",
    value: function sendBotMessage(text) {
      console.debug('sendBotMessage() [text:"%s]', text);

      if (!this._botDataProducer) {
        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: 'No bot DataProducer'
        });
        return;
      }

      try {
        this._botDataProducer.send(text);
      } catch (error) {
        console.error('bot DataProducer.send() failed:%o', error);
        this.store.dispatch('zeyeClient/notify', {
          type: 'error',
          text: "bot DataProducer.send() failed: ".concat(error)
        });
      }
    }
  }, {
    key: "changeDisplayName",
    value: function () {
      var _changeDisplayName = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee19(displayName) {
        return regenerator.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                console.debug('changeDisplayName() [displayName:"%s"]', displayName); // Store in cookie.

                setUser({
                  displayName: displayName
                });
                _context19.prev = 2;
                _context19.next = 5;
                return this._protoo.request('changeDisplayName', {
                  displayName: displayName
                });

              case 5:
                this._displayName = displayName;
                this.store.commit('zeyeClient/me/setDisplayName', {
                  displayName: displayName
                });
                this.store.dispatch('zeyeClient/notify', {
                  text: 'Display name changed'
                });
                _context19.next = 15;
                break;

              case 10:
                _context19.prev = 10;
                _context19.t0 = _context19["catch"](2);
                console.error('changeDisplayName() | failed: %o', _context19.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Could not change display name: ".concat(_context19.t0)
                }); // We need to refresh the component for it to render the previous
                // displayName again.

                this.store.commit('zeyeClient/me/setDisplayName', {
                  displayName: false
                });

              case 15:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[2, 10]]);
      }));

      function changeDisplayName(_x11) {
        return _changeDisplayName.apply(this, arguments);
      }

      return changeDisplayName;
    }()
  }, {
    key: "getSendTransportRemoteStats",
    value: function getSendTransportRemoteStats() {
      console.debug('getSendTransportRemoteStats()');
      if (!this._sendTransport) return;
      return this._protoo.request('getTransportStats', {
        transportId: this._sendTransport.id
      });
    }
  }, {
    key: "getRecvTransportRemoteStats",
    value: function getRecvTransportRemoteStats() {
      console.debug('getRecvTransportRemoteStats()');
      if (!this._recvTransport) return;
      return this._protoo.request('getTransportStats', {
        transportId: this._recvTransport.id
      });
    }
  }, {
    key: "getAudioRemoteStats",
    value: function getAudioRemoteStats() {
      console.debug('getAudioRemoteStats()');
      if (!this._micProducer) return;
      return this._protoo.request('getProducerStats', {
        producerId: this._micProducer.id
      });
    }
  }, {
    key: "getVideoRemoteStats",
    value: function getVideoRemoteStats() {
      console.debug('getVideoRemoteStats()');
      var producer = this._webcamProducer || this._shareProducer;
      if (!producer) return;
      return this._protoo.request('getProducerStats', {
        producerId: producer.id
      });
    }
  }, {
    key: "getConsumerRemoteStats",
    value: function getConsumerRemoteStats(consumerId) {
      console.debug('getConsumerRemoteStats()');

      var consumer = this._consumers.get(consumerId);

      if (!consumer) return;
      return this._protoo.request('getConsumerStats', {
        consumerId: consumerId
      });
    }
  }, {
    key: "getChatDataProducerRemoteStats",
    value: function getChatDataProducerRemoteStats() {
      console.debug('getChatDataProducerRemoteStats()');
      var dataProducer = this._chatDataProducer;
      if (!dataProducer) return;
      return this._protoo.request('getDataProducerStats', {
        dataProducerId: dataProducer.id
      });
    }
  }, {
    key: "getBotDataProducerRemoteStats",
    value: function getBotDataProducerRemoteStats() {
      console.debug('getBotDataProducerRemoteStats()');
      var dataProducer = this._botDataProducer;
      if (!dataProducer) return;
      return this._protoo.request('getDataProducerStats', {
        dataProducerId: dataProducer.id
      });
    }
  }, {
    key: "getDataConsumerRemoteStats",
    value: function getDataConsumerRemoteStats(dataConsumerId) {
      console.debug('getDataConsumerRemoteStats()');

      var dataConsumer = this._dataConsumers.get(dataConsumerId);

      if (!dataConsumer) return;
      return this._protoo.request('getDataConsumerStats', {
        dataConsumerId: dataConsumerId
      });
    }
  }, {
    key: "getSendTransportLocalStats",
    value: function getSendTransportLocalStats() {
      console.debug('getSendTransportLocalStats()');
      if (!this._sendTransport) return;
      return this._sendTransport.getStats();
    }
  }, {
    key: "getRecvTransportLocalStats",
    value: function getRecvTransportLocalStats() {
      console.debug('getRecvTransportLocalStats()');
      if (!this._recvTransport) return;
      return this._recvTransport.getStats();
    }
  }, {
    key: "getAudioLocalStats",
    value: function getAudioLocalStats() {
      console.debug('getAudioLocalStats()');
      if (!this._micProducer) return;
      return this._micProducer.getStats();
    }
  }, {
    key: "getVideoLocalStats",
    value: function getVideoLocalStats() {
      console.debug('getVideoLocalStats()');
      var producer = this._webcamProducer || this._shareProducer;
      if (!producer) return;
      return producer.getStats();
    }
  }, {
    key: "getConsumerLocalStats",
    value: function getConsumerLocalStats(consumerId) {
      var consumer = this._consumers.get(consumerId);

      if (!consumer) return;
      return consumer.getStats();
    }
  }, {
    key: "applyNetworkThrottle",
    value: function () {
      var _applyNetworkThrottle = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee20(_ref4) {
        var uplink, downlink, rtt, secret;
        return regenerator.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                uplink = _ref4.uplink, downlink = _ref4.downlink, rtt = _ref4.rtt, secret = _ref4.secret;
                console.debug('applyNetworkThrottle() [uplink:%s, downlink:%s, rtt:%s]', uplink, downlink, rtt);
                _context20.prev = 2;
                _context20.next = 5;
                return this._protoo.request('applyNetworkThrottle', {
                  uplink: uplink,
                  downlink: downlink,
                  rtt: rtt,
                  secret: secret
                });

              case 5:
                _context20.next = 11;
                break;

              case 7:
                _context20.prev = 7;
                _context20.t0 = _context20["catch"](2);
                console.error('applyNetworkThrottle() | failed:%o', _context20.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error applying network throttle: ".concat(_context20.t0)
                });

              case 11:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[2, 7]]);
      }));

      function applyNetworkThrottle(_x12) {
        return _applyNetworkThrottle.apply(this, arguments);
      }

      return applyNetworkThrottle;
    }()
  }, {
    key: "resetNetworkThrottle",
    value: function () {
      var _resetNetworkThrottle = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee21(_ref5) {
        var _ref5$silent, silent, secret;

        return regenerator.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _ref5$silent = _ref5.silent, silent = _ref5$silent === void 0 ? false : _ref5$silent, secret = _ref5.secret;
                console.debug('resetNetworkThrottle()');
                _context21.prev = 2;
                _context21.next = 5;
                return this._protoo.request('resetNetworkThrottle', {
                  secret: secret
                });

              case 5:
                _context21.next = 10;
                break;

              case 7:
                _context21.prev = 7;
                _context21.t0 = _context21["catch"](2);

                if (!silent) {
                  console.error('resetNetworkThrottle() | failed:%o', _context21.t0);
                  this.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: "Error resetting network throttle: ".concat(_context21.t0)
                  });
                }

              case 10:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this, [[2, 7]]);
      }));

      function resetNetworkThrottle(_x13) {
        return _resetNetworkThrottle.apply(this, arguments);
      }

      return resetNetworkThrottle;
    }()
  }, {
    key: "_joinRoom",
    value: function () {
      var _joinRoom2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee24() {
        var _this7 = this;

        var routerRtpCapabilities, stream, audioTrack, transportInfo, id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, _transportInfo, _id4, _iceParameters2, _iceCandidates, _dtlsParameters, _sctpParameters, _yield$this$_protoo$r, peers, _iterator3, _step3, peer, devicesCookie, me;

        return regenerator.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                console.debug('_joinRoom()');
                _context24.prev = 1;
                this._mediasoupDevice = new Device({
                  handlerName: this._handlerName
                });
                _context24.next = 5;
                return this._protoo.request('getRouterRtpCapabilities');

              case 5:
                routerRtpCapabilities = _context24.sent;
                _context24.next = 8;
                return this._mediasoupDevice.load({
                  routerRtpCapabilities: routerRtpCapabilities
                });

              case 8:
                _context24.next = 10;
                return navigator.mediaDevices.getUserMedia({
                  audio: true
                });

              case 10:
                stream = _context24.sent;
                audioTrack = stream.getAudioTracks()[0];
                audioTrack.enabled = false;
                setTimeout(function () {
                  return audioTrack.stop();
                }, 120000);

                if (!this._produce) {
                  _context24.next = 23;
                  break;
                }

                _context24.next = 17;
                return this._protoo.request('createWebRtcTransport', {
                  forceTcp: this._forceTcp,
                  producing: true,
                  consuming: false,
                  sctpCapabilities: this._useDataChannel ? this._mediasoupDevice.sctpCapabilities : undefined
                });

              case 17:
                transportInfo = _context24.sent;
                id = transportInfo.id, iceParameters = transportInfo.iceParameters, iceCandidates = transportInfo.iceCandidates, dtlsParameters = transportInfo.dtlsParameters, sctpParameters = transportInfo.sctpParameters;
                this._sendTransport = this._mediasoupDevice.createSendTransport({
                  id: id,
                  iceParameters: iceParameters,
                  iceCandidates: iceCandidates,
                  dtlsParameters: dtlsParameters,
                  sctpParameters: sctpParameters,
                  iceServers: [],
                  proprietaryConstraints: PC_PROPRIETARY_CONSTRAINTS
                });

                this._sendTransport.on('connect', function (_ref6, callback, errback // eslint-disable-line no-shadow
                ) {
                  var dtlsParameters = _ref6.dtlsParameters;

                  _this7._protoo.request('connectWebRtcTransport', {
                    transportId: _this7._sendTransport.id,
                    dtlsParameters: dtlsParameters
                  }).then(callback).catch(errback);
                });

                this._sendTransport.on('produce', /*#__PURE__*/function () {
                  var _ref8 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee22(_ref7, callbackfunc, errback) {
                    var kind, rtpParameters, appData, _yield$_this7$_protoo, _id2;

                    return regenerator.wrap(function _callee22$(_context22) {
                      while (1) {
                        switch (_context22.prev = _context22.next) {
                          case 0:
                            kind = _ref7.kind, rtpParameters = _ref7.rtpParameters, appData = _ref7.appData;
                            _context22.prev = 1;
                            _context22.next = 4;
                            return _this7._protoo.request('produce', {
                              transportId: _this7._sendTransport.id,
                              kind: kind,
                              rtpParameters: rtpParameters,
                              appData: appData
                            });

                          case 4:
                            _yield$_this7$_protoo = _context22.sent;
                            _id2 = _yield$_this7$_protoo.id;
                            callbackfunc({
                              id: _id2
                            });
                            _context22.next = 12;
                            break;

                          case 9:
                            _context22.prev = 9;
                            _context22.t0 = _context22["catch"](1);
                            errback(_context22.t0);

                          case 12:
                          case "end":
                            return _context22.stop();
                        }
                      }
                    }, _callee22, null, [[1, 9]]);
                  }));

                  return function (_x14, _x15, _x16) {
                    return _ref8.apply(this, arguments);
                  };
                }());

                this._sendTransport.on('producedata', /*#__PURE__*/function () {
                  var _ref10 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee23(_ref9, callbackfunc, errback) {
                    var sctpStreamParameters, label, protocol, appData, _yield$_this7$_protoo2, _id3;

                    return regenerator.wrap(function _callee23$(_context23) {
                      while (1) {
                        switch (_context23.prev = _context23.next) {
                          case 0:
                            sctpStreamParameters = _ref9.sctpStreamParameters, label = _ref9.label, protocol = _ref9.protocol, appData = _ref9.appData;
                            console.debug('"producedata" event: [sctpStreamParameters:%o, appData:%o]', sctpStreamParameters, appData);
                            _context23.prev = 2;
                            _context23.next = 5;
                            return _this7._protoo.request('produceData', {
                              transportId: _this7._sendTransport.id,
                              sctpStreamParameters: sctpStreamParameters,
                              label: label,
                              protocol: protocol,
                              appData: appData
                            });

                          case 5:
                            _yield$_this7$_protoo2 = _context23.sent;
                            _id3 = _yield$_this7$_protoo2.id;
                            callbackfunc({
                              id: _id3
                            });
                            _context23.next = 13;
                            break;

                          case 10:
                            _context23.prev = 10;
                            _context23.t0 = _context23["catch"](2);
                            errback(_context23.t0);

                          case 13:
                          case "end":
                            return _context23.stop();
                        }
                      }
                    }, _callee23, null, [[2, 10]]);
                  }));

                  return function (_x17, _x18, _x19) {
                    return _ref10.apply(this, arguments);
                  };
                }());

              case 23:
                if (!this._consume) {
                  _context24.next = 30;
                  break;
                }

                _context24.next = 26;
                return this._protoo.request('createWebRtcTransport', {
                  forceTcp: this._forceTcp,
                  producing: false,
                  consuming: true,
                  sctpCapabilities: this._useDataChannel ? this._mediasoupDevice.sctpCapabilities : undefined
                });

              case 26:
                _transportInfo = _context24.sent;
                _id4 = _transportInfo.id, _iceParameters2 = _transportInfo.iceParameters, _iceCandidates = _transportInfo.iceCandidates, _dtlsParameters = _transportInfo.dtlsParameters, _sctpParameters = _transportInfo.sctpParameters;
                this._recvTransport = this._mediasoupDevice.createRecvTransport({
                  id: _id4,
                  iceParameters: _iceParameters2,
                  iceCandidates: _iceCandidates,
                  dtlsParameters: _dtlsParameters,
                  sctpParameters: _sctpParameters,
                  iceServers: []
                });

                this._recvTransport.on('connect', function (_ref11, callback, errback // eslint-disable-line no-shadow
                ) {
                  var dtlsParameters = _ref11.dtlsParameters;

                  _this7._protoo.request('connectWebRtcTransport', {
                    transportId: _this7._recvTransport.id,
                    dtlsParameters: dtlsParameters
                  }).then(callback).catch(errback);
                });

              case 30:
                _context24.next = 32;
                return this._protoo.request('join', {
                  displayName: this._displayName,
                  device: this._device,
                  rtpCapabilities: this._consume ? this._mediasoupDevice.rtpCapabilities : undefined,
                  sctpCapabilities: this._useDataChannel && this._consume ? this._mediasoupDevice.sctpCapabilities : undefined
                });

              case 32:
                _yield$this$_protoo$r = _context24.sent;
                peers = _yield$this$_protoo$r.peers;
                this.store.commit('zeyeClient/room/setRoomState', {
                  state: 'connected'
                }); // Clean all the existing notifcations.

                this.store.commit('zeyeClient/notifications/removeAllNotifications');
                this.store.dispatch('zeyeClient/notify', {
                  text: 'You are in the room!',
                  timeout: 3000
                });
                _iterator3 = _createForOfIteratorHelper(peers);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    peer = _step3.value;
                    this.store.commit('zeyeClient/peers/addPeer', {
                      peer: _objectSpread2({}, peer, {
                        consumers: [],
                        dataConsumers: []
                      })
                    });
                  } // Enable mic/webcam.

                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

                if (this._produce) {
                  // Set our media capabilities.
                  this.store.commit('zeyeClient/me/setMediaCapabilities', {
                    canSendMic: this._mediasoupDevice.canProduce('audio'),
                    canSendWebcam: this._mediasoupDevice.canProduce('video')
                  });
                  this.enableMic();
                  devicesCookie = getDevices();
                  if (!devicesCookie || devicesCookie.webcamEnabled || this._externalVideo) this.enableWebcam();

                  this._sendTransport.on('connectionstatechange', function (connectionState) {
                    if (connectionState === 'connected') {
                      _this7.enableChatDataProducer();

                      _this7.enableBotDataProducer();
                    }
                  });
                } // NOTE: For testing.


                if (window.SHOW_INFO) {
                  me = this.store.state.me;
                  this.store.commit('zeyeClient/room/setRoomStatsPeerId', {
                    peerId: me.id
                  });
                }

                _context24.next = 48;
                break;

              case 43:
                _context24.prev = 43;
                _context24.t0 = _context24["catch"](1);
                console.error('_joinRoom() failed:%o', _context24.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Could not join the room: ".concat(_context24.t0)
                });
                this.close();

              case 48:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this, [[1, 43]]);
      }));

      function _joinRoom() {
        return _joinRoom2.apply(this, arguments);
      }

      return _joinRoom;
    }()
  }, {
    key: "_updateWebcams",
    value: function () {
      var _updateWebcams2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee25() {
        var devices, _iterator4, _step4, device, array, len, currentWebcamId;

        return regenerator.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                console.debug('_updateWebcams()'); // Reset the list.

                this._webcams = new Map();
                console.debug('_updateWebcams() | calling enumerateDevices()');
                _context25.next = 5;
                return navigator.mediaDevices.enumerateDevices();

              case 5:
                devices = _context25.sent;
                _iterator4 = _createForOfIteratorHelper(devices);
                _context25.prev = 7;

                _iterator4.s();

              case 9:
                if ((_step4 = _iterator4.n()).done) {
                  _context25.next = 16;
                  break;
                }

                device = _step4.value;

                if (!(device.kind !== 'videoinput')) {
                  _context25.next = 13;
                  break;
                }

                return _context25.abrupt("continue", 14);

              case 13:
                this._webcams.set(device.deviceId, device);

              case 14:
                _context25.next = 9;
                break;

              case 16:
                _context25.next = 21;
                break;

              case 18:
                _context25.prev = 18;
                _context25.t0 = _context25["catch"](7);

                _iterator4.e(_context25.t0);

              case 21:
                _context25.prev = 21;

                _iterator4.f();

                return _context25.finish(21);

              case 24:
                array = Array.from(this._webcams.values());
                len = array.length;
                currentWebcamId = this._webcam.device ? this._webcam.device.deviceId : undefined;
                console.debug('_updateWebcams() [webcams:%o]', array);
                if (len === 0) this._webcam.device = null;else if (!this._webcams.has(currentWebcamId)) this._webcam.device = array[0];
                this.store.commit('zeyeClient/me/setCanChangeWebcam', {
                  flag: this._webcams.size > 1
                });

              case 30:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this, [[7, 18, 21, 24]]);
      }));

      function _updateWebcams() {
        return _updateWebcams2.apply(this, arguments);
      }

      return _updateWebcams;
    }()
  }, {
    key: "_getWebcamType",
    value: function _getWebcamType(device) {
      if (/(back|rear)/i.test(device.label)) {
        console.debug('_getWebcamType() | it seems to be a back camera');
        return 'back';
      } else {
        console.debug('_getWebcamType() | it seems to be a front camera');
        return 'front';
      }
    }
  }, {
    key: "_pauseConsumer",
    value: function () {
      var _pauseConsumer2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee26(consumer) {
        return regenerator.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                if (!consumer.paused) {
                  _context26.next = 2;
                  break;
                }

                return _context26.abrupt("return");

              case 2:
                _context26.prev = 2;
                _context26.next = 5;
                return this._protoo.request('pauseConsumer', {
                  consumerId: consumer.id
                });

              case 5:
                consumer.pause();
                this.store.commit('zeyeClient/consumers/setConsumerPaused', {
                  consumerId: consumer.id,
                  originator: 'local'
                });
                _context26.next = 13;
                break;

              case 9:
                _context26.prev = 9;
                _context26.t0 = _context26["catch"](2);
                console.error('_pauseConsumer() | failed:%o', _context26.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error pausing Consumer: ".concat(_context26.t0)
                });

              case 13:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this, [[2, 9]]);
      }));

      function _pauseConsumer(_x20) {
        return _pauseConsumer2.apply(this, arguments);
      }

      return _pauseConsumer;
    }()
  }, {
    key: "_resumeConsumer",
    value: function () {
      var _resumeConsumer2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee27(consumer) {
        return regenerator.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                if (consumer.paused) {
                  _context27.next = 2;
                  break;
                }

                return _context27.abrupt("return");

              case 2:
                _context27.prev = 2;
                _context27.next = 5;
                return this._protoo.request('resumeConsumer', {
                  consumerId: consumer.id
                });

              case 5:
                consumer.resume();
                this.store.commit('zeyeClient/consumers/setConsumerResumed', {
                  consumerId: consumer.id,
                  originator: 'local'
                });
                _context27.next = 13;
                break;

              case 9:
                _context27.prev = 9;
                _context27.t0 = _context27["catch"](2);
                console.error('_resumeConsumer() | failed:%o', _context27.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error resuming Consumer: ".concat(_context27.t0)
                });

              case 13:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this, [[2, 9]]);
      }));

      function _resumeConsumer(_x21) {
        return _resumeConsumer2.apply(this, arguments);
      }

      return _resumeConsumer;
    }()
  }, {
    key: "_getExternalVideoStream",
    value: function () {
      var _getExternalVideoStream2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee28() {
        var _this8 = this;

        return regenerator.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                if (!this._externalVideoStream) {
                  _context28.next = 2;
                  break;
                }

                return _context28.abrupt("return", this._externalVideoStream);

              case 2:
                if (!(this._externalVideo.readyState < 3)) {
                  _context28.next = 5;
                  break;
                }

                _context28.next = 5;
                return new Promise(function (resolve) {
                  return _this8._externalVideo.addEventListener('canplay', resolve);
                });

              case 5:
                if (!this._externalVideo.captureStream) {
                  _context28.next = 9;
                  break;
                }

                this._externalVideoStream = this._externalVideo.captureStream();
                _context28.next = 14;
                break;

              case 9:
                if (!this._externalVideo.mozCaptureStream) {
                  _context28.next = 13;
                  break;
                }

                this._externalVideoStream = this._externalVideo.mozCaptureStream();
                _context28.next = 14;
                break;

              case 13:
                throw new Error('video.captureStream() not supported');

              case 14:
                return _context28.abrupt("return", this._externalVideoStream);

              case 15:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function _getExternalVideoStream() {
        return _getExternalVideoStream2.apply(this, arguments);
      }

      return _getExternalVideoStream;
    }()
  }]);

  return ZeyeClient;
}();

//
var script = {
  props: {
    peerId: {
      type: String,
      required: true
    },
    showVolumeBar: {
      type: Boolean,
      default: false
    },
    volumeBarColor: {
      type: String,
      default: 'greenyellow'
    }
  },
  data: function data() {
    return {
      hark: null,
      audioVolume: 0 // Integer from 0 to 10

    };
  },
  mounted: function mounted() {
    this.waitForProducerAvailability();
  },
  methods: {
    runAudio: function runAudio() {
      var audioTrack = this.$zeyeClient.getAudioProducer().track;

      if (audioTrack) {
        var audioElem = this.$refs.audioElem;
        audioElem.muted = true;
        var audioStream = new MediaStream();
        audioStream.addTrack(audioTrack);
        audioElem.srcObject = audioStream;
        audioElem.play().catch(function (error) {
          return console.warn('audioElem.play() failed:%o', error);
        });

        this._runHark(audioStream);
      }
    },
    runVideo: function runVideo() {
      var videoTrack = this.$zeyeClient.getVideoProducer().track;

      if (videoTrack) {
        if (this.$zeyeClient.getVideoProducer().track) {
          var _this$$refs = this.$refs,
              audioElem = _this$$refs.audioElem,
              videoElem = _this$$refs.videoElem;
          videoElem.muted = true;
          var videoStream = new MediaStream();
          videoStream.addTrack(videoTrack);
          videoElem.srcObject = videoStream;

          videoElem.onplay = function () {
            audioElem.play().catch(function (error) {
              return console.warn('audioElem.play() failed:%o', error);
            });
          };

          videoElem.play();
        }
      }
    },
    _runHark: function _runHark(stream) {
      var _this = this;

      if (!stream.getAudioTracks()[0]) throw new Error('_runHark() | given stream has no audio track');
      this.hark = hark(stream, {
        play: false
      }); // eslint-disable-next-line no-unused-vars

      this.hark.on('volume_change', function (dBs, threshold) {
        // The exact formula to convert from dBs (-100..0) to linear (0..1) is:
        //   Math.pow(10, dBs / 20)
        // However it does not produce a visually useful output, so let exagerate
        // it a bit. Also, let convert it from 0..1 to 0..10 and avoid value 1 to
        // minimize component renderings.
        var audioVolume = Math.round(Math.pow(10, dBs / 85) * 10);
        if (audioVolume === 1) audioVolume = 0;

        if (audioVolume !== _this.audioVolume) {
          _this.audioVolume = audioVolume;
        }
      });
    },
    waitForProducerAvailability: function waitForProducerAvailability() {
      if (this.$zeyeClient.getAudioProducer() && this.$zeyeClient.getVideoProducer()) {
        this.runAudio();
        this.runVideo();
      } else {
        console.debug('Waiting for channels availability');
        setTimeout(this.waitForProducerAvailability, 200);
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}

var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zeye-peer-media",class:{'active-speaker':_vm.$zeyeClient.isSpeakerActive(_vm.peerId)}},[_c('video',{ref:"videoElem",staticStyle:{"width":"100%"},attrs:{"autoPlay":"","muted":"","controls":false},domProps:{"muted":true}}),_vm._v(" "),_c('audio',{ref:"audioElem",staticStyle:{"width":"100%"},attrs:{"autoPlay":"","muted":"","controls":false}}),_vm._v(" "),(_vm.showVolumeBar)?_c('div',{staticClass:"volume-container"},[_c('div',{staticClass:"bar",style:({height: _vm.audioVolume*10 + '%', backgroundColor: _vm.volumeBarColor})})]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-2f296856_0", { source: ".volume-container{position:absolute;top:0;bottom:0;width:10px;display:flex;-webkit-box-orient:vertical;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;pointer-events:none}.volume-container .bar{width:6px;border-radius:6px;transition:.1s ease-in 0s}.zeye-peer-media{position:relative;flex:100 100 auto;display:flex}.zeye-peer-media.active-speaker{box-shadow:0 0 5px #adff2f}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var zeyePeerMedia = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

var zeyeClient = {
  install: function install(Vue, store) {
    store.registerModule(['zeyeClient', 'consumers'], module);
    store.registerModule(['zeyeClient', 'dataConsumers'], module$1);
    store.registerModule(['zeyeClient', 'dataProducers'], module$2);
    store.registerModule(['zeyeClient', 'index'], module$3);
    store.registerModule(['zeyeClient', 'me'], module$4);
    store.registerModule(['zeyeClient', 'notifications'], module$5);
    store.registerModule(['zeyeClient', 'peers'], module$6);
    store.registerModule(['zeyeClient', 'producers'], module$7);
    store.registerModule(['zeyeClient', 'room'], room);
    /**
     * @type {ZeyeClient}
     */

    this.$zeyeClient = new ZeyeClient({
      store: store
    });
    Vue.prototype.$zeyeClient = this.$zeyeClient;
    Vue.$zeyeClient = this.$zeyeClient;
    Vue.component('zeye-peer-media', zeyePeerMedia);
    registerFunctions$6({
      app: this,
      store: store
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(zeyeClient);
}

export default zeyeClient;
