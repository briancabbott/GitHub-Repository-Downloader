"use strict";
exports.__esModule = true;
exports.isPromise = void 0;
function isPromise(maybePromise) {
    return (!!maybePromise &&
        !!maybePromise.then &&
        typeof maybePromise.then === 'function');
}
exports.isPromise = isPromise;
