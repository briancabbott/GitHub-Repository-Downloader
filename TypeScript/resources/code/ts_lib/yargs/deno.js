"use strict";
exports.__esModule = true;
// Bootstrap yargs for Deno platform:
var deno_ts_1 = require("./lib/platform-shims/deno.ts");
var yargs_factory_js_1 = require("./build/lib/yargs-factory.js");
var Yargs = (0, yargs_factory_js_1.YargsFactory)(deno_ts_1["default"]);
exports["default"] = Yargs;
