/**
 * @since 2016-10-30 14:17
 * @author vivaxy
 */

import presets from '../lib/presets';

const SCROLL = 'scroll';

export default (container) => {
    let attached = false;

    const on = (callback) => {
        if (attached) {
            return false;
        } else {
            attached = true;
            presets(container);
            container.addEventListener(SCROLL, callback);

            return true;
        }
    };

    const off = (callback) => {
        if (attached) {
            container.removeEventListener(SCROLL, callback);
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
