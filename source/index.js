/**
 * @since 2016-10-28 12:21
 * @author vivaxy
 */

import EventEmitter from 'eventemitter3';

import validators from './lib/validators';
import getObservers from './lib/observers';
import debounceCallback from './lib/debounce';
import diffTrackedElements from './lib/diffTrackedElements';
import endTrackedElements from './lib/endTrackedElements';
import isValueIn from './lib/isValueIn';

import * as observerTypes from './configs/observers';
import * as eventTypes from './configs/events';

module.exports = exports.default = class Impression {

    constructor({ tolerance = 0, debounce = 100, container = window } = {}) {
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
            this._observers.off();
            this._attached = false;
        }
        return this;
    }

    isViewable(element) {
        return validators(element, this._container, this._tolerance);
    }

    on(event, selector, callback) {
        if (isValueIn(event, eventTypes)) {
            this._onViewableChange(event, selector, callback);
        } else {
            throw new Error(`impression: event not accepted: ${event}`);
        }
        return this;
    }

    once(event, selector, callback) {
        if (isValueIn(event, eventTypes)) {
            this._onceViewableChange(event, selector, callback);
        } else {
            throw new Error(`impression: event not accepted: ${event}`);
        }
        return this;
    }

    off(event, selector, callback) {
        this._offViewableChange(event, selector, callback);
        return this;
    }

    onObservers(event, callback) {
        if (isValueIn(event, observerTypes)) {
            this._events.on(event, callback);
        } else {
            throw new Error(`impression: event not accepted: ${event}`);
        }
        return this;
    }

    onceObservers(event, callback) {
        if (isValueIn(event, observerTypes)) {
            this._events.once(event, callback);
        } else {
            throw new Error(`impression: event not accepted: ${event}`);
        }
        return this;
    }

    offObservers(event, callback) {
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

    _handlers(type) {

        this._events.emit(type);

        const trackedElements = this._trackedElements;
        if (type === observerTypes.UNLOAD) {
            endTrackedElements(trackedElements, type);
        } else {
            diffTrackedElements(trackedElements, type, ::this.isViewable);
        }
        return this;
    }

    _onViewableChange(event, selector, callback) {
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

    _onceViewableChange(event, selector, callback) {
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

    _offViewableChange(event, selector, callback) {
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

    _offViewableChangeBySelector(event, selector, callback) {
        const trackedElements = this._trackedElements;
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
        return this;
    }

    _offViewableChangeByEvent(event) {
        const trackedElements = this._trackedElements;
        // event: remove all callbacks for all selectors, this event
        Object.keys(trackedElements).forEach((selector) => {
            const tracked = trackedElements[selector];
            if (tracked && tracked.events) {
                tracked.events.removeAllListeners(event);
            }
        });
        return this;
    }

    _offViewableChangeAll() {
        const trackedElements = this._trackedElements;
        // : remove all callbacks for all selectors, all events
        Object.keys(trackedElements).forEach((selector) => {
            // Reflect.deleteProperty(trackedElements, selector);
            delete trackedElements[selector];
        });
        return this;
    }

    _cleanUpTracked() {
        const trackedElements = this._trackedElements;
        // clean up useless tracked
        Object.keys(trackedElements).forEach((selector) => {
            const tracked = trackedElements[selector];
            if (tracked && tracked.events) {
                if (tracked.events.listeners(eventTypes.BEGIN).length === 0 &&
                    tracked.events.listeners(eventTypes.END).length === 0) {
                    // Reflect.deleteProperty(trackedElements, selector);
                    delete trackedElements[selector];
                }
            }
        });
        return this;
    }

};
