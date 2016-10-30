'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @since 2016-10-30 14:35
 * @author vivaxy
 */

var STATIC = 'static';
var RELATIVE = 'relative';

exports.default = function (container) {
    // for calculating offset
    if (container instanceof HTMLElement) {
        var style = window.getComputedStyle(container);

        if (style.position === STATIC) {
            container.style.position = RELATIVE;
        }
    }
};