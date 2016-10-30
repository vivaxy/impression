/**
 * @since 2016-10-30 14:24
 * @author vivaxy
 */

import presets from '../lib/presets';

const DOM_NODE_INSERTED = 'DOMNodeInserted';
const DOM_NODE_REMOVED = 'DOMNodeRemoved';
const DOM_ATTR_MODIFIED = 'DOMAttrModified';
const DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified';

export default (container) => {
    let attached;
    let mutationObserver;

    const on = (callback) => {
        if (attached) {
            return false;
        } else {
            attached = true;
            presets(container);
            const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            if (MutationObserver) {
                mutationObserver = new MutationObserver(callback);
                mutationObserver.observe(container, {
                    childList: true,
                    attributes: true,
                    subtree: true,
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

    const off = (callback) => {
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
        on,
        off,
    };
};
