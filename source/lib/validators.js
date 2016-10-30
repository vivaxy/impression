/**
 * @since 2016-10-30 14:52
 * @author vivaxy
 */

import attributesValidator from '../validators/attributes';
import stylesValidator from '../validators/styles';
import inContainer from '../validators/inContainer';
import onScreen from '../validators/onScreen';

/**
 * check if an element is viewable
 * @param element {Node}
 * @param container {Node}
 * @param tolerance {Number}
 * @returns {boolean}
 */
export default (element, container, tolerance) => {
    let visible = true;
    let currentNode = element;

    if (container === window) {
        visible = onScreen(element, tolerance);
    } else {
        visible = inContainer(element, container, tolerance);
    }

    while (currentNode.parentNode && visible) {
        visible = attributesValidator(currentNode) && stylesValidator(currentNode);
        currentNode = currentNode.parentNode;
    }
    return visible;
};
