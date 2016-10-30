'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _attributes = require('../validators/attributes');

var _attributes2 = _interopRequireDefault(_attributes);

var _styles = require('../validators/styles');

var _styles2 = _interopRequireDefault(_styles);

var _inContainer = require('../validators/inContainer');

var _inContainer2 = _interopRequireDefault(_inContainer);

var _onScreen = require('../validators/onScreen');

var _onScreen2 = _interopRequireDefault(_onScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * check if an element is viewable
 * @param element {Node}
 * @param container {Node}
 * @param tolerance {Number}
 * @returns {boolean}
 */
/**
 * @since 2016-10-30 14:52
 * @author vivaxy
 */

exports.default = function (element, container, tolerance) {
    var visible = true;
    var currentNode = element;

    if (container === window) {
        visible = (0, _onScreen2.default)(element, tolerance);
    } else {
        visible = (0, _inContainer2.default)(element, container, tolerance);
    }

    while (currentNode.parentNode && visible) {
        visible = (0, _attributes2.default)(currentNode) && (0, _styles2.default)(currentNode);
        currentNode = currentNode.parentNode;
    }
    return visible;
};