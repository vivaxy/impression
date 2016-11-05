/**
 * @since 2016-11-05 09:32
 * @author vivaxy
 */

import * as observers from '../configs/observers';

const BEFORE_UNLOAD = 'beforeunload';

export default () => {
    let attached = false;
    let _callback;

    const on = (callback) => {
        if (attached) {
            return false;
        } else {
            attached = true;
            _callback = () => {
                return callback(observers.UNLOAD)
            };
            window.addEventListener(BEFORE_UNLOAD, _callback);
            return true;
        }
    };

    const off = () => {
        if (attached) {
            window.removeEventListener(BEFORE_UNLOAD, _callback);
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
