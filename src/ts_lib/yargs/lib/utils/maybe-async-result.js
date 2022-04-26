"use strict";
exports.__esModule = true;
exports.maybeAsyncResult = void 0;
// maybeAsyncResult() allows the same error/completion handler to be
// applied to a value regardless of whether it is a concrete value or an
// eventual value.
//
// As of yargs@v17, if no asynchronous steps are run, .e.g, a
// check() script that resolves a promise, yargs will return a concrete
// value. If any asynchronous steps are introduced, yargs resolves a promise.
var is_promise_js_1 = require("./is-promise.js");
function maybeAsyncResult(getResult, resultHandler, errorHandler) {
    if (errorHandler === void 0) { errorHandler = function (err) {
        throw err;
    }; }
    try {
        var result = isFunction(getResult) ? getResult() : getResult;
        return (0, is_promise_js_1.isPromise)(result)
            ? result.then(function (result) { return resultHandler(result); })
            : resultHandler(result);
    }
    catch (err) {
        return errorHandler(err);
    }
}
exports.maybeAsyncResult = maybeAsyncResult;
function isFunction(arg) {
    return typeof arg === 'function';
}
