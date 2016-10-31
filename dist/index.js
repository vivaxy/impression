'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since 2016-10-28 12:21
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author vivaxy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _validators = require('./lib/validators');

var _validators2 = _interopRequireDefault(_validators);

var _observers = require('./lib/observers');

var _observers2 = _interopRequireDefault(_observers);

var _debounce = require('./lib/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = _events2.default.EventEmitter;
var BEGIN = 'begin';
var END = 'end';

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

        // todo validate options

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
                this._observers.off(this._handler);
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
        key: 'once',
        value: function once(event, selector, callback) {
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
        key: 'on',
        value: function on(event, selector, callback) {
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
        key: 'off',
        value: function off(event, selector, callback) {
            var trackedElements = this._trackedElements;

            if (event) {
                if (selector) {
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
                } else {
                    // event: remove all callbacks for all selectors, this event
                    Object.keys(trackedElements).forEach(function (selector) {
                        var tracked = trackedElements[selector];
                        if (tracked && tracked.events) {
                            tracked.events.removeAllListeners(event);
                        }
                    });
                }
                // clean up useless tracked
                Object.keys(trackedElements).forEach(function (selector) {
                    var tracked = trackedElements[selector];
                    if (tracked && tracked.events) {
                        if (tracked.events.listenerCount(BEGIN) === 0 && tracked.events.listenerCount(END) === 0) {
                            // Reflect.deleteProperty(trackedElements, selector);
                            delete trackedElements[selector];
                        }
                    }
                });
            } else {
                // : remove all callbacks for all selectors, all events
                Object.keys(trackedElements).forEach(function (selector) {
                    // Reflect.deleteProperty(trackedElements, selector);
                    delete trackedElements[selector];
                });
            }
            return this;
        }
    }, {
        key: '_handlers',
        value: function _handlers() {
            var _this = this;

            var trackedElements = this._trackedElements;
            var selectors = Object.keys(trackedElements);

            selectors.forEach(function (selector) {
                var tracked = trackedElements[selector];
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
                        isVisible: _this.isViewable(currentNode),
                        wasVisible: wasVisible,
                        node: currentNode
                    };

                    tracked.nodes.push(item);

                    if (item.isVisible === true && item.wasVisible === false) {
                        tracked.events.emit(BEGIN, currentNode);
                    }
                    if (item.isVisible === false && item.wasVisible === true) {
                        tracked.events.emit(END, currentNode);
                    }
                });

                if (previousNodes) {
                    // for removed nodes
                    previousNodes.forEach(function (previousItem) {
                        if (!previousItem.marked) {
                            if (previousItem.isVisible) {
                                tracked.events.emit(END, previousItem.node);
                            }
                        }
                    });
                }
            });

            return this;
        }
    }]);

    return _class;
}();