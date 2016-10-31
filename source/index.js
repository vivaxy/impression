/**
 * @since 2016-10-28 12:21
 * @author vivaxy
 */

import events from 'events';

import validators from './lib/validators';
import getObservers from './lib/observers';
import debounceCallback from './lib/debounce';

const EventEmitter = events.EventEmitter;
const BEGIN = 'begin';
const END = 'end';

module.exports = exports.default = class {

    constructor(options = {
        tolerance: 0,
        debounce: 100,
        container: window,
    }) {
        const {
            tolerance,
            debounce,
            container,
        } = options;

        // todo validate options

        this._attached = false;
        this._trackedElements = {};
        this._tolerance = tolerance;
        this._debounce = debounce;
        this._container = container;
        this._observers = getObservers(this._container);
        this._handler = debounceCallback(::this._handlers, this._debounce);
        this._events = new EventEmitter();

        this.attach();
    }

    attach() {
        if (!this._attached) {
            this._attached = true;
            this._observers.on(this._handler);
        }
        return this;
    }

    detach() {
        if (this._attached) {
            this._observers.off(this._handler);
            this._attached = false;
        }
        return this;
    }

    isViewable(element) {
        return validators(element, this._container, this._tolerance);
    }

    once(event, selector, callback) {
        if (!this._trackedElements[selector]) {
            this._trackedElements[selector] = {};
        }
        const tracked = this._trackedElements[selector];
        if (!tracked.nodes) {
            tracked.nodes = [];
        }
        if (!tracked.events) {
            tracked.events = new EventEmitter();
        }
        tracked.events.once(event, callback);
        return this;
    }

    on(event, selector, callback) {
        if (!this._trackedElements[selector]) {
            this._trackedElements[selector] = {};
        }
        const tracked = this._trackedElements[selector];
        if (!tracked.nodes) {
            tracked.nodes = [];
        }
        if (!tracked.events) {
            tracked.events = new EventEmitter();
        }
        tracked.events.on(event, callback);
        return this;
    }

    off(event, selector, callback) {
        const trackedElements = this._trackedElements;

        if (event) {
            if (selector) {
                if (callback) {
                    // event, selector, callback: remove single callback for this selector, this event
                    const tracked = trackedElements[selector];
                    if (tracked && tracked.events) {
                        tracked.events.removeListener(event, callback);
                    }
                } else {
                    // event, selector: remove all callbacks for this selector, this event
                    const tracked = trackedElements[selector];
                    if (tracked && tracked.events) {
                        tracked.events.removeAllListeners(event);
                    }
                }
            } else {
                // event: remove all callbacks for all selectors, this event
                Object.keys(trackedElements).forEach((selector) => {
                    const tracked = trackedElements[selector];
                    if (tracked && tracked.events) {
                        tracked.events.removeAllListeners(event);
                    }
                });
            }
            // clean up useless tracked
            Object.keys(trackedElements).forEach((selector) => {
                const tracked = trackedElements[selector];
                if (tracked && tracked.events) {
                    if (tracked.events.listenerCount(BEGIN) === 0 && tracked.events.listenerCount(END) === 0) {
                        // Reflect.deleteProperty(trackedElements, selector);
                        delete trackedElements[selector];
                    }
                }
            });
        } else {
            // : remove all callbacks for all selectors, all events
            Object.keys(trackedElements).forEach((selector) => {
                // Reflect.deleteProperty(trackedElements, selector);
                delete trackedElements[selector];
            });
        }
        return this;
    }

    _handlers() {

        const trackedElements = this._trackedElements;
        const selectors = Object.keys(trackedElements);

        selectors.forEach((selector) => {
            const tracked = trackedElements[selector];
            const previousNodes = tracked.nodes;

            tracked.nodes = [];

            const currentNodes = document.querySelectorAll(selector);

            Array.prototype.forEach.call(currentNodes, (currentNode) => {
                let wasVisible = false;
                if (previousNodes) {
                    previousNodes.forEach((previousItem) => {
                        const previousNode = previousItem.node;
                        if (!previousItem.marked && previousNode === currentNode) {
                            wasVisible = previousItem.isVisible;
                            previousItem.marked = true;
                        }
                    });
                }

                const item = {
                    isVisible: this.isViewable(currentNode),
                    wasVisible,
                    node: currentNode
                };

                tracked.nodes.push(item);

                if (item.isVisible === true && item.wasVisible === false) {
                    tracked.events.emit(BEGIN, selector, currentNode);
                }
                if (item.isVisible === false && item.wasVisible === true) {
                    tracked.events.emit(END, selector, currentNode);
                }
            });

            if (previousNodes) {
                // for removed nodes
                previousNodes.forEach((previousItem) => {
                    if (!previousItem.marked) {
                        if (previousItem.isVisible) {
                            tracked.events.emit(END, selector, previousItem.node);
                        }
                    }
                });
            }
        });

        return this;
    }

};
