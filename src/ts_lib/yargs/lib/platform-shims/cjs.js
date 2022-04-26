"use strict";
var _a, _b;
exports.__esModule = true;
var assert_1 = require("assert");
var processArgv = require("../utils/process-argv.js");
var readFileSync = require('fs').readFileSync;
var inspect = require('util').inspect;
var resolve = require('path').resolve;
var y18n = require('y18n');
var Parser = require('yargs-parser');
exports["default"] = {
    assert: {
        notStrictEqual: assert_1.notStrictEqual,
        strictEqual: assert_1.strictEqual
    },
    cliui: require('cliui'),
    findUp: require('escalade/sync'),
    getEnv: function (key) {
        return process.env[key];
    },
    getCallerFile: require('get-caller-file'),
    getProcessArgvBin: processArgv.getProcessArgvBin,
    inspect: inspect,
    mainFilename: (_b = (_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : process.cwd(),
    Parser: Parser,
    path: require('path'),
    process: {
        argv: function () { return process.argv; },
        cwd: process.cwd,
        emitWarning: function (warning, type) {
            return process.emitWarning(warning, type);
        },
        execPath: function () { return process.execPath; },
        exit: function (code) {
            // eslint-disable-next-line no-process-exit
            process.exit(code);
        },
        nextTick: process.nextTick,
        stdColumns: typeof process.stdout.columns !== 'undefined'
            ? process.stdout.columns
            : null
    },
    readFileSync: readFileSync,
    require: require,
    requireDirectory: require('require-directory'),
    stringWidth: require('string-width'),
    y18n: y18n({
        directory: resolve(__dirname, '../locales'),
        updateFiles: false
    })
};
