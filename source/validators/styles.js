/**
 * @since 2016-10-30 14:53
 * @author vivaxy
 */

const stylesToCheck = {
    display: 'none',
    visibility: 'hidden',
};

export default (element) => {
    const style = window.getComputedStyle(element);
    return !Object.keys(stylesToCheck).some((attr) => {
        return style[attr] === stylesToCheck[attr];
    });
};
