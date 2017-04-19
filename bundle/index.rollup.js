(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module) {
'use strict';

var has = Object.prototype.hasOwnProperty,
    prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = [],
      events,
      name;

  if (this._eventsCount === 0) return names;

  for (name in events = this._events) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event,
      available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt],
      len = arguments.length,
      args,
      i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1:
        return listeners.fn.call(listeners.context), true;
      case 2:
        return listeners.fn.call(listeners.context, a1), true;
      case 3:
        return listeners.fn.call(listeners.context, a1, a2), true;
      case 4:
        return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len - 1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length,
        j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1:
          listeners[i].fn.call(listeners[i].context);break;
        case 2:
          listeners[i].fn.call(listeners[i].context, a1);break;
        case 3:
          listeners[i].fn.call(listeners[i].context, a1, a2);break;
        case 4:
          listeners[i].fn.call(listeners[i].context, a1, a2, a3);break;
        default:
          if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this),
      evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;else if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true),
      evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;else if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
      if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

/**
 * @since 2016-10-30 14:49
 * @author vivaxy
 */

var attributesToCheck = {
    hidden: true
};

var attributesValidator = (function (element) {
    return !Object.keys(attributesToCheck).some(function (attr) {
        return element[attr] === attributesToCheck[attr];
    });
});

/**
 * @since 2016-10-30 14:53
 * @author vivaxy
 */

var stylesToCheck = {
    display: 'none',
    visibility: 'hidden'
};

var stylesValidator = (function (element) {
    var style = window.getComputedStyle(element);
    return !Object.keys(stylesToCheck).some(function (attr) {
        return style[attr] === stylesToCheck[attr];
    });
});

/**
 * @since 2016-10-30 14:59
 * @author vivaxy
 */

var inContainer = (function (element) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
    var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


    var containerRect = container.getBoundingClientRect();

    var top = element.offsetTop + tolerance < containerRect.height + container.scrollTop;
    var bottom = element.offsetTop + element.clientHeight - tolerance > container.scrollTop;
    var left = element.offsetLeft + tolerance < containerRect.width + container.scrollLeft;
    var right = element.offsetLeft + element.clientWidth - tolerance > container.scrollLeft;

    return top && bottom && left && right;
});

/**
 * @since 2016-10-30 14:55
 * @author vivaxy
 */

var onScreen = (function (element, tolerance) {

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
});

/**
 * @since 2016-10-30 14:52
 * @author vivaxy
 */

/**
 * check if an element is viewable
 * @param element {Node}
 * @param container {Node}
 * @param tolerance {Number}
 * @returns {boolean}
 */
var validators = (function (element, container, tolerance) {
    var visible = true;
    var currentNode = element;

    if (container === window) {
        visible = onScreen(element, tolerance);
    } else {
        visible = inContainer(element, container, tolerance);
    }

    while (currentNode.parentNode && visible) {
        visible = attributesValidator(currentNode) && stylesValidator(currentNode);
        currentNode = currentNode.parentNode;
    }
    return visible;
});

/**
 * @since 2016-10-30 14:35
 * @author vivaxy
 */

var STATIC = 'static';
var RELATIVE = 'relative';

var presets = (function (container) {
    // for calculating offset
    if (container instanceof HTMLElement) {
        var style = window.getComputedStyle(container);

        if (style.position === STATIC) {
            container.style.position = RELATIVE;
        }
    }
});

/**
 * @since 2016-11-05 09:37
 * @author vivaxy
 */

var MUTATION = 'mutation';
var RESIZE = 'resize';
var SCROLL = 'scroll';
var UNLOAD = 'unload';

var observerTypes = Object.freeze({
	MUTATION: MUTATION,
	RESIZE: RESIZE,
	SCROLL: SCROLL,
	UNLOAD: UNLOAD
});

/**
 * @since 2016-10-30 14:24
 * @author vivaxy
 */

var DOM_NODE_INSERTED = 'DOMNodeInserted';
var DOM_NODE_REMOVED = 'DOMNodeRemoved';
var DOM_ATTR_MODIFIED = 'DOMAttrModified';
var DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified';

var mutationEvents = (function (container) {
    var attached = void 0;
    var mutationObserver = void 0;
    var _callback = void 0;

    var on = function on(callback) {
        if (attached) {
            return false;
        } else {
            attached = true;
            _callback = function _callback() {
                return callback(MUTATION);
            };
            presets(container);
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
});

/**
 * @since 2016-10-30 14:24
 * @author vivaxy
 */

var RESIZE$1 = 'resize';

var resizeEvents = (function (container) {
    var attached = false;
    var _callback = void 0;

    var on = function on(callback) {
        if (attached) {
            return false;
        } else {
            attached = true;
            _callback = function _callback() {
                return callback(RESIZE);
            };
            presets(container);
            container.addEventListener(RESIZE$1, _callback);
            return true;
        }
    };

    var off = function off() {
        if (attached) {
            container.removeEventListener(RESIZE$1, _callback);
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
});

/**
 * @since 2016-10-30 14:17
 * @author vivaxy
 */

var SCROLL$1 = 'scroll';

var scrollEvents = (function (container) {
    var attached = false;
    var _callback = void 0;

    var on = function on(callback) {
        if (attached) {
            return false;
        } else {
            attached = true;
            _callback = function _callback() {
                return callback(SCROLL);
            };
            presets(container);
            container.addEventListener(SCROLL$1, _callback);

            return true;
        }
    };

    var off = function off() {
        if (attached) {
            container.removeEventListener(SCROLL$1, _callback);
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
});

/**
 * @since 2016-11-05 09:32
 * @author vivaxy
 */

var BEFORE_UNLOAD = 'beforeunload';

var unloadEvents = (function () {
    var attached = false;
    var _callback = void 0;

    var on = function on(callback) {
        if (attached) {
            return false;
        } else {
            attached = true;
            _callback = function _callback() {
                return callback(UNLOAD);
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
});

/**
 * @since 2016-10-30 15:12
 * @author vivaxy
 */

var getObservers = (function (container) {
    var mutationListener = mutationEvents(document.body);
    var resizeListener = resizeEvents(container);
    var scrollListener = scrollEvents(container);
    var unloadListener = unloadEvents();

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
});

/**
 * @since 2016-10-30 14:47
 * @author vivaxy
 */

var debounceCallback = (function (callback, timeout) {
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
});

/**
 * @since 2016-11-05 10:13
 * @author vivaxy
 */

var BEGIN = 'begin';
var END = 'end';

var eventTypes = Object.freeze({
	BEGIN: BEGIN,
	END: END
});

/**
 * @since 2016-11-05 10:01
 * @author vivaxy
 */

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
            tracked.events.emit(BEGIN, currentNode, {
                type: type
            });
        }
        if (item.isVisible === false && item.wasVisible === true) {
            tracked.events.emit(END, currentNode, {
                type: type
            });
        }
    });

    if (previousNodes) {
        // for removed nodes
        previousNodes.forEach(function (previousItem) {
            if (!previousItem.marked) {
                if (previousItem.isVisible) {
                    tracked.events.emit(END, previousItem.node, {
                        type: type
                    });
                }
            }
        });
    }
};

var diffTrackedElements = (function (trackedElements, type, isViewable) {
    var selectors = Object.keys(trackedElements);
    selectors.forEach(function (selector) {
        var tracked = trackedElements[selector];
        diffBySelector(selector, tracked, isViewable, type);
    });
});

/**
 * @since 2016-11-05 10:06
 * @author vivaxy
 */

var endBySelector = function endBySelector(selector, tracked, type) {
    var previousNodes = tracked.nodes;
    if (previousNodes) {
        previousNodes.forEach(function (previousItem) {
            var previousNode = previousItem.node;
            if (previousNode.isVisible) {
                tracked.events.emit(END, previousItem.node, {
                    type: type
                });
            }
        });
    }
};

var endTrackedElements = (function (trackedElements, type) {
    var selectors = Object.keys(trackedElements);
    selectors.forEach(function (selector) {
        var tracked = trackedElements[selector];
        endBySelector(selector, tracked);
    });
});

/**
 * @since 2016-11-05 11:11
 * @author vivaxy
 */

var isValueIn = (function (value, object) {
    return Object.keys(object).some(function (constant) {
        return object[constant] === value;
    });
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * @since 2016-10-28 12:21
 * @author vivaxy
 */

module.exports = exports.default = function () {
    function Impression() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$tolerance = _ref.tolerance,
            tolerance = _ref$tolerance === undefined ? 0 : _ref$tolerance,
            _ref$debounce = _ref.debounce,
            debounce = _ref$debounce === undefined ? 100 : _ref$debounce,
            _ref$container = _ref.container,
            container = _ref$container === undefined ? window : _ref$container;

        classCallCheck(this, Impression);

        this._attached = false;
        this._trackedElements = {};
        this._tolerance = tolerance;
        this._debounce = debounce;
        this._container = container;
        this._observers = getObservers(this._container);
        this._handler = debounceCallback(this._handlers.bind(this), this._debounce);
        this._events = new index();

        this.attach();
    }

    createClass(Impression, [{
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
            return validators(element, this._container, this._tolerance);
        }
    }, {
        key: 'on',
        value: function on(event, selector, callback) {
            if (isValueIn(event, eventTypes)) {
                this._onViewableChange(event, selector, callback);
            } else {
                throw new Error('impression: event not accepted: ' + event);
            }
            return this;
        }
    }, {
        key: 'once',
        value: function once(event, selector, callback) {
            if (isValueIn(event, eventTypes)) {
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
            if (isValueIn(event, observerTypes)) {
                this._events.on(event, callback);
            } else {
                throw new Error('impression: event not accepted: ' + event);
            }
            return this;
        }
    }, {
        key: 'onceObservers',
        value: function onceObservers(event, callback) {
            if (isValueIn(event, observerTypes)) {
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
            if (type === UNLOAD) {
                endTrackedElements(trackedElements, type);
            } else {
                diffTrackedElements(trackedElements, type, this.isViewable.bind(this));
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
                tracked.events = new index();
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
                tracked.events = new index();
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
                    if (tracked.events.listeners(BEGIN).length === 0 && tracked.events.listeners(END).length === 0) {
                        // Reflect.deleteProperty(trackedElements, selector);
                        delete trackedElements[selector];
                    }
                }
            });
            return this;
        }
    }]);
    return Impression;
}();

})));
