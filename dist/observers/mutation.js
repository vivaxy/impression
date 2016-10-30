'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _presets = require('../lib/presets');

var _presets2 = _interopRequireDefault(_presets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOM_NODE_INSERTED = 'DOMNodeInserted'; /**
                                            * @since 2016-10-30 14:24
                                            * @author vivaxy
                                            */

var DOM_NODE_REMOVED = 'DOMNodeRemoved';
var DOM_ATTR_MODIFIED = 'DOMAttrModified';
var DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified';

exports.default = function (container) {
    var attached = void 0;
    var mutationObserver = void 0;

    var on = function on(callback) {
        if (attached) {
            return false;
        } else {
            attached = true;
            (0, _presets2.default)(container);
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            if (MutationObserver) {
                mutationObserver = new MutationObserver(callback);
                mutationObserver.observe(container, {
                    childList: true,
                    attributes: true,
                    subtree: true
                });
            } else {
                container.addEventListener(DOM_NODE_INSERTED, callback);
                container.addEventListener(DOM_NODE_REMOVED, callback);
                container.addEventListener(DOM_ATTR_MODIFIED, callback);
                container.addEventListener(DOM_SUBTREE_MODIFIED, callback);
            }
            return true;
        }
    };

    var off = function off(callback) {
        if (attached) {
            if (mutationObserver) {
                mutationObserver.disconnect();
            } else {
                container.removeEventListener(DOM_NODE_INSERTED, callback);
                container.removeEventListener(DOM_NODE_REMOVED, callback);
                container.removeEventListener(DOM_ATTR_MODIFIED, callback);
                container.removeEventListener(DOM_SUBTREE_MODIFIED, callback);
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