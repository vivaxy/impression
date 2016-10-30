/**
 * @since 2016-10-30 14:24
 * @author vivaxy
 */

import presets from '../lib/presets';

const RESIZE = 'resize';

export default (container) => {
    let attached = false;

    const on = (callback) => {
        if (attached) {
            return false;
        } else {
            attached = true;
            presets(container);
            container.addEventListener(RESIZE, callback);
            return true;
        }
    };

    const off = (callback) => {
        if (attached) {
            container.removeEventListener(RESIZE, callback);
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
