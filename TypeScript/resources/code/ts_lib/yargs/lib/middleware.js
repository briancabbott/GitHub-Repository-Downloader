"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.applyMiddleware = exports.commandMiddlewareFactory = exports.GlobalMiddleware = void 0;
var argsert_js_1 = require("./argsert.js");
var is_promise_js_1 = require("./utils/is-promise.js");
var GlobalMiddleware = /** @class */ (function () {
    function GlobalMiddleware(yargs) {
        this.globalMiddleware = [];
        this.frozens = [];
        this.yargs = yargs;
    }
    GlobalMiddleware.prototype.addMiddleware = function (callback, applyBeforeValidation, global, mutates) {
        if (global === void 0) { global = true; }
        if (mutates === void 0) { mutates = false; }
        (0, argsert_js_1.argsert)('<array|function> [boolean] [boolean] [boolean]', [callback, applyBeforeValidation, global], arguments.length);
        if (Array.isArray(callback)) {
            for (var i = 0; i < callback.length; i++) {
                if (typeof callback[i] !== 'function') {
                    throw Error('middleware must be a function');
                }
                var m = callback[i];
                m.applyBeforeValidation = applyBeforeValidation;
                m.global = global;
            }
            Array.prototype.push.apply(this.globalMiddleware, callback);
        }
        else if (typeof callback === 'function') {
            var m = callback;
            m.applyBeforeValidation = applyBeforeValidation;
            m.global = global;
            m.mutates = mutates;
            this.globalMiddleware.push(callback);
        }
        return this.yargs;
    };
    // For "coerce" middleware, only one middleware instance can be registered
    // per option:
    GlobalMiddleware.prototype.addCoerceMiddleware = function (callback, option) {
        var aliases = this.yargs.getAliases();
        this.globalMiddleware = this.globalMiddleware.filter(function (m) {
            var toCheck = __spreadArray(__spreadArray([], (aliases[option] || []), true), [option], false);
            if (!m.option)
                return true;
            else
                return !toCheck.includes(m.option);
        });
        callback.option = option;
        return this.addMiddleware(callback, true, true, true);
    };
    GlobalMiddleware.prototype.getMiddleware = function () {
        return this.globalMiddleware;
    };
    GlobalMiddleware.prototype.freeze = function () {
        this.frozens.push(__spreadArray([], this.globalMiddleware, true));
    };
    GlobalMiddleware.prototype.unfreeze = function () {
        var frozen = this.frozens.pop();
        if (frozen !== undefined)
            this.globalMiddleware = frozen;
    };
    GlobalMiddleware.prototype.reset = function () {
        this.globalMiddleware = this.globalMiddleware.filter(function (m) { return m.global; });
    };
    return GlobalMiddleware;
}());
exports.GlobalMiddleware = GlobalMiddleware;
function commandMiddlewareFactory(commandMiddleware) {
    if (!commandMiddleware)
        return [];
    return commandMiddleware.map(function (middleware) {
        middleware.applyBeforeValidation = false;
        return middleware;
    });
}
exports.commandMiddlewareFactory = commandMiddlewareFactory;
function applyMiddleware(argv, yargs, middlewares, beforeValidation) {
    return middlewares.reduce(function (acc, middleware) {
        if (middleware.applyBeforeValidation !== beforeValidation) {
            return acc;
        }
        if (middleware.mutates) {
            if (middleware.applied)
                return acc;
            middleware.applied = true;
        }
        if ((0, is_promise_js_1.isPromise)(acc)) {
            return acc
                .then(function (initialObj) {
                return Promise.all([initialObj, middleware(initialObj, yargs)]);
            })
                .then(function (_a) {
                var initialObj = _a[0], middlewareObj = _a[1];
                return Object.assign(initialObj, middlewareObj);
            });
        }
        else {
            var result = middleware(acc, yargs);
            return (0, is_promise_js_1.isPromise)(result)
                ? result.then(function (middlewareObj) { return Object.assign(acc, middlewareObj); })
                : Object.assign(acc, result);
        }
    }, argv);
}
exports.applyMiddleware = applyMiddleware;
