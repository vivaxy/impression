/**
 * @since 2016-10-30 14:59
 * @author vivaxy
 */

export default (element, container = document.body, tolerance = 0) => {

    const containerRect = container.getBoundingClientRect();

    const top = element.offsetTop + tolerance < containerRect.height + container.scrollTop;
    const bottom = (element.offsetTop + element.clientHeight) - tolerance > container.scrollTop;
    const left = element.offsetLeft + tolerance < containerRect.width + container.scrollLeft;
    const right = (element.offsetLeft + element.clientWidth) - tolerance > container.scrollLeft;

    return top && bottom && left && right;
}
