'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @since 2016-10-30 14:53
 * @author vivaxy
 */

var stylesToCheck = {
    display: 'none',
    visibility: 'hidden'
};

exports.default = function (element) {
    var style = window.getComputedStyle(element);
    return !Object.keys(stylesToCheck).some(function (attr) {
        return style[attr] === stylesToCheck[attr];
    });
};