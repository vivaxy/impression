"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @since 2016-11-05 11:11
 * @author vivaxy
 */

exports.default = function (value, object) {
    return Object.keys(object).some(function (constant) {
        return object[constant] === value;
    });
};