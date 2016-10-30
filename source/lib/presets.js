/**
 * @since 2016-10-30 14:35
 * @author vivaxy
 */

const STATIC = 'static';
const RELATIVE = 'relative';

export default (container) => {
    // for calculating offset
    if (container instanceof HTMLElement) {
        const style = window.getComputedStyle(container);

        if (style.position === STATIC) {
            container.style.position = RELATIVE;
        }
    }
}
