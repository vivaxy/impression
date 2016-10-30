/**
 * @since 2016-10-30 15:12
 * @author vivaxy
 */

import mutationEvents from '../observers/mutation';
import resizeEvents from '../observers/resize';
import scrollEvents from '../observers/scroll';

export default (container) => {
    let mutationListener = mutationEvents(document.body);
    let resizeListener = resizeEvents(container);
    let scrollListener = scrollEvents(container);

    const on = (callback) => {
        mutationListener.on(callback);
        resizeListener.on(callback);
        scrollListener.on(callback);
        return true;
    };

    const off = (callback) => {
        mutationListener.off(callback);
        resizeListener.off(callback);
        scrollListener.off(callback);
        return true;
    };

    return {
        on,
        off,
    }
};
