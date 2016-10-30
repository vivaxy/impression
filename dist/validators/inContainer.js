"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @since 2016-10-30 14:59
 * @author vivaxy
 */

exports.default = function (element) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
    var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


    var containerRect = container.getBoundingClientRect();

    var top = element.offsetTop + tolerance < containerRect.height + container.scrollTop;
    var bottom = element.offsetTop + element.clientHeight - tolerance > container.scrollTop;
    var left = element.offsetLeft + tolerance < containerRect.width + container.scrollLeft;
    var right = element.offsetLeft + element.clientWidth - tolerance > container.scrollLeft;

    return top && bottom && left && right;
};