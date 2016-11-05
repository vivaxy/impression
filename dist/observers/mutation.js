'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _presets = require('../lib/presets');

var _presets2 = _interopRequireDefault(_presets);

var _observers = require('../configs/observers');

var observers = _interopRequireWildcard(_observers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @since 2016-10-30 14:24
 * @author vivaxy
 */

var DOM_NODE_INSERTED = 'DOMNodeInserted';
var DOM_NODE_REMOVED = 'DOMNodeRemoved';
var DOM_ATTR_MODIFIED = 'DOMAttrModified';
var DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified';

exports.default = function (container) {
    var attached = void 0;
    var mutationObserver = void 0;
    var _callback = void 0;

    var on = function on(callback) {
        if (attached) {
            return false;
        } else {
            attached = true;
            _callback = function _callback() {
                return callback(observers.MUTATION);
            };
            (0, _presets2.default)(container);
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            if (MutationObserver) {
                mutationObserver = new MutationObserver(_callback);
                mutationObserver.observe(container, {
                    childList: true,
                    attributes: true,
                    subtree: true
                });
            } else {
                container.addEventListener(DOM_NODE_INSERTED, _callback);
                container.addEventListener(DOM_NODE_REMOVED, _callback);
                container.addEventListener(DOM_ATTR_MODIFIED, _callback);
                container.addEventListener(DOM_SUBTREE_MODIFIED, _callback);
            }
            return true;
        }
    };

    var off = function off() {
        if (attached) {
            if (mutationObserver) {
                mutationObserver.disconnect();
            } else {
                container.removeEventListener(DOM_NODE_INSERTED, _callback);
                container.removeEventListener(DOM_NODE_REMOVED, _callback);
                container.removeEventListener(DOM_ATTR_MODIFIED, _callback);
                container.removeEventListener(DOM_SUBTREE_MODIFIED, _callback);
            }
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