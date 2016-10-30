/**
 * @since 2016-10-30 14:17
 * @author vivaxy
 */

export default (container) => {
    let attached = false;

    return (callback) => {
        if (attached) {
            return false;
        } else {
            attached = true;

            // for calculating offset
            if (container instanceof HTMLElement) {
                const style = window.getComputedStyle(container);

                if (style.position === 'static') {
                    container.style.position = 'relative';
                }
            }

            container.addEventListener('scroll', callback);

            return true;
        }
    };
};
