'use strict';
var _a;
exports.__esModule = true;
// Bootstraps yargs for a CommonJS runtime:
var apply_extends_1 = require("./utils/apply-extends");
var argsert_js_1 = require("./argsert.js");
var is_promise_js_1 = require("./utils/is-promise.js");
var obj_filter_js_1 = require("./utils/obj-filter.js");
var parse_command_js_1 = require("./parse-command.js");
var processArgv = require("./utils/process-argv.js");
var yargs_factory_js_1 = require("./yargs-factory.js");
var yerror_js_1 = require("./yerror.js");
var cjs_js_1 = require("./platform-shims/cjs.js");
// See https://github.com/yargs/yargs#supported-nodejs-versions for our
// version support policy. The YARGS_MIN_NODE_VERSION is used for testing only.
var minNodeVersion = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.YARGS_MIN_NODE_VERSION)
    ? Number(process.env.YARGS_MIN_NODE_VERSION)
    : 12;
if (process && process.version) {
    var major = Number(process.version.match(/v([^.]+)/)[1]);
    if (major < minNodeVersion) {
        throw Error("yargs supports a minimum Node.js version of ".concat(minNodeVersion, ". Read our version support policy: https://github.com/yargs/yargs#supported-nodejs-versions"));
    }
}
var Parser = require('yargs-parser');
var Yargs = (0, yargs_factory_js_1.YargsFactory)(cjs_js_1["default"]);
exports["default"] = {
    applyExtends: apply_extends_1.applyExtends,
    cjsPlatformShim: cjs_js_1["default"],
    Yargs: Yargs,
    argsert: argsert_js_1.argsert,
    isPromise: is_promise_js_1.isPromise,
    objFilter: obj_filter_js_1.objFilter,
    parseCommand: parse_command_js_1.parseCommand,
    Parser: Parser,
    processArgv: processArgv,
    YError: yerror_js_1.YError
};
