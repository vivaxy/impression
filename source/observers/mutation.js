/**
 * @since 2016-10-30 14:24
 * @author vivaxy
 */

import presets from '../lib/presets';
import * as observers from '../configs/observers';

const DOM_NODE_INSERTED = 'DOMNodeInserted';
const DOM_NODE_REMOVED = 'DOMNodeRemoved';
const DOM_ATTR_MODIFIED = 'DOMAttrModified';
const DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified';

export default (container) => {
    let attached;
    let mutationObserver;
    let _callback;

    const on = (callback) => {
        if (attached) {
            return false;
        } else {
            attached = true;
            _callback = () => {
                return callback(observers.MUTATION);
            };
            presets(container);
            const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            if (MutationObserver) {
                mutationObserver = new MutationObserver(_callback);
                mutationObserver.observe(container, {
                    childList: true,
                    attributes: true,
                    subtree: true,
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

    const off = () => {
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
        on,
        off,
    };
};
