/**
 * @since 2016-11-05 10:06
 * @author vivaxy
 */

import * as eventTypes from '../configs/events';

const endBySelector = (selector, tracked, type) => {
    const previousNodes = tracked.nodes;
    if (previousNodes) {
        previousNodes.forEach((previousItem) => {
            const previousNode = previousItem.node;
            if (previousNode.isVisible) {
                tracked.events.emit(eventTypes.END, previousItem.node, {
                    type,
                });
            }
        });
    }
};

export default (trackedElements, type) => {
    const selectors = Object.keys(trackedElements);
    selectors.forEach((selector) => {
        const tracked = trackedElements[selector];
        endBySelector(selector, tracked);
    });
};
