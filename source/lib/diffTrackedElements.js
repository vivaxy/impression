/**
 * @since 2016-11-05 10:01
 * @author vivaxy
 */

import * as eventTypes from '../configs/events';

const diffBySelector = (selector, tracked, isViewable, type) => {
    const previousNodes = tracked.nodes;

    tracked.nodes = [];

    const currentNodes = document.querySelectorAll(selector);

    Array.prototype.forEach.call(currentNodes, (currentNode) => {
        let wasVisible = false;
        if (previousNodes) {
            previousNodes.forEach((previousItem) => {
                const previousNode = previousItem.node;
                if (!previousItem.marked && previousNode === currentNode) {
                    wasVisible = previousItem.isVisible;
                    previousItem.marked = true;
                }
            });
        }

        const item = {
            isVisible: isViewable(currentNode),
            wasVisible,
            node: currentNode
        };

        tracked.nodes.push(item);

        if (item.isVisible === true && item.wasVisible === false) {
            tracked.events.emit(eventTypes.BEGIN, currentNode, {
                type,
            });
        }
        if (item.isVisible === false && item.wasVisible === true) {
            tracked.events.emit(eventTypes.END, currentNode, {
                type,
            });
        }
    });

    if (previousNodes) {
        // for removed nodes
        previousNodes.forEach((previousItem) => {
            if (!previousItem.marked) {
                if (previousItem.isVisible) {
                    tracked.events.emit(eventTypes.END, previousItem.node, {
                        type,
                    });
                }
            }
        });
    }
};

export default (trackedElements, type, isViewable) => {
    const selectors = Object.keys(trackedElements);
    selectors.forEach((selector) => {
        const tracked = trackedElements[selector];
        diffBySelector(selector, tracked, isViewable, type);
    });
};
