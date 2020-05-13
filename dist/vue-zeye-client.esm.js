/*!
 * vue-zeye-client v0.2.29 
 * (c) 2020 stasoft91@gmail.com
 * Released under the ISC License.
 */
import jsCookie from 'js-cookie';
import protooClient from 'protoo-client';
import { parseScalabilityMode, Device } from 'mediasoup-client';
import hark from 'hark';

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

/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  _typeof(value) === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function no(a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function identity(_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = ('__proto__' in {}); // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function tip(msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function repeat(str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if (process.env.NODE_ENV !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode(text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if (process.env.NODE_ENV !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = _typeof(value);

    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) {
    args[len] = arguments[len];
  }

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function timerFunc() {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function timerFunc() {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function timerFunc() {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function timerFunc() {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function warnNonPresent(target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function warnReservedPrefix(target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals. ' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = (key in target);
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function mark(tag) {
      return perf.mark(tag);
    };

    measure = function measure(name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function normalized() {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && _typeof(res) === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function loop(key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) {
        loop(key);
      }
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (process.env.NODE_ENV !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if (process.env.NODE_ENV !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function merged(a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    process.env.NODE_ENV !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
      }

      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if (process.env.NODE_ENV !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function forceRender(renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject(process.env.NODE_ENV !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function updateComponent() {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function getNow() {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      process.env.NODE_ENV !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if (process.env.NODE_ENV !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + _typeof(methods[key]) + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.11';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function convertEnumeratedValue(key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function isXlink(name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if (process.env.NODE_ENV !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function blocker(e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function setProp(el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (_typeof(def$$1) === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function end() {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function isNotTextNode(c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function isVShowDirective(d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if (process.env.NODE_ENV !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function performLeave() {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}

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

    if (consumer) {
      Vue.set(consumer, 'score', score);
    }
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
    restartIceInProgress: false,
    currentAudioOutputDevice: null
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
    var flag = payload.flag;
    state.canChangeWebcam = flag;
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
  },
  setCurrentAudioOutputDevice: function setCurrentAudioOutputDevice(state, payload) {
    var currentAudioOutputDevice = payload.currentAudioOutputDevice;
    state.currentAudioOutputDevice = currentAudioOutputDevice;
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
  return randomString(8);
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
   * @method toggleShare
   * @name toggleShare
   */


  app.$zeyeClient.toggleShare = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(app.$zeyeClient.getScreenShareState() === 'on')) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return app.$zeyeClient.enableWebcam();

          case 3:
            _context.next = 7;
            break;

          case 5:
            _context.next = 7;
            return app.$zeyeClient.enableShare();

          case 7:
            // Producer tracks most probably updated after theese actions,
            // so event is emitted to be caught in zeyePeerMedia component
            app.$zeyeClient.$bus.$emit('update-my-media');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  /**
   * @method
   * @name toggleMicState
   */

  app.$zeyeClient.toggleMicState = function () {
    app.$zeyeClient.getMicState() === 'on' ? app.$zeyeClient.muteMic() : app.$zeyeClient.unmuteMic();
  };
  /**
   * @method
   * @name updateAudioOutputDevices
   */


  app.$zeyeClient.updateAudioOutputDevices = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
    var devices;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return navigator.mediaDevices.enumerateDevices();

          case 2:
            devices = _context2.sent;
            app.$zeyeClient._outputDevices = devices.filter(function (device) {
              return device.kind === 'audiooutput';
            }); // if none current output set in store then it is definitely default one

            if (app.$zeyeClient.getMe().currentAudioOutputDevice === null) {
              app.$zeyeClient.store.commit('zeyeClient/me/setCurrentAudioOutputDevice', {
                currentAudioOutputDevice: app.$zeyeClient._outputDevices[0]
              });
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  /**
   * @method
   * @name getAudioOutputDevices
   * @returns Array<MediaDeviceInfo>
   */

  app.$zeyeClient.getAudioOutputDevices = function () {
    return app.$zeyeClient._outputDevices;
  };
  /**
   * @method
   * @name getOutputDevices
   * @returns Object
   */


  app.$zeyeClient.getCurrentAudioOutputDevice = function () {
    return app.$zeyeClient.getMe().currentAudioOutputDevice;
  };
  /**
   * @method
   * @name setAudioOutputDevice
   * @param device
   */


  app.$zeyeClient.setAudioOutputDevice = function (device) {
    app.$zeyeClient.store.commit('zeyeClient/me/setCurrentAudioOutputDevice', {
      currentAudioOutputDevice: device
    });
    app.$zeyeClient.$bus.$emit('set-output-device-id', device.deviceId);
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

function getProtooUrl(_ref) {
  var roomId = _ref.roomId,
      peerId = _ref.peerId,
      hostname = _ref.hostname,
      protooPort = _ref.protooPort;
  hostname = hostname !== undefined ? hostname : 'localhost';
  protooPort = protooPort !== undefined ? protooPort : '4443';
  return "wss://".concat(hostname, ":").concat(protooPort, "/?roomId=").concat(roomId, "&peerId=").concat(peerId);
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
    var store = _ref.store,
        forceH264 = _ref.forceH264,
        forceVP9 = _ref.forceVP9;

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

    this._webcams = new Map(); // Array of output audio MediaDeviceInfos indexed by deviceId.
    // @type {Array<MediaDeviceInfos>}

    this._outputDevices = []; // Local Webcam.
    // @type {Object} with:
    // - {MediaDeviceInfo} [device]
    // - {String} [resolution] - 'qvga' / 'vga' / 'hd'.

    this._webcam = {
      device: null,
      resolution: 'hd'
    }; // Force H264 codec for sending.

    this._forceH264 = Boolean(forceH264); // Force VP9 codec for sending.

    this._forceVP9 = Boolean(forceVP9);
    this.$bus = new Vue();
  }

  _createClass(ZeyeClient, [{
    key: "close",
    value: function close() {
      if (this._closed) return;
      this._closed = true;
      console.debug('close()');
      if (this._webcamProducer) this._webcamProducer.close();
      if (this._shareProducer) this._shareProducer.close(); // Close protoo Peer

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
          hostname = _ref2.hostname,
          protooPort = _ref2.protooPort;
      hostname = hostname !== undefined ? hostname : false;
      protooPort = protooPort !== undefined ? protooPort : false;
      this._displayName = displayName !== undefined ? displayName : randomName();
      this._protooUrl = getProtooUrl({
        roomId: roomId,
        peerId: peerId,
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
                  });

                  _this.store.commit('zeyeClient/peers/addConsumer', {
                    consumer: {
                      id: consumer.id
                    },
                    peerId: _peerId2
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

                  _this.store.commit('zeyeClient/dataConsumers/addDataConsumer', {
                    dataConsumer: {
                      id: dataConsumer.id,
                      sctpStreamParameters: dataConsumer.sctpStreamParameters,
                      label: dataConsumer.label,
                      protocol: dataConsumer.protocol
                    }
                  });

                  _this.store.commit('zeyeClient/peers/addDataConsumer', {
                    dataConsumer: {
                      id: dataConsumer.id
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

        var track, device, resolution, stream, _stream2, encodings, codec, codecOptions, firstVideoCodec;

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
                codecOptions = {
                  videoGoogleStartBitrate: 1000
                };

                if (!this._forceH264) {
                  _context6.next = 39;
                  break;
                }

                codec = this._mediasoupDevice.rtpCapabilities.codecs.find(function (c) {
                  return c.mimeType.toLowerCase() === 'video/h264';
                });

                if (codec) {
                  _context6.next = 37;
                  break;
                }

                throw new Error('desired H264 codec+configuration is not supported');

              case 37:
                _context6.next = 43;
                break;

              case 39:
                if (!this._forceVP9) {
                  _context6.next = 43;
                  break;
                }

                codec = this._mediasoupDevice.rtpCapabilities.codecs.find(function (c) {
                  return c.mimeType.toLowerCase() === 'video/vp9';
                });

                if (codec) {
                  _context6.next = 43;
                  break;
                }

                throw new Error('desired VP9 codec+configuration is not supported');

              case 43:
                if (this._useSimulcast) {
                  // If VP9 is the only available video codec then use SVC.
                  firstVideoCodec = this._mediasoupDevice.rtpCapabilities.codecs.find(function (c) {
                    return c.kind === 'video';
                  });

                  if (this._forceVP9 && codec || firstVideoCodec.mimeType.toLowerCase() === 'video/vp9') {
                    encodings = VIDEO_KSVC_ENCODINGS;
                  } else {
                    encodings = VIDEO_SIMULCAST_ENCODINGS;
                  }
                }

                _context6.next = 46;
                return this._sendTransport.produce({
                  track: track,
                  encodings: encodings,
                  codecOptions: codecOptions,
                  codec: codec
                });

              case 46:
                this._webcamProducer = _context6.sent;
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

                _context6.next = 57;
                break;

              case 52:
                _context6.prev = 52;
                _context6.t0 = _context6["catch"](12);
                console.error('enableWebcam() | failed:%o', _context6.t0);
                this.store.dispatch('zeyeClient/notify', {
                  type: 'error',
                  text: "Error enabling webcam: ".concat(_context6.t0)
                });
                if (track) track.stop();

              case 57:
                this.store.commit('zeyeClient/me/setWebcamInProgress', {
                  flag: false
                });

              case 58:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[12, 52]]);
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
                this.$bus.$emit('update-my-media');

              case 32:
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

        var result, track, stream, encodings, codec, codecOptions, firstVideoCodec;
        return regenerator.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                console.debug('enableShare()');
                result = true;

                if (!this._shareProducer) {
                  _context10.next = 6;
                  break;
                }

                return _context10.abrupt("return", false);

              case 6:
                if (!this._webcamProducer) {
                  _context10.next = 9;
                  break;
                }

                _context10.next = 9;
                return this.disableWebcam();

              case 9:
                if (this._mediasoupDevice.canProduce('video')) {
                  _context10.next = 12;
                  break;
                }

                console.error('enableShare() | cannot produce video');
                return _context10.abrupt("return", false);

              case 12:
                this.store.commit('zeyeClient/me/setShareInProgress', {
                  flag: true
                });
                _context10.prev = 13;
                console.debug('enableShare() | calling getUserMedia()');
                _context10.next = 17;
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

              case 17:
                stream = _context10.sent;

                if (stream) {
                  _context10.next = 21;
                  break;
                }

                this.store.commit('zeyeClient/me/setShareInProgress', {
                  flag: false
                });
                return _context10.abrupt("return", false);

              case 21:
                track = stream.getVideoTracks()[0];
                codecOptions = {
                  videoGoogleStartBitrate: 1000
                };

                if (!this._forceH264) {
                  _context10.next = 29;
                  break;
                }

                codec = this._mediasoupDevice.rtpCapabilities.codecs.find(function (c) {
                  return c.mimeType.toLowerCase() === 'video/h264';
                });

                if (codec) {
                  _context10.next = 27;
                  break;
                }

                throw new Error('desired H264 codec+configuration is not supported');

              case 27:
                _context10.next = 33;
                break;

              case 29:
                if (!this._forceVP9) {
                  _context10.next = 33;
                  break;
                }

                codec = this._mediasoupDevice.rtpCapabilities.codecs.find(function (c) {
                  return c.mimeType.toLowerCase() === 'video/vp9';
                });

                if (codec) {
                  _context10.next = 33;
                  break;
                }

                throw new Error('desired VP9 codec+configuration is not supported');

              case 33:
                if (this._useSharingSimulcast) {
                  // If VP9 is the only available video codec then use SVC.
                  firstVideoCodec = this._mediasoupDevice.rtpCapabilities.codecs.find(function (c) {
                    return c.kind === 'video';
                  });

                  if (this._forceVP9 && codec || firstVideoCodec.mimeType.toLowerCase() === 'video/vp9') {
                    encodings = VIDEO_SVC_ENCODINGS;
                  } else {
                    encodings = VIDEO_SIMULCAST_ENCODINGS.map(function (encoding) {
                      return _objectSpread2({}, encoding, {
                        dtx: true
                      });
                    });
                  }
                }

                _context10.next = 36;
                return this._sendTransport.produce({
                  track: track,
                  encodings: encodings,
                  codecOptions: codecOptions,
                  codec: codec,
                  appData: {
                    share: true
                  }
                });

              case 36:
                this._shareProducer = _context10.sent;
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

                _context10.next = 48;
                break;

              case 42:
                _context10.prev = 42;
                _context10.t0 = _context10["catch"](13);
                console.error('enableShare() | failed:%o', _context10.t0);

                if (_context10.t0.name !== 'NotAllowedError') {
                  this.store.dispatch('zeyeClient/notify', {
                    type: 'error',
                    text: "Error sharing: ".concat(_context10.t0)
                  });
                }

                if (track) track.stop();
                result = false;

              case 48:
                this.store.commit('zeyeClient/me/setShareInProgress', {
                  flag: false
                });
                return _context10.abrupt("return", result);

              case 50:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[13, 42]]);
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

                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    device = _step4.value;

                    if (device.kind === 'audiooutput') {
                      this._outputDevices.push(device);
                    }

                    if (device.kind === 'videoinput') {
                      this._webcams.set(device.deviceId, device);
                    }
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }

                this.store.commit('zeyeClient/me/setCurrentAudioOutputDevice', {
                  currentAudioOutputDevice: this._outputDevices[0]
                });
                array = Array.from(this._webcams.values());
                len = array.length;
                currentWebcamId = this._webcam.device ? this._webcam.device.deviceId : undefined;
                console.debug('_updateWebcams() [webcams:%o]', array);
                if (len === 0) this._webcam.device = null;else if (!this._webcams.has(currentWebcamId)) this._webcam.device = array[0];
                this.store.commit('zeyeClient/me/setCanChangeWebcam', {
                  flag: this._webcams.size > 1
                });

              case 15:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
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
  computed: {
    isLocalMedia: function isLocalMedia() {
      return this.peerId === 'me';
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.waitForMediaAvailability();

    if (this.isLocalMedia) {
      this.$zeyeClient.$bus.$on('update-my-media', function () {
        _this.runVideo();

        _this.runAudio();
      });
    }

    this.$zeyeClient.$bus.$on('set-output-device-id', function (deviceId) {
      _this.$refs.audioElem.setSinkId(deviceId);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$zeyeClient.$bus.$off('update-my-media');
    this.$zeyeClient.$bus.$off('set-output-device-id');
  },
  methods: {
    runAudio: function runAudio() {
      // for nonMe peers there should be a Consumer getter
      var audioTrack;

      if (this.isLocalMedia) {
        audioTrack = this.$zeyeClient.getAudioProducer().track;
      } else {
        audioTrack = this.$zeyeClient.getAudioConsumer(this.peerId).track;
      }

      if (audioTrack) {
        var audioElem = this.$refs.audioElem;
        audioElem.muted = this.isLocalMedia;
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
      var videoTrack;

      if (this.isLocalMedia) {
        videoTrack = this.$zeyeClient.getVideoProducer().track;
      } else {
        videoTrack = this.$zeyeClient.getVideoConsumer(this.peerId).track;
      }

      if (videoTrack) {
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
    },
    _runHark: function _runHark(stream) {
      var _this2 = this;

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

        if (audioVolume !== _this2.audioVolume) {
          _this2.audioVolume = audioVolume;
        }
      });
    },
    waitForMediaAvailability: function waitForMediaAvailability() {
      if (this.isLocalMedia && this.$zeyeClient.getAudioProducer() && this.$zeyeClient.getVideoProducer() || !this.isLocalMedia && this.$zeyeClient.getPeer(this.peerId) && this.$zeyeClient.getPeer(this.peerId).consumers && this.$zeyeClient.getAudioConsumer(this.peerId) && this.$zeyeClient.getVideoConsumer(this.peerId)) {
        this.runAudio();
        this.runVideo();
      } else {
        console.debug('Waiting for channels availability...');
        setTimeout(this.waitForMediaAvailability, 100);
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zeye-peer-media",class:{ 'active-speaker': _vm.$zeyeClient.isSpeakerActive(_vm.peerId) }},[_c('video',{ref:"videoElem",staticStyle:{"width":"100%"},attrs:{"autoPlay":"","playsInline":"","muted":"","controls":false},domProps:{"muted":true}}),_vm._v(" "),_c('audio',{ref:"audioElem",staticStyle:{"width":"100%"},attrs:{"autoPlay":"","playsInline":"","muted":"","controls":false}}),_vm._v(" "),(_vm.showVolumeBar)?_c('div',{staticClass:"volume-container"},[_c('div',{staticClass:"bar",style:({
        height: _vm.audioVolume * 10 + '%',
        backgroundColor: _vm.volumeBarColor
      })})]):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-2e1c075c_0", { source: ".volume-container{position:absolute;top:0;bottom:0;width:10px;display:flex;-webkit-box-orient:vertical;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;pointer-events:none}.volume-container .bar{width:6px;border-radius:6px;transition:.1s ease-in 0s}.zeye-peer-media{position:relative;flex:100 100 auto;display:flex}.zeye-peer-media.active-speaker{box-shadow:0 0 5px #adff2f}", map: undefined, media: undefined });

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
