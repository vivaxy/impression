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