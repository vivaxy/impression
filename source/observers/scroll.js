/**
 * @since 2016-10-30 14:17
 * @author vivaxy
 */

import presets from '../lib/presets';
import * as observers from '../configs/observers';

const SCROLL = 'scroll';

export default (container) => {
    let attached = false;
    let _callback;

    const on = (callback) => {
        if (attached) {
            return false;
        } else {
            attached = true;
            _callback = () => {
                return callback(observers.SCROLL);
            };
            presets(container);
            container.addEventListener(SCROLL, _callback);

            return true;
        }
    };

    const off = () => {
        if (attached) {
            container.removeEventListener(SCROLL, _callback);
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
