'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mutation = require('../observers/mutation');

var _mutation2 = _interopRequireDefault(_mutation);

var _resize = require('../observers/resize');

var _resize2 = _interopRequireDefault(_resize);

var _scroll = require('../observers/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (container) {
    var mutationListener = (0, _mutation2.default)(document.body);
    var resizeListener = (0, _resize2.default)(container);
    var scrollListener = (0, _scroll2.default)(container);

    var on = function on(callback) {
        mutationListener.on(callback);
        resizeListener.on(callback);
        scrollListener.on(callback);
        return true;
    };

    var off = function off(callback) {
        mutationListener.off(callback);
        resizeListener.off(callback);
        scrollListener.off(callback);
        return true;
    };

    return {
        on: on,
        off: off
    };
}; /**
    * @since 2016-10-30 15:12
    * @author vivaxy
    */