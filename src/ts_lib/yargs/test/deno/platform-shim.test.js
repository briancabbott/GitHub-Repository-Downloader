"use strict";
/* global Deno */
exports.__esModule = true;
var asserts_ts_1 = require("https://deno.land/std/testing/asserts.ts");
var deno_ts_1 = require("../../lib/platform-shims/deno.ts");
// y18n.
Deno.test('__ behaves like sprintf', function () {
    var str = deno_ts_1["default"].y18n.__('hello %s, goodnight %s', 'world', 'moon');
    (0, asserts_ts_1.assertEquals)(str, 'hello world, goodnight moon');
});
Deno.test('__n uses first string if singular', function () {
    var str = deno_ts_1["default"].y18n.__n('Missing required argument: %s', 'Missing required arguments: %s', 1, 'foo, bar');
    (0, asserts_ts_1.assertEquals)(str, 'Missing required argument: foo, bar');
});
Deno.test('__n uses second string if plural', function () {
    var str = deno_ts_1["default"].y18n.__n('Missing required argument: %s', 'Missing required arguments: %s', 2, 'foo, bar');
    (0, asserts_ts_1.assertEquals)(str, 'Missing required arguments: foo, bar');
});
