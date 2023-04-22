"use strict";
/* global Deno */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var asserts_ts_1 = require("https://deno.land/std/testing/asserts.ts");
var deno_ts_1 = require("../../deno.ts");
var index_mjs_1 = require("../esm/fixtures/commands/index.mjs");
Deno.test('demandCommand(1) throw error if no command provided', function () {
    var err = null;
    (0, deno_ts_1["default"])()
        .demandCommand(1)
        .parse(Deno.args, function (_err) {
        err = _err;
    });
    (0, asserts_ts_1.assertMatch)(err.message, /Not enough non-option/);
});
// TODO: we should think of a way to support this functionality
Deno.test('guesses version # based on package.json', function () {
    var output = null;
    (0, deno_ts_1["default"])().parse('--version', function (_err, argv, _output) {
        output = _output;
    });
    (0, asserts_ts_1.assertMatch)('' + output, /[0-9]+\.[0-9]+\.[0-9]+/);
});
// Handling of strings that look like numbers, see:
// https://github.com/yargs/yargs/issues/1758
Deno.test('does not drop .0 if positional is configured as string', function () { return __awaiter(void 0, void 0, void 0, function () {
    var argv;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, deno_ts_1["default"])(['cmd', '33.0'])
                    .command('cmd [str]', 'a command', function (yargs) {
                    return yargs.positional('str', {
                        type: 'string'
                    });
                })
                    .parse()];
            case 1:
                argv = (_a.sent());
                (0, asserts_ts_1.assertEquals)(argv.str, '33.0');
                return [2 /*return*/];
        }
    });
}); });
Deno.test('hierarchy of commands', function () { return __awaiter(void 0, void 0, void 0, function () {
    var context;
    return __generator(this, function (_a) {
        context = {
            output: { value: 0 }
        };
        (0, deno_ts_1["default"])().command(index_mjs_1.commands).parse('a c 10 5', context);
        (0, asserts_ts_1.assertEquals)(context.output.value, 15);
        return [2 /*return*/];
    });
}); });
Deno.test('parseAsync()', function () { return __awaiter(void 0, void 0, void 0, function () {
    var err, argvPromise, argv;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                err = null;
                argvPromise = (0, deno_ts_1["default"])()
                    .middleware([
                    function (argv) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                                        setTimeout(resolve, 10);
                                    })];
                                case 1:
                                    _a.sent();
                                    argv.foo *= 2;
                                    return [2 /*return*/];
                            }
                        });
                    }); },
                ])
                    .parseAsync('--foo 33');
                (0, asserts_ts_1.assertEquals)(typeof argvPromise.then, 'function');
                return [4 /*yield*/, argvPromise];
            case 1:
                argv = (_a.sent());
                (0, asserts_ts_1.assertEquals)(argv.foo, 66);
                return [2 /*return*/];
        }
    });
}); });
