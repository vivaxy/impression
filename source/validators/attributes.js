/**
 * @since 2016-10-30 14:49
 * @author vivaxy
 */

const attributesToCheck = {
    hidden: true,
};

const isElementVisible = (element) => {
    return !Object.keys(attributesToCheck).some((attr) => {
        return element[attr] === attributesToCheck[attr];
    });
};

export default (element) => {
    let visible = true;
    let currentNode = element;
    while (currentNode.parentNode && visible) {
        visible = isElementVisible(currentNode);
        currentNode = currentNode.parentNode;
    }
    return visible;
};
