'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since 2016-10-28 12:21
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author vivaxy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var EventEmitter = _events2.default.EventEmitter;

var Impression = function (_EventEmitter) {
    _inherits(Impression, _EventEmitter);

    function Impression(selector) {
        _classCallCheck(this, Impression);

        return _possibleConstructorReturn(this, (Impression.__proto__ || Object.getPrototypeOf(Impression)).call(this));
    }

    return Impression;
}(EventEmitter);

exports.default = Impression;