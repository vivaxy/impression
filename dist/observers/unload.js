'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _observers = require('../configs/observers');

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