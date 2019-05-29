'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _presets = require('../lib/presets');

var _presets2 = _interopRequireDefault(_presets);

var _observers = require('../configs/observers');

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
            // `scroll` event not propagation when it happens in an element. Bind event at capture resolve this problem.
            container.addEventListener(SCROLL, _callback, true);

            return true;
        }
    };

    var off = function off() {
        if (attached) {
            container.removeEventListener(SCROLL, _callback, true);
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