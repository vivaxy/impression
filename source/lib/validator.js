/**
 * @since 2016-10-30 14:52
 * @author vivaxy
 */

import attributesValidator from '../validators/attributes';
import stylesValidator from '../validators/styles';

export default (element) => {
    let visible = true;
    let currentNode = element;
    while (currentNode.parentNode && visible) {
        visible = attributesValidator(currentNode) && stylesValidator(currentNode);
        currentNode = currentNode.parentNode;
    }
    return visible;
};
