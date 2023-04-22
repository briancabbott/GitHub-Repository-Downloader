"use strict";
/* global Deno */
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
var asserts_ts_1 = require("https://deno.land/std/testing/asserts.ts");
var mod_ts_1 = require("https://deno.land/std/path/mod.ts");
var deno_ts_1 = require("https://deno.land/x/cliui@v7.0.4-deno/deno.ts");
var sync_ts_1 = require("https://deno.land/x/escalade@v3.0.3/sync.ts");
var deno_ts_2 = require("https://deno.land/x/yargs_parser@v20.2.4-deno/deno.ts");
var deno_ts_3 = require("https://deno.land/x/y18n@v5.0.0-deno/deno.ts");
var yerror_js_1 = require("../../build/lib/yerror.js");
var REQUIRE_ERROR = 'require is not supported by ESM';
var REQUIRE_DIRECTORY_ERROR = 'loading a directory of commands is not supported yet for ESM';
// Deno removes argv[0] and argv[1] from Deno.args:
var argv = __spreadArray(['deno run'], Deno.args, true);
var __dirname = new URL('.', import.meta.url).pathname;
// Yargs supports environment variables with prefixes, e.g., MY_APP_FOO,
// MY_APP_BAR. Environment variables are also used to detect locale.
var cwd = '';
var env = {};
try {
    env = Deno.env.toObject();
    cwd = Deno.cwd();
}
catch (err) {
    if (err.name !== 'PermissionDenied') {
        throw err;
    }
}
var path = {
    basename: mod_ts_1.basename,
    dirname: mod_ts_1.dirname,
    extname: mod_ts_1.extname,
    relative: function (p1, p2) {
        try {
            return mod_ts_1.posix.relative(p1, p2);
        }
        catch (err) {
            // Some yargs featuers require read access to the file system,
            // e.g., support for multiple locales.
            if (err.name !== 'PermissionDenied') {
                throw err;
            }
            return p1;
        }
    },
    resolve: mod_ts_1.posix.resolve
};
// TODO: replace with Deno.consoleSize(Deno.stdout.rid)
// once this feature is stable:
var columns = 80;
exports["default"] = {
    assert: {
        notStrictEqual: asserts_ts_1.assertNotEquals,
        strictEqual: asserts_ts_1.assertStrictEquals
    },
    cliui: deno_ts_1["default"],
    findUp: sync_ts_1["default"],
    getEnv: function (key) {
        return env[key];
    },
    inspect: Deno.inspect,
    getCallerFile: function () { return undefined; },
    getProcessArgvBin: function () {
        return 'deno';
    },
    mainFilename: cwd,
    Parser: deno_ts_2["default"],
    path: path,
    process: {
        argv: function () { return argv; },
        cwd: function () { return cwd; },
        emitWarning: function (warning, type) { },
        execPath: function () {
            try {
                return Deno.execPath();
            }
            catch (_err) {
                return 'deno';
            }
        },
        exit: Deno.exit,
        nextTick: window.queueMicrotask,
        stdColumns: columns !== null && columns !== void 0 ? columns : null
    },
    readFileSync: Deno.readTextFileSync,
    require: function () {
        throw new yerror_js_1.YError(REQUIRE_ERROR);
    },
    requireDirectory: function () {
        throw new yerror_js_1.YError(REQUIRE_DIRECTORY_ERROR);
    },
    stringWidth: function (str) {
        return __spreadArray([], str, true).length;
    },
    y18n: (0, deno_ts_3["default"])({
        directory: mod_ts_1.posix.resolve(__dirname, '../../locales'),
        updateFiles: false
    })
};
