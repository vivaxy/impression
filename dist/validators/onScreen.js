"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @since 2016-10-30 14:55
 * @author vivaxy
 */

exports.default = function (element, tolerance) {

    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;

    var elementHeight = element.offsetHeight;
    var elementWidth = element.offsetWidth;

    var onScreenHeight = tolerance > elementHeight ? elementHeight : tolerance;
    var onScreenWidth = tolerance > elementWidth ? elementWidth : tolerance;

    // top
    var elementBottomToWindowTop = rect.top + elementHeight;
    var bottomBoundingOnScreen = elementBottomToWindowTop >= onScreenHeight;

    // bottom
    var elementTopToWindowBottom = windowHeight - (rect.bottom - elementHeight);
    var topBoundingOnScreen = elementTopToWindowBottom >= onScreenHeight;

    // left
    var elementRightToWindowLeft = rect.left + elementWidth;
    var rightBoundingOnScreen = elementRightToWindowLeft >= onScreenWidth;

    // right
    var elementLeftToWindowRight = windowWidth - (rect.right - elementWidth);
    var leftBoundingOnScreen = elementLeftToWindowRight >= onScreenWidth;

    return bottomBoundingOnScreen && topBoundingOnScreen && rightBoundingOnScreen && leftBoundingOnScreen;
};