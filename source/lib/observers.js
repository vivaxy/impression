/**
 * @since 2016-10-30 15:12
 * @author vivaxy
 */

import mutationEvents from '../observers/mutation';
import resizeEvents from '../observers/resize';
import scrollEvents from '../observers/scroll';
import unloadEvents from '../observers/unload';

export default (container) => {
    let mutationListener = mutationEvents(document.body);
    let resizeListener = resizeEvents(container);
    let scrollListener = scrollEvents(container);
    let unloadListener = unloadEvents();

    const on = (callback) => {
        mutationListener.on(callback);
        resizeListener.on(callback);
        scrollListener.on(callback);
        unloadListener.on(callback);
        return true;
    };

    const off = () => {
        mutationListener.off();
        resizeListener.off();
        scrollListener.off();
        unloadListener.off();
        return true;
    };

    return {
        on,
        off,
    }
};
