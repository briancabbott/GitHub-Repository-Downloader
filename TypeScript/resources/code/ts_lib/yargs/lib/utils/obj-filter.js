"use strict";
exports.__esModule = true;
exports.objFilter = void 0;
var common_types_js_1 = require("../typings/common-types.js");
function objFilter(original, filter) {
    if (original === void 0) { original = {}; }
    if (filter === void 0) { filter = function () { return true; }; }
    var obj = {};
    (0, common_types_js_1.objectKeys)(original).forEach(function (key) {
        if (filter(key, original[key])) {
            obj[key] = original[key];
        }
    });
    return obj;
}
exports.objFilter = objFilter;
