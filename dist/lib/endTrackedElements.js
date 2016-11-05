'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = require('../configs/events');

var eventTypes = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var endBySelector = function endBySelector(selector, tracked, type) {
    var previousNodes = tracked.nodes;
    if (previousNodes) {
        previousNodes.forEach(function (previousItem) {
            var previousNode = previousItem.node;
            if (previousNode.isVisible) {
                tracked.events.emit(eventTypes.END, previousItem.node, {
                    type: type
                });
            }
        });
    }
}; /**
    * @since 2016-11-05 10:06
    * @author vivaxy
    */

exports.default = function (trackedElements, type) {
    var selectors = Object.keys(trackedElements);
    selectors.forEach(function (selector) {
        var tracked = trackedElements[selector];
        endBySelector(selector, tracked);
    });
};