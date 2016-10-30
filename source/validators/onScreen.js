/**
 * @since 2016-10-30 14:55
 * @author vivaxy
 */

export default (element, tolerance) => {

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    const elementHeight = element.offsetHeight;
    const elementWidth = element.offsetWidth;

    const onScreenHeight = tolerance > elementHeight ? elementHeight : tolerance;
    const onScreenWidth = tolerance > elementWidth ? elementWidth : tolerance;

    // top
    const elementBottomToWindowTop = rect.top + elementHeight;
    const bottomBoundingOnScreen = elementBottomToWindowTop >= onScreenHeight;

    // bottom
    const elementTopToWindowBottom = windowHeight - (rect.bottom - elementHeight);
    const topBoundingOnScreen = elementTopToWindowBottom >= onScreenHeight;

    // left
    const elementRightToWindowLeft = rect.left + elementWidth;
    const rightBoundingOnScreen = elementRightToWindowLeft >= onScreenWidth;

    // right
    const elementLeftToWindowRight = windowWidth - (rect.right - elementWidth);
    const leftBoundingOnScreen = elementLeftToWindowRight >= onScreenWidth;

    return bottomBoundingOnScreen && topBoundingOnScreen && rightBoundingOnScreen && leftBoundingOnScreen;
};
