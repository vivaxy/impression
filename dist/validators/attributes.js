"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @since 2016-10-30 14:49
 * @author vivaxy
 */

var attributesToCheck = {
    hidden: true
};

exports.default = function (element) {
    return !Object.keys(attributesToCheck).some(function (attr) {
        return element[attr] === attributesToCheck[attr];
    });
};