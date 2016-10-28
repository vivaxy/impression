/**
 * @since 2016-10-28 12:21
 * @author vivaxy
 */

import events  from 'events';

const EventEmitter = events.EventEmitter;

export default class Impression extends EventEmitter {

    constructor(options = {
        tolerance: 0,
        debounce: 100,
        container: window
    }) {
        super();

    }

}
