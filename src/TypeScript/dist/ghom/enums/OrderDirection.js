"use strict";
// OrderDirection
// Possible directions in which to order a list of items when provided an orderBy argument.
// 
// Values
// ASC
// Specifies an ascending order for a given orderBy argument.
// DESC
// Specifies a descending order for a given orderBy argument.
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDirection = void 0;
// Possible directions in which to order a list of items when provided an orderBy argument.
var OrderDirection;
(function (OrderDirection) {
    // Specifies an ascending order for a given orderBy argument.
    OrderDirection[OrderDirection["ASC"] = 0] = "ASC";
    // Specifies a descending order for a given orderBy argument.
    OrderDirection[OrderDirection["DESC"] = 1] = "DESC";
})(OrderDirection = exports.OrderDirection || (exports.OrderDirection = {}));
