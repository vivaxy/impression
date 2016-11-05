(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Impression"] = factory();
	else
		root["Impression"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since 2016-10-28 12:21
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author vivaxy
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _events = __webpack_require__(1);

	var _events2 = _interopRequireDefault(_events);

	var _validators = __webpack_require__(2);

	var _validators2 = _interopRequireDefault(_validators);

	var _observers = __webpack_require__(7);

	var _observers2 = _interopRequireDefault(_observers);

	var _debounce = __webpack_require__(14);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _diffTrackedElements = __webpack_require__(15);

	var _diffTrackedElements2 = _interopRequireDefault(_diffTrackedElements);

	var _endTrackedElements = __webpack_require__(17);

	var _endTrackedElements2 = _interopRequireDefault(_endTrackedElements);

	var _observers3 = __webpack_require__(10);

	var observerTypes = _interopRequireWildcard(_observers3);

	var _events3 = __webpack_require__(16);

	var eventTypes = _interopRequireWildcard(_events3);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventEmitter = _events2.default.EventEmitter;

	module.exports = exports.default = function () {
	    function _class() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	            tolerance: 0,
	            debounce: 100,
	            container: window
	        };

	        _classCallCheck(this, _class);

	        var tolerance = options.tolerance,
	            debounce = options.debounce,
	            container = options.container;


	        this._attached = false;
	        this._trackedElements = {};
	        this._tolerance = tolerance;
	        this._debounce = debounce;
	        this._container = container;
	        this._observers = (0, _observers2.default)(this._container);
	        this._handler = (0, _debounce2.default)(this._handlers.bind(this), this._debounce);
	        this._events = new EventEmitter();

	        this.attach();
	    }

	    _createClass(_class, [{
	        key: 'attach',
	        value: function attach() {
	            if (!this._attached) {
	                this._attached = true;
	                this._observers.on(this._handler);
	            }
	            return this;
	        }
	    }, {
	        key: 'detach',
	        value: function detach() {
	            if (this._attached) {
	                this._observers.off();
	                this._attached = false;
	            }
	            return this;
	        }
	    }, {
	        key: 'isViewable',
	        value: function isViewable(element) {
	            return (0, _validators2.default)(element, this._container, this._tolerance);
	        }
	    }, {
	        key: 'on',
	        value: function on(event, selector, callback) {
	            if (this._isViewableChangeEvent(event)) {
	                this._onViewableChange(event, selector, callback);
	            } else {
	                throw new Error('impression: event not accepted: ' + event);
	            }
	            return this;
	        }
	    }, {
	        key: 'once',
	        value: function once(event, selector, callback) {
	            if (this._isViewableChangeEvent(event)) {
	                this._onceViewableChange(event, selector, callback);
	            } else {
	                throw new Error('impression: event not accepted: ' + event);
	            }
	            return this;
	        }
	    }, {
	        key: 'off',
	        value: function off(event, selector, callback) {
	            this._offViewableChange(event, selector, callback);
	            return this;
	        }
	    }, {
	        key: 'onObservers',
	        value: function onObservers(event, callback) {
	            if (this._isObserverEvent(event)) {
	                this._events.on(event, callback);
	            } else {
	                throw new Error('impression: event not accepted: ' + event);
	            }
	            return this;
	        }
	    }, {
	        key: 'onceObservers',
	        value: function onceObservers(event, callback) {
	            if (this._isObserverEvent(event)) {
	                this._events.once(event, callback);
	            } else {
	                throw new Error('impression: event not accepted: ' + event);
	            }
	            return this;
	        }
	    }, {
	        key: 'offObservers',
	        value: function offObservers(event, callback) {
	            if (event) {
	                if (callback) {
	                    this._events.removeListener(event, callback);
	                } else {
	                    this._events.removeAllListeners(event);
	                }
	            } else {
	                this._events.removeAllListeners();
	            }
	            return this;
	        }
	    }, {
	        key: '_handlers',
	        value: function _handlers(type) {

	            this._events.emit(type);

	            var trackedElements = this._trackedElements;
	            if (type === observerTypes.UNLOAD) {
	                (0, _endTrackedElements2.default)(trackedElements, type);
	            } else {
	                (0, _diffTrackedElements2.default)(trackedElements, type, this.isViewable.bind(this));
	            }
	            return this;
	        }
	    }, {
	        key: '_onViewableChange',
	        value: function _onViewableChange(event, selector, callback) {
	            if (!this._trackedElements[selector]) {
	                this._trackedElements[selector] = {};
	            }
	            var tracked = this._trackedElements[selector];
	            if (!tracked.nodes) {
	                tracked.nodes = [];
	            }
	            if (!tracked.events) {
	                tracked.events = new EventEmitter();
	            }
	            tracked.events.on(event, callback);
	            return this;
	        }
	    }, {
	        key: '_onceViewableChange',
	        value: function _onceViewableChange(event, selector, callback) {
	            if (!this._trackedElements[selector]) {
	                this._trackedElements[selector] = {};
	            }
	            var tracked = this._trackedElements[selector];
	            if (!tracked.nodes) {
	                tracked.nodes = [];
	            }
	            if (!tracked.events) {
	                tracked.events = new EventEmitter();
	            }
	            tracked.events.once(event, callback);
	            return this;
	        }
	    }, {
	        key: '_offViewableChange',
	        value: function _offViewableChange(event, selector, callback) {
	            if (event) {
	                if (selector) {
	                    this._offViewableChangeBySelector(event, selector, callback);
	                } else {
	                    this._offViewableChangeByEvent(event);
	                }
	                this._cleanUpTracked();
	            } else {
	                this._offViewableChangeAll();
	            }
	            return this;
	        }
	    }, {
	        key: '_offViewableChangeBySelector',
	        value: function _offViewableChangeBySelector(event, selector, callback) {
	            var trackedElements = this._trackedElements;
	            if (callback) {
	                // event, selector, callback: remove single callback for this selector, this event
	                var tracked = trackedElements[selector];
	                if (tracked && tracked.events) {
	                    tracked.events.removeListener(event, callback);
	                }
	            } else {
	                // event, selector: remove all callbacks for this selector, this event
	                var _tracked = trackedElements[selector];
	                if (_tracked && _tracked.events) {
	                    _tracked.events.removeAllListeners(event);
	                }
	            }
	            return this;
	        }
	    }, {
	        key: '_offViewableChangeByEvent',
	        value: function _offViewableChangeByEvent(event) {
	            var trackedElements = this._trackedElements;
	            // event: remove all callbacks for all selectors, this event
	            Object.keys(trackedElements).forEach(function (selector) {
	                var tracked = trackedElements[selector];
	                if (tracked && tracked.events) {
	                    tracked.events.removeAllListeners(event);
	                }
	            });
	            return this;
	        }
	    }, {
	        key: '_offViewableChangeAll',
	        value: function _offViewableChangeAll() {
	            var trackedElements = this._trackedElements;
	            // : remove all callbacks for all selectors, all events
	            Object.keys(trackedElements).forEach(function (selector) {
	                // Reflect.deleteProperty(trackedElements, selector);
	                delete trackedElements[selector];
	            });
	            return this;
	        }
	    }, {
	        key: '_cleanUpTracked',
	        value: function _cleanUpTracked() {
	            var trackedElements = this._trackedElements;
	            // clean up useless tracked
	            Object.keys(trackedElements).forEach(function (selector) {
	                var tracked = trackedElements[selector];
	                if (tracked && tracked.events) {
	                    if (tracked.events.listenerCount(eventTypes.BEGIN) === 0 && tracked.events.listenerCount(eventTypes.END) === 0) {
	                        // Reflect.deleteProperty(trackedElements, selector);
	                        delete trackedElements[selector];
	                    }
	                }
	            });
	            return this;
	        }
	    }, {
	        key: '_isViewableChangeEvent',
	        value: function _isViewableChangeEvent(event) {
	            return Object.keys(eventTypes).some(function (constant) {
	                return eventTypes[constant] === event;
	            });
	        }
	    }, {
	        key: '_isObserverEvent',
	        value: function _isObserverEvent(event) {
	            return Object.keys(observerTypes).some(function (constant) {
	                return eventTypes[constant] === event;
	            });
	        }
	    }]);

	    return _class;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) {
	      listeners[i].apply(this, args);
	    }
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    }
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _attributes = __webpack_require__(3);

	var _attributes2 = _interopRequireDefault(_attributes);

	var _styles = __webpack_require__(4);

	var _styles2 = _interopRequireDefault(_styles);

	var _inContainer = __webpack_require__(5);

	var _inContainer2 = _interopRequireDefault(_inContainer);

	var _onScreen = __webpack_require__(6);

	var _onScreen2 = _interopRequireDefault(_onScreen);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * check if an element is viewable
	 * @param element {Node}
	 * @param container {Node}
	 * @param tolerance {Number}
	 * @returns {boolean}
	 */
	/**
	 * @since 2016-10-30 14:52
	 * @author vivaxy
	 */

	exports.default = function (element, container, tolerance) {
	    var visible = true;
	    var currentNode = element;

	    if (container === window) {
	        visible = (0, _onScreen2.default)(element, tolerance);
	    } else {
	        visible = (0, _inContainer2.default)(element, container, tolerance);
	    }

	    while (currentNode.parentNode && visible) {
	        visible = (0, _attributes2.default)(currentNode) && (0, _styles2.default)(currentNode);
	        currentNode = currentNode.parentNode;
	    }
	    return visible;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @since 2016-10-30 14:49
	 * @author vivaxy
	 */

	var attributesToCheck = {
	    hidden: true
	};

	exports.default = function (element) {
	    return !Object.keys(attributesToCheck).some(function (attr) {
	        return element[attr] === attributesToCheck[attr];
	    });
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @since 2016-10-30 14:53
	 * @author vivaxy
	 */

	var stylesToCheck = {
	    display: 'none',
	    visibility: 'hidden'
	};

	exports.default = function (element) {
	    var style = window.getComputedStyle(element);
	    return !Object.keys(stylesToCheck).some(function (attr) {
	        return style[attr] === stylesToCheck[attr];
	    });
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	/**
	 * @since 2016-10-30 14:59
	 * @author vivaxy
	 */

	exports.default = function (element) {
	    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
	    var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


	    var containerRect = container.getBoundingClientRect();

	    var top = element.offsetTop + tolerance < containerRect.height + container.scrollTop;
	    var bottom = element.offsetTop + element.clientHeight - tolerance > container.scrollTop;
	    var left = element.offsetLeft + tolerance < containerRect.width + container.scrollLeft;
	    var right = element.offsetLeft + element.clientWidth - tolerance > container.scrollLeft;

	    return top && bottom && left && right;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	/**
	 * @since 2016-10-30 14:55
	 * @author vivaxy
	 */

	exports.default = function (element, tolerance) {

	    var rect = element.getBoundingClientRect();
	    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
	    var windowWidth = window.innerWidth || document.documentElement.clientWidth;

	    var elementHeight = element.offsetHeight;
	    var elementWidth = element.offsetWidth;

	    var onScreenHeight = tolerance > elementHeight ? elementHeight : tolerance;
	    var onScreenWidth = tolerance > elementWidth ? elementWidth : tolerance;

	    // top
	    var elementBottomToWindowTop = rect.top + elementHeight;
	    var bottomBoundingOnScreen = elementBottomToWindowTop >= onScreenHeight;

	    // bottom
	    var elementTopToWindowBottom = windowHeight - (rect.bottom - elementHeight);
	    var topBoundingOnScreen = elementTopToWindowBottom >= onScreenHeight;

	    // left
	    var elementRightToWindowLeft = rect.left + elementWidth;
	    var rightBoundingOnScreen = elementRightToWindowLeft >= onScreenWidth;

	    // right
	    var elementLeftToWindowRight = windowWidth - (rect.right - elementWidth);
	    var leftBoundingOnScreen = elementLeftToWindowRight >= onScreenWidth;

	    return bottomBoundingOnScreen && topBoundingOnScreen && rightBoundingOnScreen && leftBoundingOnScreen;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mutation = __webpack_require__(8);

	var _mutation2 = _interopRequireDefault(_mutation);

	var _resize = __webpack_require__(11);

	var _resize2 = _interopRequireDefault(_resize);

	var _scroll = __webpack_require__(12);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _unload = __webpack_require__(13);

	var _unload2 = _interopRequireDefault(_unload);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @since 2016-10-30 15:12
	 * @author vivaxy
	 */

	exports.default = function (container) {
	    var mutationListener = (0, _mutation2.default)(document.body);
	    var resizeListener = (0, _resize2.default)(container);
	    var scrollListener = (0, _scroll2.default)(container);
	    var unloadListener = (0, _unload2.default)();

	    var on = function on(callback) {
	        mutationListener.on(callback);
	        resizeListener.on(callback);
	        scrollListener.on(callback);
	        unloadListener.on(callback);
	        return true;
	    };

	    var off = function off() {
	        mutationListener.off();
	        resizeListener.off();
	        scrollListener.off();
	        unloadListener.off();
	        return true;
	    };

	    return {
	        on: on,
	        off: off
	    };
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _presets = __webpack_require__(9);

	var _presets2 = _interopRequireDefault(_presets);

	var _observers = __webpack_require__(10);

	var observers = _interopRequireWildcard(_observers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @since 2016-10-30 14:24
	 * @author vivaxy
	 */

	var DOM_NODE_INSERTED = 'DOMNodeInserted';
	var DOM_NODE_REMOVED = 'DOMNodeRemoved';
	var DOM_ATTR_MODIFIED = 'DOMAttrModified';
	var DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified';

	exports.default = function (container) {
	    var attached = void 0;
	    var mutationObserver = void 0;
	    var _callback = void 0;

	    var on = function on(callback) {
	        if (attached) {
	            return false;
	        } else {
	            attached = true;
	            _callback = function _callback() {
	                return callback(observers.MUTATION);
	            };
	            (0, _presets2.default)(container);
	            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	            if (MutationObserver) {
	                mutationObserver = new MutationObserver(_callback);
	                mutationObserver.observe(container, {
	                    childList: true,
	                    attributes: true,
	                    subtree: true
	                });
	            } else {
	                container.addEventListener(DOM_NODE_INSERTED, _callback);
	                container.addEventListener(DOM_NODE_REMOVED, _callback);
	                container.addEventListener(DOM_ATTR_MODIFIED, _callback);
	                container.addEventListener(DOM_SUBTREE_MODIFIED, _callback);
	            }
	            return true;
	        }
	    };

	    var off = function off() {
	        if (attached) {
	            if (mutationObserver) {
	                mutationObserver.disconnect();
	            } else {
	                container.removeEventListener(DOM_NODE_INSERTED, _callback);
	                container.removeEventListener(DOM_NODE_REMOVED, _callback);
	                container.removeEventListener(DOM_ATTR_MODIFIED, _callback);
	                container.removeEventListener(DOM_SUBTREE_MODIFIED, _callback);
	            }
	            attached = false;
	            return true;
	        } else {
	            return false;
	        }
	    };

	    return {
	        on: on,
	        off: off
	    };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @since 2016-10-30 14:35
	 * @author vivaxy
	 */

	var STATIC = 'static';
	var RELATIVE = 'relative';

	exports.default = function (container) {
	    // for calculating offset
	    if (container instanceof HTMLElement) {
	        var style = window.getComputedStyle(container);

	        if (style.position === STATIC) {
	            container.style.position = RELATIVE;
	        }
	    }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @since 2016-11-05 09:37
	 * @author vivaxy
	 */

	var MUTATION = exports.MUTATION = 'mutation';
	var RESIZE = exports.RESIZE = 'resize';
	var SCROLL = exports.SCROLL = 'scroll';
	var UNLOAD = exports.UNLOAD = 'unload';

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _presets = __webpack_require__(9);

	var _presets2 = _interopRequireDefault(_presets);

	var _observers = __webpack_require__(10);

	var observers = _interopRequireWildcard(_observers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @since 2016-10-30 14:24
	 * @author vivaxy
	 */

	var RESIZE = 'resize';

	exports.default = function (container) {
	    var attached = false;
	    var _callback = void 0;

	    var on = function on(callback) {
	        if (attached) {
	            return false;
	        } else {
	            attached = true;
	            _callback = function _callback() {
	                return callback(observers.RESIZE);
	            };
	            (0, _presets2.default)(container);
	            container.addEventListener(RESIZE, _callback);
	            return true;
	        }
	    };

	    var off = function off() {
	        if (attached) {
	            container.removeEventListener(RESIZE, _callback);
	            attached = false;
	            return true;
	        } else {
	            return false;
	        }
	    };

	    return {
	        on: on,
	        off: off
	    };
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _presets = __webpack_require__(9);

	var _presets2 = _interopRequireDefault(_presets);

	var _observers = __webpack_require__(10);

	var observers = _interopRequireWildcard(_observers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @since 2016-10-30 14:17
	 * @author vivaxy
	 */

	var SCROLL = 'scroll';

	exports.default = function (container) {
	    var attached = false;
	    var _callback = void 0;

	    var on = function on(callback) {
	        if (attached) {
	            return false;
	        } else {
	            attached = true;
	            _callback = function _callback() {
	                return callback(observers.SCROLL);
	            };
	            (0, _presets2.default)(container);
	            container.addEventListener(SCROLL, _callback);

	            return true;
	        }
	    };

	    var off = function off() {
	        if (attached) {
	            container.removeEventListener(SCROLL, _callback);
	            attached = false;
	            return true;
	        } else {
	            return false;
	        }
	    };

	    return {
	        on: on,
	        off: off
	    };
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _observers = __webpack_require__(10);

	var observers = _interopRequireWildcard(_observers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var BEFORE_UNLOAD = 'beforeunload'; /**
	                                     * @since 2016-11-05 09:32
	                                     * @author vivaxy
	                                     */

	exports.default = function () {
	    var attached = false;
	    var _callback = void 0;

	    var on = function on(callback) {
	        if (attached) {
	            return false;
	        } else {
	            attached = true;
	            _callback = function _callback() {
	                return callback(observers.UNLOAD);
	            };
	            window.addEventListener(BEFORE_UNLOAD, _callback);
	            return true;
	        }
	    };

	    var off = function off() {
	        if (attached) {
	            window.removeEventListener(BEFORE_UNLOAD, _callback);
	            attached = false;
	            return true;
	        } else {
	            return false;
	        }
	    };

	    return {
	        on: on,
	        off: off
	    };
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	/**
	 * @since 2016-10-30 14:47
	 * @author vivaxy
	 */

	exports.default = function (callback, timeout) {
	    var timer = void 0;

	    return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        clearTimeout(timer);

	        timer = setTimeout(function () {
	            callback.apply(undefined, args);
	        }, timeout);
	    };
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _events = __webpack_require__(16);

	var eventTypes = _interopRequireWildcard(_events);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var diffBySelector = function diffBySelector(selector, tracked, isViewable, type) {
	    var previousNodes = tracked.nodes;

	    tracked.nodes = [];

	    var currentNodes = document.querySelectorAll(selector);

	    Array.prototype.forEach.call(currentNodes, function (currentNode) {
	        var wasVisible = false;
	        if (previousNodes) {
	            previousNodes.forEach(function (previousItem) {
	                var previousNode = previousItem.node;
	                if (!previousItem.marked && previousNode === currentNode) {
	                    wasVisible = previousItem.isVisible;
	                    previousItem.marked = true;
	                }
	            });
	        }

	        var item = {
	            isVisible: isViewable(currentNode),
	            wasVisible: wasVisible,
	            node: currentNode
	        };

	        tracked.nodes.push(item);

	        if (item.isVisible === true && item.wasVisible === false) {
	            tracked.events.emit(eventTypes.BEGIN, currentNode, {
	                type: type
	            });
	        }
	        if (item.isVisible === false && item.wasVisible === true) {
	            tracked.events.emit(eventTypes.END, currentNode, {
	                type: type
	            });
	        }
	    });

	    if (previousNodes) {
	        // for removed nodes
	        previousNodes.forEach(function (previousItem) {
	            if (!previousItem.marked) {
	                if (previousItem.isVisible) {
	                    tracked.events.emit(eventTypes.END, previousItem.node, {
	                        type: type
	                    });
	                }
	            }
	        });
	    }
	}; /**
	    * @since 2016-11-05 10:01
	    * @author vivaxy
	    */

	exports.default = function (trackedElements, type, isViewable) {
	    var selectors = Object.keys(trackedElements);
	    selectors.forEach(function (selector) {
	        var tracked = trackedElements[selector];
	        diffBySelector(selector, tracked, isViewable, type);
	    });
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @since 2016-11-05 10:13
	 * @author vivaxy
	 */

	var BEGIN = exports.BEGIN = 'begin';
	var END = exports.END = 'end';

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _events = __webpack_require__(16);

	var eventTypes = _interopRequireWildcard(_events);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var endBySelector = function endBySelector(selector, tracked, type) {
	    var previousNodes = tracked.nodes;
	    if (previousNodes) {
	        previousNodes.forEach(function (previousItem) {
	            var previousNode = previousItem.node;
	            if (previousNode.isVisible) {
	                tracked.events.emit(eventTypes.END, previousItem.node, {
	                    type: type
	                });
	            }
	        });
	    }
	}; /**
	    * @since 2016-11-05 10:06
	    * @author vivaxy
	    */

	exports.default = function (trackedElements, type) {
	    var selectors = Object.keys(trackedElements);
	    selectors.forEach(function (selector) {
	        var tracked = trackedElements[selector];
	        endBySelector(selector, tracked);
	    });
	};

/***/ }
/******/ ])
});
;