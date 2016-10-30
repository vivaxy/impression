'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _presets = require('../lib/presets');

var _presets2 = _interopRequireDefault(_presets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCROLL = 'scroll'; /**
                        * @since 2016-10-30 14:17
                        * @author vivaxy
                        */

exports.default = function (container) {
    var attached = false;

    var on = function on(callback) {
        if (attached) {
            return false;
        } else {
            attached = true;
            (0, _presets2.default)(container);
            container.addEventListener(SCROLL, callback);

            return true;
        }
    };

    var off = function off(callback) {
        if (attached) {
            container.removeEventListener(SCROLL, callback);
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