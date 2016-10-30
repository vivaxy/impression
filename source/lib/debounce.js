/**
 * @since 2016-10-30 14:47
 * @author vivaxy
 */

export default (callback, timeout) => {
    let timer;

    return () => {
        clearTimeout(timer);

        timer = setTimeout(callback, timeout);
    };
};
