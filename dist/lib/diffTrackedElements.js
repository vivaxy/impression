'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = require('../configs/events');

var eventTypes = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var diffBySelector = function diffBySelector(selector, tracked, isViewable, type) {
    var previousNodes = tracked.nodes;

    tracked.nodes = [];

    var currentNodes = document.querySelectorAll(selector);

    Array.prototype.forEach.call(currentNodes, function (currentNode) {
        var wasVisible = false;
        if (previousNodes) {
            previousNodes.forEach(function (previousItem) {
                var previousNode = previousItem.node;
                if (!previousItem.marked && previousNode === currentNode) {
                    wasVisible = previousItem.isVisible;
                    previousItem.marked = true;
                }
            });
        }

        var item = {
            isVisible: isViewable(currentNode),
            wasVisible: wasVisible,
            node: currentNode
        };

        tracked.nodes.push(item);

        if (item.isVisible === true && item.wasVisible === false) {
            tracked.events.emit(eventTypes.BEGIN, currentNode, {
                type: type
            });
        }
        if (item.isVisible === false && item.wasVisible === true) {
            tracked.events.emit(eventTypes.END, currentNode, {
                type: type
            });
        }
    });

    if (previousNodes) {
        // for removed nodes
        previousNodes.forEach(function (previousItem) {
            if (!previousItem.marked) {
                if (previousItem.isVisible) {
                    tracked.events.emit(eventTypes.END, previousItem.node, {
                        type: type
                    });
                }
            }
        });
    }
}; /**
    * @since 2016-11-05 10:01
    * @author vivaxy
    */

exports.default = function (trackedElements, type, isViewable) {
    var selectors = Object.keys(trackedElements);
    selectors.forEach(function (selector) {
        var tracked = trackedElements[selector];
        diffBySelector(selector, tracked, isViewable, type);
    });
};