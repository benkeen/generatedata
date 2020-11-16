"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Use it instead of .includes method for IE support */
function arrayIncludes(array, itemOrItems) {
    if (Array.isArray(itemOrItems)) {
        return itemOrItems.every(function (item) { return array.indexOf(item) !== -1; });
    }
    return array.indexOf(itemOrItems) !== -1;
}
exports.arrayIncludes = arrayIncludes;
