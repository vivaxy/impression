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
        clearTimeout(timer);

        timer = setTimeout(callback, timeout);
    };
};