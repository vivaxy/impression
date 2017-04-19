'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since 2016-10-28 12:21
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author vivaxy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _validators = require('./lib/validators');

var _validators2 = _interopRequireDefault(_validators);

var _observers = require('./lib/observers');

var _observers2 = _interopRequireDefault(_observers);

var _debounce = require('./lib/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _diffTrackedElements = require('./lib/diffTrackedElements');

var _diffTrackedElements2 = _interopRequireDefault(_diffTrackedElements);

var _endTrackedElements = require('./lib/endTrackedElements');

var _endTrackedElements2 = _interopRequireDefault(_endTrackedElements);

var _isValueIn = require('./lib/isValueIn');

var _isValueIn2 = _interopRequireDefault(_isValueIn);

var _observers3 = require('./configs/observers');

var observerTypes = _interopRequireWildcard(_observers3);

var _events = require('./configs/events');

var eventTypes = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = exports.default = function () {
    function Impression() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$tolerance = _ref.tolerance,
            tolerance = _ref$tolerance === undefined ? 0 : _ref$tolerance,
            _ref$debounce = _ref.debounce,
            debounce = _ref$debounce === undefined ? 100 : _ref$debounce,
            _ref$container = _ref.container,
            container = _ref$container === undefined ? window : _ref$container;

        _classCallCheck(this, Impression);

        this._attached = false;
        this._trackedElements = {};
        this._tolerance = tolerance;
        this._debounce = debounce;
        this._container = container;
        this._observers = (0, _observers2.default)(this._container);
        this._handler = (0, _debounce2.default)(this._handlers.bind(this), this._debounce);
        this._events = new _eventemitter2.default();

        this.attach();
    }

    _createClass(Impression, [{
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
            if ((0, _isValueIn2.default)(event, eventTypes)) {
                this._onViewableChange(event, selector, callback);
            } else {
                throw new Error('impression: event not accepted: ' + event);
            }
            return this;
        }
    }, {
        key: 'once',
        value: function once(event, selector, callback) {
            if ((0, _isValueIn2.default)(event, eventTypes)) {
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
            if ((0, _isValueIn2.default)(event, observerTypes)) {
                this._events.on(event, callback);
            } else {
                throw new Error('impression: event not accepted: ' + event);
            }
            return this;
        }
    }, {
        key: 'onceObservers',
        value: function onceObservers(event, callback) {
            if ((0, _isValueIn2.default)(event, observerTypes)) {
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
                tracked.events = new _eventemitter2.default();
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
                tracked.events = new _eventemitter2.default();
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
                    if (tracked.events.listeners(eventTypes.BEGIN).length === 0 && tracked.events.listeners(eventTypes.END).length === 0) {
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