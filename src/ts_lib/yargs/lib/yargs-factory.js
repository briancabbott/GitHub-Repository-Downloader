"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _YargsInstance_command, _YargsInstance_cwd, _YargsInstance_context, _YargsInstance_completion, _YargsInstance_completionCommand, _YargsInstance_defaultShowHiddenOpt, _YargsInstance_exitError, _YargsInstance_detectLocale, _YargsInstance_emittedWarnings, _YargsInstance_exitProcess, _YargsInstance_frozens, _YargsInstance_globalMiddleware, _YargsInstance_groups, _YargsInstance_hasOutput, _YargsInstance_helpOpt, _YargsInstance_logger, _YargsInstance_output, _YargsInstance_options, _YargsInstance_parentRequire, _YargsInstance_parserConfig, _YargsInstance_parseFn, _YargsInstance_parseContext, _YargsInstance_pkgs, _YargsInstance_preservedGroups, _YargsInstance_processArgs, _YargsInstance_recommendCommands, _YargsInstance_shim, _YargsInstance_strict, _YargsInstance_strictCommands, _YargsInstance_strictOptions, _YargsInstance_usage, _YargsInstance_versionOpt, _YargsInstance_validation;
exports.__esModule = true;
exports.isYargsInstance = exports.YargsInstance = exports.YargsFactory = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
// Platform agnostic entrypoint for yargs, i.e., this factory is used to
// create an instance of yargs for CJS, ESM, Deno.
//
// Works by accepting a shim which shims methods that contain platform
// specific logic.
var command_js_1 = require("./command.js");
var common_types_js_1 = require("./typings/common-types.js");
var yerror_js_1 = require("./yerror.js");
var usage_js_1 = require("./usage.js");
var argsert_js_1 = require("./argsert.js");
var completion_js_1 = require("./completion.js");
var validation_js_1 = require("./validation.js");
var obj_filter_js_1 = require("./utils/obj-filter.js");
var apply_extends_js_1 = require("./utils/apply-extends.js");
var middleware_js_1 = require("./middleware.js");
var is_promise_js_1 = require("./utils/is-promise.js");
var maybe_async_result_js_1 = require("./utils/maybe-async-result.js");
var set_blocking_js_1 = require("./utils/set-blocking.js");
function YargsFactory(_shim) {
    return function (processArgs, cwd, parentRequire) {
        if (processArgs === void 0) { processArgs = []; }
        if (cwd === void 0) { cwd = _shim.process.cwd(); }
        var yargs = new YargsInstance(processArgs, cwd, parentRequire, _shim);
        // Legacy yargs.argv interface, it's recommended that you use .parse().
        Object.defineProperty(yargs, 'argv', {
            get: function () {
                return yargs.parse();
            },
            enumerable: true
        });
        // an app should almost always have --version and --help,
        // if you *really* want to disable this use .help(false)/.version(false).
        yargs.help();
        yargs.version();
        return yargs;
    };
}
exports.YargsFactory = YargsFactory;
// Used to expose private methods to other module-level classes,
// such as the command parser and usage printer.
var kCopyDoubleDash = Symbol('copyDoubleDash');
var kCreateLogger = Symbol('copyDoubleDash');
var kDeleteFromParserHintObject = Symbol('deleteFromParserHintObject');
var kEmitWarning = Symbol('emitWarning');
var kFreeze = Symbol('freeze');
var kGetDollarZero = Symbol('getDollarZero');
var kGetParserConfiguration = Symbol('getParserConfiguration');
var kGuessLocale = Symbol('guessLocale');
var kGuessVersion = Symbol('guessVersion');
var kParsePositionalNumbers = Symbol('parsePositionalNumbers');
var kPkgUp = Symbol('pkgUp');
var kPopulateParserHintArray = Symbol('populateParserHintArray');
var kPopulateParserHintSingleValueDictionary = Symbol('populateParserHintSingleValueDictionary');
var kPopulateParserHintArrayDictionary = Symbol('populateParserHintArrayDictionary');
var kPopulateParserHintDictionary = Symbol('populateParserHintDictionary');
var kSanitizeKey = Symbol('sanitizeKey');
var kSetKey = Symbol('setKey');
var kUnfreeze = Symbol('unfreeze');
var kValidateAsync = Symbol('validateAsync');
var kGetCommandInstance = Symbol('getCommandInstance');
var kGetContext = Symbol('getContext');
var kGetHasOutput = Symbol('getHasOutput');
var kGetLoggerInstance = Symbol('getLoggerInstance');
var kGetParseContext = Symbol('getParseContext');
var kGetUsageInstance = Symbol('getUsageInstance');
var kGetValidationInstance = Symbol('getValidationInstance');
var kHasParseCallback = Symbol('hasParseCallback');
var kPostProcess = Symbol('postProcess');
var kRebase = Symbol('rebase');
var kReset = Symbol('reset');
var kRunYargsParserAndExecuteCommands = Symbol('runYargsParserAndExecuteCommands');
var kRunValidation = Symbol('runValidation');
var kSetHasOutput = Symbol('setHasOutput');
var kTrackManuallySetKeys = Symbol('kTrackManuallySetKeys');
var YargsInstance = /** @class */ (function () {
    function YargsInstance(processArgs, cwd, parentRequire, shim) {
        if (processArgs === void 0) { processArgs = []; }
        this.customScriptName = false;
        this.parsed = false;
        _YargsInstance_command.set(this, void 0);
        _YargsInstance_cwd.set(this, void 0);
        // use context object to keep track of resets, subcommand execution, etc.,
        // submodules should modify and check the state of context as necessary:
        _YargsInstance_context.set(this, { commands: [], fullCommands: [] });
        _YargsInstance_completion.set(this, null);
        _YargsInstance_completionCommand.set(this, null);
        _YargsInstance_defaultShowHiddenOpt.set(this, 'show-hidden');
        _YargsInstance_exitError.set(this, null);
        _YargsInstance_detectLocale.set(this, true);
        _YargsInstance_emittedWarnings.set(this, {});
        _YargsInstance_exitProcess.set(this, true);
        _YargsInstance_frozens.set(this, []);
        _YargsInstance_globalMiddleware.set(this, void 0);
        _YargsInstance_groups.set(this, {});
        _YargsInstance_hasOutput.set(this, false);
        _YargsInstance_helpOpt.set(this, null);
        _YargsInstance_logger.set(this, void 0);
        _YargsInstance_output.set(this, '');
        _YargsInstance_options.set(this, void 0);
        _YargsInstance_parentRequire.set(this, void 0);
        _YargsInstance_parserConfig.set(this, {});
        _YargsInstance_parseFn.set(this, null);
        _YargsInstance_parseContext.set(this, null);
        _YargsInstance_pkgs.set(this, {});
        _YargsInstance_preservedGroups.set(this, {});
        _YargsInstance_processArgs.set(this, void 0);
        _YargsInstance_recommendCommands.set(this, false);
        _YargsInstance_shim.set(this, void 0);
        _YargsInstance_strict.set(this, false);
        _YargsInstance_strictCommands.set(this, false);
        _YargsInstance_strictOptions.set(this, false);
        _YargsInstance_usage.set(this, void 0);
        _YargsInstance_versionOpt.set(this, null);
        _YargsInstance_validation.set(this, void 0);
        __classPrivateFieldSet(this, _YargsInstance_shim, shim, "f");
        __classPrivateFieldSet(this, _YargsInstance_processArgs, processArgs, "f");
        __classPrivateFieldSet(this, _YargsInstance_cwd, cwd, "f");
        __classPrivateFieldSet(this, _YargsInstance_parentRequire, parentRequire, "f");
        __classPrivateFieldSet(this, _YargsInstance_globalMiddleware, new middleware_js_1.GlobalMiddleware(this), "f");
        this.$0 = this[kGetDollarZero]();
        // #command, #validation, and #usage are initialized on first reset:
        this[kReset]();
        __classPrivateFieldSet(this, _YargsInstance_command, __classPrivateFieldGet(this, _YargsInstance_command, "f"), "f");
        __classPrivateFieldSet(this, _YargsInstance_usage, __classPrivateFieldGet(this, _YargsInstance_usage, "f"), "f");
        __classPrivateFieldSet(this, _YargsInstance_validation, __classPrivateFieldGet(this, _YargsInstance_validation, "f"), "f");
        __classPrivateFieldSet(this, _YargsInstance_options, __classPrivateFieldGet(this, _YargsInstance_options, "f"), "f");
        __classPrivateFieldGet(this, _YargsInstance_options, "f").showHiddenOpt = __classPrivateFieldGet(this, _YargsInstance_defaultShowHiddenOpt, "f");
        __classPrivateFieldSet(this, _YargsInstance_logger, this[kCreateLogger](), "f");
    }
    YargsInstance.prototype.addHelpOpt = function (opt, msg) {
        var defaultHelpOpt = 'help';
        (0, argsert_js_1.argsert)('[string|boolean] [string]', [opt, msg], arguments.length);
        // nuke the key previously configured
        // to return help.
        if (__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f")) {
            this[kDeleteFromParserHintObject](__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f"));
            __classPrivateFieldSet(this, _YargsInstance_helpOpt, null, "f");
        }
        if (opt === false && msg === undefined)
            return this;
        // use arguments, fallback to defaults for opt and msg
        __classPrivateFieldSet(this, _YargsInstance_helpOpt, typeof opt === 'string' ? opt : defaultHelpOpt, "f");
        this.boolean(__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f"));
        this.describe(__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f"), msg || __classPrivateFieldGet(this, _YargsInstance_usage, "f").deferY18nLookup('Show help'));
        return this;
    };
    YargsInstance.prototype.help = function (opt, msg) {
        return this.addHelpOpt(opt, msg);
    };
    YargsInstance.prototype.addShowHiddenOpt = function (opt, msg) {
        (0, argsert_js_1.argsert)('[string|boolean] [string]', [opt, msg], arguments.length);
        if (opt === false && msg === undefined)
            return this;
        var showHiddenOpt = typeof opt === 'string' ? opt : __classPrivateFieldGet(this, _YargsInstance_defaultShowHiddenOpt, "f");
        this.boolean(showHiddenOpt);
        this.describe(showHiddenOpt, msg || __classPrivateFieldGet(this, _YargsInstance_usage, "f").deferY18nLookup('Show hidden options'));
        __classPrivateFieldGet(this, _YargsInstance_options, "f").showHiddenOpt = showHiddenOpt;
        return this;
    };
    YargsInstance.prototype.showHidden = function (opt, msg) {
        return this.addShowHiddenOpt(opt, msg);
    };
    YargsInstance.prototype.alias = function (key, value) {
        (0, argsert_js_1.argsert)('<object|string|array> [string|array]', [key, value], arguments.length);
        this[kPopulateParserHintArrayDictionary](this.alias.bind(this), 'alias', key, value);
        return this;
    };
    YargsInstance.prototype.array = function (keys) {
        (0, argsert_js_1.argsert)('<array|string>', [keys], arguments.length);
        this[kPopulateParserHintArray]('array', keys);
        this[kTrackManuallySetKeys](keys);
        return this;
    };
    YargsInstance.prototype.boolean = function (keys) {
        (0, argsert_js_1.argsert)('<array|string>', [keys], arguments.length);
        this[kPopulateParserHintArray]('boolean', keys);
        this[kTrackManuallySetKeys](keys);
        return this;
    };
    YargsInstance.prototype.check = function (f, global) {
        var _this = this;
        (0, argsert_js_1.argsert)('<function> [boolean]', [f, global], arguments.length);
        this.middleware(function (argv, _yargs) {
            return (0, maybe_async_result_js_1.maybeAsyncResult)(function () {
                return f(argv, _yargs.getOptions());
            }, function (result) {
                if (!result) {
                    __classPrivateFieldGet(_this, _YargsInstance_usage, "f").fail(__classPrivateFieldGet(_this, _YargsInstance_shim, "f").y18n.__('Argument check failed: %s', f.toString()));
                }
                else if (typeof result === 'string' || result instanceof Error) {
                    __classPrivateFieldGet(_this, _YargsInstance_usage, "f").fail(result.toString(), result);
                }
                return argv;
            }, function (err) {
                __classPrivateFieldGet(_this, _YargsInstance_usage, "f").fail(err.message ? err.message : err.toString(), err);
                return argv;
            });
        }, false, global);
        return this;
    };
    YargsInstance.prototype.choices = function (key, value) {
        (0, argsert_js_1.argsert)('<object|string|array> [string|array]', [key, value], arguments.length);
        this[kPopulateParserHintArrayDictionary](this.choices.bind(this), 'choices', key, value);
        return this;
    };
    YargsInstance.prototype.coerce = function (keys, value) {
        (0, argsert_js_1.argsert)('<object|string|array> [function]', [keys, value], arguments.length);
        if (Array.isArray(keys)) {
            if (!value) {
                throw new yerror_js_1.YError('coerce callback must be provided');
            }
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                this.coerce(key, value);
            }
            return this;
        }
        else if (typeof keys === 'object') {
            for (var _a = 0, _b = Object.keys(keys); _a < _b.length; _a++) {
                var key = _b[_a];
                this.coerce(key, keys[key]);
            }
            return this;
        }
        if (!value) {
            throw new yerror_js_1.YError('coerce callback must be provided');
        }
        // This noop tells yargs-parser about the existence of the option
        // represented by "keys", so that it can apply camel case expansion
        // if needed:
        __classPrivateFieldGet(this, _YargsInstance_options, "f").key[keys] = true;
        __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").addCoerceMiddleware(function (argv, yargs) {
            var aliases;
            return (0, maybe_async_result_js_1.maybeAsyncResult)(function () {
                aliases = yargs.getAliases();
                return value(argv[keys]);
            }, function (result) {
                argv[keys] = result;
                if (aliases[keys]) {
                    for (var _i = 0, _a = aliases[keys]; _i < _a.length; _i++) {
                        var alias = _a[_i];
                        argv[alias] = result;
                    }
                }
                return argv;
            }, function (err) {
                throw new yerror_js_1.YError(err.message);
            });
        }, keys);
        return this;
    };
    YargsInstance.prototype.conflicts = function (key1, key2) {
        (0, argsert_js_1.argsert)('<string|object> [string|array]', [key1, key2], arguments.length);
        __classPrivateFieldGet(this, _YargsInstance_validation, "f").conflicts(key1, key2);
        return this;
    };
    YargsInstance.prototype.config = function (key, msg, parseFn) {
        var _this = this;
        if (key === void 0) { key = 'config'; }
        (0, argsert_js_1.argsert)('[object|string] [string|function] [function]', [key, msg, parseFn], arguments.length);
        // allow a config object to be provided directly.
        if (typeof key === 'object' && !Array.isArray(key)) {
            key = (0, apply_extends_js_1.applyExtends)(key, __classPrivateFieldGet(this, _YargsInstance_cwd, "f"), this[kGetParserConfiguration]()['deep-merge-config'] || false, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
            __classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects = (__classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects || []).concat(key);
            return this;
        }
        // allow for a custom parsing function.
        if (typeof msg === 'function') {
            parseFn = msg;
            msg = undefined;
        }
        this.describe(key, msg || __classPrivateFieldGet(this, _YargsInstance_usage, "f").deferY18nLookup('Path to JSON config file'));
        (Array.isArray(key) ? key : [key]).forEach(function (k) {
            __classPrivateFieldGet(_this, _YargsInstance_options, "f").config[k] = parseFn || true;
        });
        return this;
    };
    YargsInstance.prototype.completion = function (cmd, desc, fn) {
        (0, argsert_js_1.argsert)('[string] [string|boolean|function] [function]', [cmd, desc, fn], arguments.length);
        // a function to execute when generating
        // completions can be provided as the second
        // or third argument to completion.
        if (typeof desc === 'function') {
            fn = desc;
            desc = undefined;
        }
        // register the completion command.
        __classPrivateFieldSet(this, _YargsInstance_completionCommand, cmd || __classPrivateFieldGet(this, _YargsInstance_completionCommand, "f") || 'completion', "f");
        if (!desc && desc !== false) {
            desc = 'generate completion script';
        }
        this.command(__classPrivateFieldGet(this, _YargsInstance_completionCommand, "f"), desc);
        // a function can be provided
        if (fn)
            __classPrivateFieldGet(this, _YargsInstance_completion, "f").registerFunction(fn);
        return this;
    };
    YargsInstance.prototype.command = function (cmd, description, builder, handler, middlewares, deprecated) {
        (0, argsert_js_1.argsert)('<string|array|object> [string|boolean] [function|object] [function] [array] [boolean|string]', [cmd, description, builder, handler, middlewares, deprecated], arguments.length);
        __classPrivateFieldGet(this, _YargsInstance_command, "f").addHandler(cmd, description, builder, handler, middlewares, deprecated);
        return this;
    };
    YargsInstance.prototype.commands = function (cmd, description, builder, handler, middlewares, deprecated) {
        return this.command(cmd, description, builder, handler, middlewares, deprecated);
    };
    YargsInstance.prototype.commandDir = function (dir, opts) {
        (0, argsert_js_1.argsert)('<string> [object]', [dir, opts], arguments.length);
        var req = __classPrivateFieldGet(this, _YargsInstance_parentRequire, "f") || __classPrivateFieldGet(this, _YargsInstance_shim, "f").require;
        __classPrivateFieldGet(this, _YargsInstance_command, "f").addDirectory(dir, req, __classPrivateFieldGet(this, _YargsInstance_shim, "f").getCallerFile(), opts);
        return this;
    };
    YargsInstance.prototype.count = function (keys) {
        (0, argsert_js_1.argsert)('<array|string>', [keys], arguments.length);
        this[kPopulateParserHintArray]('count', keys);
        this[kTrackManuallySetKeys](keys);
        return this;
    };
    YargsInstance.prototype["default"] = function (key, value, defaultDescription) {
        (0, argsert_js_1.argsert)('<object|string|array> [*] [string]', [key, value, defaultDescription], arguments.length);
        if (defaultDescription) {
            (0, common_types_js_1.assertSingleKey)(key, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
            __classPrivateFieldGet(this, _YargsInstance_options, "f").defaultDescription[key] = defaultDescription;
        }
        if (typeof value === 'function') {
            (0, common_types_js_1.assertSingleKey)(key, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
            if (!__classPrivateFieldGet(this, _YargsInstance_options, "f").defaultDescription[key])
                __classPrivateFieldGet(this, _YargsInstance_options, "f").defaultDescription[key] =
                    __classPrivateFieldGet(this, _YargsInstance_usage, "f").functionDescription(value);
            value = value.call();
        }
        this[kPopulateParserHintSingleValueDictionary](this["default"].bind(this), 'default', key, value);
        return this;
    };
    YargsInstance.prototype.defaults = function (key, value, defaultDescription) {
        return this["default"](key, value, defaultDescription);
    };
    YargsInstance.prototype.demandCommand = function (min, max, minMsg, maxMsg) {
        if (min === void 0) { min = 1; }
        (0, argsert_js_1.argsert)('[number] [number|string] [string|null|undefined] [string|null|undefined]', [min, max, minMsg, maxMsg], arguments.length);
        if (typeof max !== 'number') {
            minMsg = max;
            max = Infinity;
        }
        this.global('_', false);
        __classPrivateFieldGet(this, _YargsInstance_options, "f").demandedCommands._ = {
            min: min,
            max: max,
            minMsg: minMsg,
            maxMsg: maxMsg
        };
        return this;
    };
    YargsInstance.prototype.demand = function (keys, max, msg) {
        var _this = this;
        // you can optionally provide a 'max' key,
        // which will raise an exception if too many '_'
        // options are provided.
        if (Array.isArray(max)) {
            max.forEach(function (key) {
                (0, common_types_js_1.assertNotStrictEqual)(msg, true, __classPrivateFieldGet(_this, _YargsInstance_shim, "f"));
                _this.demandOption(key, msg);
            });
            max = Infinity;
        }
        else if (typeof max !== 'number') {
            msg = max;
            max = Infinity;
        }
        if (typeof keys === 'number') {
            (0, common_types_js_1.assertNotStrictEqual)(msg, true, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
            this.demandCommand(keys, max, msg, msg);
        }
        else if (Array.isArray(keys)) {
            keys.forEach(function (key) {
                (0, common_types_js_1.assertNotStrictEqual)(msg, true, __classPrivateFieldGet(_this, _YargsInstance_shim, "f"));
                _this.demandOption(key, msg);
            });
        }
        else {
            if (typeof msg === 'string') {
                this.demandOption(keys, msg);
            }
            else if (msg === true || typeof msg === 'undefined') {
                this.demandOption(keys);
            }
        }
        return this;
    };
    YargsInstance.prototype.demandOption = function (keys, msg) {
        (0, argsert_js_1.argsert)('<object|string|array> [string]', [keys, msg], arguments.length);
        this[kPopulateParserHintSingleValueDictionary](this.demandOption.bind(this), 'demandedOptions', keys, msg);
        return this;
    };
    YargsInstance.prototype.deprecateOption = function (option, message) {
        (0, argsert_js_1.argsert)('<string> [string|boolean]', [option, message], arguments.length);
        __classPrivateFieldGet(this, _YargsInstance_options, "f").deprecatedOptions[option] = message;
        return this;
    };
    YargsInstance.prototype.describe = function (keys, description) {
        (0, argsert_js_1.argsert)('<object|string|array> [string]', [keys, description], arguments.length);
        this[kSetKey](keys, true);
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").describe(keys, description);
        return this;
    };
    YargsInstance.prototype.detectLocale = function (detect) {
        (0, argsert_js_1.argsert)('<boolean>', [detect], arguments.length);
        __classPrivateFieldSet(this, _YargsInstance_detectLocale, detect, "f");
        return this;
    };
    // as long as options.envPrefix is not undefined,
    // parser will apply env vars matching prefix to argv
    YargsInstance.prototype.env = function (prefix) {
        (0, argsert_js_1.argsert)('[string|boolean]', [prefix], arguments.length);
        if (prefix === false)
            delete __classPrivateFieldGet(this, _YargsInstance_options, "f").envPrefix;
        else
            __classPrivateFieldGet(this, _YargsInstance_options, "f").envPrefix = prefix || '';
        return this;
    };
    YargsInstance.prototype.epilogue = function (msg) {
        (0, argsert_js_1.argsert)('<string>', [msg], arguments.length);
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").epilog(msg);
        return this;
    };
    YargsInstance.prototype.epilog = function (msg) {
        return this.epilogue(msg);
    };
    YargsInstance.prototype.example = function (cmd, description) {
        var _this = this;
        (0, argsert_js_1.argsert)('<string|array> [string]', [cmd, description], arguments.length);
        if (Array.isArray(cmd)) {
            cmd.forEach(function (exampleParams) { return _this.example.apply(_this, exampleParams); });
        }
        else {
            __classPrivateFieldGet(this, _YargsInstance_usage, "f").example(cmd, description);
        }
        return this;
    };
    // maybe exit, always capture context about why we wanted to exit:
    YargsInstance.prototype.exit = function (code, err) {
        __classPrivateFieldSet(this, _YargsInstance_hasOutput, true, "f");
        __classPrivateFieldSet(this, _YargsInstance_exitError, err, "f");
        if (__classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"))
            __classPrivateFieldGet(this, _YargsInstance_shim, "f").process.exit(code);
    };
    YargsInstance.prototype.exitProcess = function (enabled) {
        if (enabled === void 0) { enabled = true; }
        (0, argsert_js_1.argsert)('[boolean]', [enabled], arguments.length);
        __classPrivateFieldSet(this, _YargsInstance_exitProcess, enabled, "f");
        return this;
    };
    YargsInstance.prototype.fail = function (f) {
        (0, argsert_js_1.argsert)('<function|boolean>', [f], arguments.length);
        if (typeof f === 'boolean' && f !== false) {
            throw new yerror_js_1.YError("Invalid first argument. Expected function or boolean 'false'");
        }
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").failFn(f);
        return this;
    };
    YargsInstance.prototype.getAliases = function () {
        return this.parsed ? this.parsed.aliases : {};
    };
    YargsInstance.prototype.getCompletion = function (args, done) {
        return __awaiter(this, arguments, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                (0, argsert_js_1.argsert)('<array> [function]', [args, done], arguments.length);
                if (!done) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            __classPrivateFieldGet(_this, _YargsInstance_completion, "f").getCompletion(args, function (err, completions) {
                                if (err)
                                    reject(err);
                                else
                                    resolve(completions);
                            });
                        })];
                }
                else {
                    return [2 /*return*/, __classPrivateFieldGet(this, _YargsInstance_completion, "f").getCompletion(args, done)];
                }
                return [2 /*return*/];
            });
        });
    };
    YargsInstance.prototype.getDemandedOptions = function () {
        (0, argsert_js_1.argsert)([], 0);
        return __classPrivateFieldGet(this, _YargsInstance_options, "f").demandedOptions;
    };
    YargsInstance.prototype.getDemandedCommands = function () {
        (0, argsert_js_1.argsert)([], 0);
        return __classPrivateFieldGet(this, _YargsInstance_options, "f").demandedCommands;
    };
    YargsInstance.prototype.getDeprecatedOptions = function () {
        (0, argsert_js_1.argsert)([], 0);
        return __classPrivateFieldGet(this, _YargsInstance_options, "f").deprecatedOptions;
    };
    YargsInstance.prototype.getDetectLocale = function () {
        return __classPrivateFieldGet(this, _YargsInstance_detectLocale, "f");
    };
    YargsInstance.prototype.getExitProcess = function () {
        return __classPrivateFieldGet(this, _YargsInstance_exitProcess, "f");
    };
    // combine explicit and preserved groups. explicit groups should be first
    YargsInstance.prototype.getGroups = function () {
        return Object.assign({}, __classPrivateFieldGet(this, _YargsInstance_groups, "f"), __classPrivateFieldGet(this, _YargsInstance_preservedGroups, "f"));
    };
    YargsInstance.prototype.getHelp = function () {
        var _this = this;
        __classPrivateFieldSet(this, _YargsInstance_hasOutput, true, "f");
        if (!__classPrivateFieldGet(this, _YargsInstance_usage, "f").hasCachedHelpMessage()) {
            if (!this.parsed) {
                // Run the parser as if --help was passed to it (this is what
                // the last parameter `true` indicates).
                var parse = this[kRunYargsParserAndExecuteCommands](__classPrivateFieldGet(this, _YargsInstance_processArgs, "f"), undefined, undefined, 0, true);
                if ((0, is_promise_js_1.isPromise)(parse)) {
                    return parse.then(function () {
                        return __classPrivateFieldGet(_this, _YargsInstance_usage, "f").help();
                    });
                }
            }
            // Ensure top level options/positionals have been configured:
            var builderResponse = __classPrivateFieldGet(this, _YargsInstance_command, "f").runDefaultBuilderOn(this);
            if ((0, is_promise_js_1.isPromise)(builderResponse)) {
                return builderResponse.then(function () {
                    return __classPrivateFieldGet(_this, _YargsInstance_usage, "f").help();
                });
            }
        }
        return Promise.resolve(__classPrivateFieldGet(this, _YargsInstance_usage, "f").help());
    };
    YargsInstance.prototype.getOptions = function () {
        return __classPrivateFieldGet(this, _YargsInstance_options, "f");
    };
    YargsInstance.prototype.getStrict = function () {
        return __classPrivateFieldGet(this, _YargsInstance_strict, "f");
    };
    YargsInstance.prototype.getStrictCommands = function () {
        return __classPrivateFieldGet(this, _YargsInstance_strictCommands, "f");
    };
    YargsInstance.prototype.getStrictOptions = function () {
        return __classPrivateFieldGet(this, _YargsInstance_strictOptions, "f");
    };
    YargsInstance.prototype.global = function (globals, global) {
        var _this = this;
        (0, argsert_js_1.argsert)('<string|array> [boolean]', [globals, global], arguments.length);
        globals = [].concat(globals);
        if (global !== false) {
            __classPrivateFieldGet(this, _YargsInstance_options, "f").local = __classPrivateFieldGet(this, _YargsInstance_options, "f").local.filter(function (l) { return globals.indexOf(l) === -1; });
        }
        else {
            globals.forEach(function (g) {
                if (!__classPrivateFieldGet(_this, _YargsInstance_options, "f").local.includes(g))
                    __classPrivateFieldGet(_this, _YargsInstance_options, "f").local.push(g);
            });
        }
        return this;
    };
    YargsInstance.prototype.group = function (opts, groupName) {
        (0, argsert_js_1.argsert)('<string|array> <string>', [opts, groupName], arguments.length);
        var existing = __classPrivateFieldGet(this, _YargsInstance_preservedGroups, "f")[groupName] || __classPrivateFieldGet(this, _YargsInstance_groups, "f")[groupName];
        if (__classPrivateFieldGet(this, _YargsInstance_preservedGroups, "f")[groupName]) {
            // we now only need to track this group name in groups.
            delete __classPrivateFieldGet(this, _YargsInstance_preservedGroups, "f")[groupName];
        }
        var seen = {};
        __classPrivateFieldGet(this, _YargsInstance_groups, "f")[groupName] = (existing || []).concat(opts).filter(function (key) {
            if (seen[key])
                return false;
            return (seen[key] = true);
        });
        return this;
    };
    YargsInstance.prototype.hide = function (key) {
        (0, argsert_js_1.argsert)('<string>', [key], arguments.length);
        __classPrivateFieldGet(this, _YargsInstance_options, "f").hiddenOptions.push(key);
        return this;
    };
    YargsInstance.prototype.implies = function (key, value) {
        (0, argsert_js_1.argsert)('<string|object> [number|string|array]', [key, value], arguments.length);
        __classPrivateFieldGet(this, _YargsInstance_validation, "f").implies(key, value);
        return this;
    };
    YargsInstance.prototype.locale = function (locale) {
        (0, argsert_js_1.argsert)('[string]', [locale], arguments.length);
        if (!locale) {
            this[kGuessLocale]();
            return __classPrivateFieldGet(this, _YargsInstance_shim, "f").y18n.getLocale();
        }
        __classPrivateFieldSet(this, _YargsInstance_detectLocale, false, "f");
        __classPrivateFieldGet(this, _YargsInstance_shim, "f").y18n.setLocale(locale);
        return this;
    };
    YargsInstance.prototype.middleware = function (callback, applyBeforeValidation, global) {
        return __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").addMiddleware(callback, !!applyBeforeValidation, global);
    };
    YargsInstance.prototype.nargs = function (key, value) {
        (0, argsert_js_1.argsert)('<string|object|array> [number]', [key, value], arguments.length);
        this[kPopulateParserHintSingleValueDictionary](this.nargs.bind(this), 'narg', key, value);
        return this;
    };
    YargsInstance.prototype.normalize = function (keys) {
        (0, argsert_js_1.argsert)('<array|string>', [keys], arguments.length);
        this[kPopulateParserHintArray]('normalize', keys);
        return this;
    };
    YargsInstance.prototype.number = function (keys) {
        (0, argsert_js_1.argsert)('<array|string>', [keys], arguments.length);
        this[kPopulateParserHintArray]('number', keys);
        this[kTrackManuallySetKeys](keys);
        return this;
    };
    YargsInstance.prototype.option = function (key, opt) {
        var _this = this;
        (0, argsert_js_1.argsert)('<string|object> [object]', [key, opt], arguments.length);
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) {
                _this.options(k, key[k]);
            });
        }
        else {
            if (typeof opt !== 'object') {
                opt = {};
            }
            this[kTrackManuallySetKeys](key);
            // Warn about version name collision
            // Addresses: https://github.com/yargs/yargs/issues/1979
            if (__classPrivateFieldGet(this, _YargsInstance_versionOpt, "f") && (key === 'version' || (opt === null || opt === void 0 ? void 0 : opt.alias) === 'version')) {
                this[kEmitWarning]([
                    '"version" is a reserved word.',
                    'Please do one of the following:',
                    '- Disable version with `yargs.version(false)` if using "version" as an option',
                    '- Use the built-in `yargs.version` method instead (if applicable)',
                    '- Use a different option key',
                    'https://yargs.js.org/docs/#api-reference-version',
                ].join('\n'), undefined, 'versionWarning' // TODO: better dedupeId
                );
            }
            __classPrivateFieldGet(this, _YargsInstance_options, "f").key[key] = true; // track manually set keys.
            if (opt.alias)
                this.alias(key, opt.alias);
            var deprecate = opt.deprecate || opt.deprecated;
            if (deprecate) {
                this.deprecateOption(key, deprecate);
            }
            var demand = opt.demand || opt.required || opt.require;
            // A required option can be specified via "demand: true".
            if (demand) {
                this.demand(key, demand);
            }
            if (opt.demandOption) {
                this.demandOption(key, typeof opt.demandOption === 'string' ? opt.demandOption : undefined);
            }
            if (opt.conflicts) {
                this.conflicts(key, opt.conflicts);
            }
            if ('default' in opt) {
                this["default"](key, opt["default"]);
            }
            if (opt.implies !== undefined) {
                this.implies(key, opt.implies);
            }
            if (opt.nargs !== undefined) {
                this.nargs(key, opt.nargs);
            }
            if (opt.config) {
                this.config(key, opt.configParser);
            }
            if (opt.normalize) {
                this.normalize(key);
            }
            if (opt.choices) {
                this.choices(key, opt.choices);
            }
            if (opt.coerce) {
                this.coerce(key, opt.coerce);
            }
            if (opt.group) {
                this.group(key, opt.group);
            }
            if (opt.boolean || opt.type === 'boolean') {
                this.boolean(key);
                if (opt.alias)
                    this.boolean(opt.alias);
            }
            if (opt.array || opt.type === 'array') {
                this.array(key);
                if (opt.alias)
                    this.array(opt.alias);
            }
            if (opt.number || opt.type === 'number') {
                this.number(key);
                if (opt.alias)
                    this.number(opt.alias);
            }
            if (opt.string || opt.type === 'string') {
                this.string(key);
                if (opt.alias)
                    this.string(opt.alias);
            }
            if (opt.count || opt.type === 'count') {
                this.count(key);
            }
            if (typeof opt.global === 'boolean') {
                this.global(key, opt.global);
            }
            if (opt.defaultDescription) {
                __classPrivateFieldGet(this, _YargsInstance_options, "f").defaultDescription[key] = opt.defaultDescription;
            }
            if (opt.skipValidation) {
                this.skipValidation(key);
            }
            var desc = opt.describe || opt.description || opt.desc;
            this.describe(key, desc);
            if (opt.hidden) {
                this.hide(key);
            }
            if (opt.requiresArg) {
                this.requiresArg(key);
            }
        }
        return this;
    };
    YargsInstance.prototype.options = function (key, opt) {
        return this.option(key, opt);
    };
    YargsInstance.prototype.parse = function (args, shortCircuit, _parseFn) {
        var _this = this;
        (0, argsert_js_1.argsert)('[string|array] [function|boolean|object] [function]', [args, shortCircuit, _parseFn], arguments.length);
        this[kFreeze](); // Push current state of parser onto stack.
        if (typeof args === 'undefined') {
            args = __classPrivateFieldGet(this, _YargsInstance_processArgs, "f");
        }
        // a context object can optionally be provided, this allows
        // additional information to be passed to a command handler.
        if (typeof shortCircuit === 'object') {
            __classPrivateFieldSet(this, _YargsInstance_parseContext, shortCircuit, "f");
            shortCircuit = _parseFn;
        }
        // by providing a function as a second argument to
        // parse you can capture output that would otherwise
        // default to printing to stdout/stderr.
        if (typeof shortCircuit === 'function') {
            __classPrivateFieldSet(this, _YargsInstance_parseFn, shortCircuit, "f");
            shortCircuit = false;
        }
        // completion short-circuits the parsing process,
        // skipping validation, etc.
        if (!shortCircuit)
            __classPrivateFieldSet(this, _YargsInstance_processArgs, args, "f");
        if (__classPrivateFieldGet(this, _YargsInstance_parseFn, "f"))
            __classPrivateFieldSet(this, _YargsInstance_exitProcess, false, "f");
        var parsed = this[kRunYargsParserAndExecuteCommands](args, !!shortCircuit);
        var tmpParsed = this.parsed;
        __classPrivateFieldGet(this, _YargsInstance_completion, "f").setParsed(this.parsed);
        if ((0, is_promise_js_1.isPromise)(parsed)) {
            return parsed
                .then(function (argv) {
                if (__classPrivateFieldGet(_this, _YargsInstance_parseFn, "f"))
                    __classPrivateFieldGet(_this, _YargsInstance_parseFn, "f").call(_this, __classPrivateFieldGet(_this, _YargsInstance_exitError, "f"), argv, __classPrivateFieldGet(_this, _YargsInstance_output, "f"));
                return argv;
            })["catch"](function (err) {
                if (__classPrivateFieldGet(_this, _YargsInstance_parseFn, "f")) {
                    __classPrivateFieldGet(_this, _YargsInstance_parseFn, "f")(err, _this.parsed.argv, __classPrivateFieldGet(_this, _YargsInstance_output, "f"));
                }
                throw err;
            })["finally"](function () {
                _this[kUnfreeze](); // Pop the stack.
                _this.parsed = tmpParsed;
            });
        }
        else {
            if (__classPrivateFieldGet(this, _YargsInstance_parseFn, "f"))
                __classPrivateFieldGet(this, _YargsInstance_parseFn, "f").call(this, __classPrivateFieldGet(this, _YargsInstance_exitError, "f"), parsed, __classPrivateFieldGet(this, _YargsInstance_output, "f"));
            this[kUnfreeze](); // Pop the stack.
            this.parsed = tmpParsed;
        }
        return parsed;
    };
    YargsInstance.prototype.parseAsync = function (args, shortCircuit, _parseFn) {
        var maybePromise = this.parse(args, shortCircuit, _parseFn);
        return !(0, is_promise_js_1.isPromise)(maybePromise)
            ? Promise.resolve(maybePromise)
            : maybePromise;
    };
    YargsInstance.prototype.parseSync = function (args, shortCircuit, _parseFn) {
        var maybePromise = this.parse(args, shortCircuit, _parseFn);
        if ((0, is_promise_js_1.isPromise)(maybePromise)) {
            throw new yerror_js_1.YError('.parseSync() must not be used with asynchronous builders, handlers, or middleware');
        }
        return maybePromise;
    };
    YargsInstance.prototype.parserConfiguration = function (config) {
        (0, argsert_js_1.argsert)('<object>', [config], arguments.length);
        __classPrivateFieldSet(this, _YargsInstance_parserConfig, config, "f");
        return this;
    };
    YargsInstance.prototype.pkgConf = function (key, rootPath) {
        (0, argsert_js_1.argsert)('<string> [string]', [key, rootPath], arguments.length);
        var conf = null;
        // prefer cwd to require-main-filename in this method
        // since we're looking for e.g. "nyc" config in nyc consumer
        // rather than "yargs" config in nyc (where nyc is the main filename)
        var obj = this[kPkgUp](rootPath || __classPrivateFieldGet(this, _YargsInstance_cwd, "f"));
        // If an object exists in the key, add it to options.configObjects
        if (obj[key] && typeof obj[key] === 'object') {
            conf = (0, apply_extends_js_1.applyExtends)(obj[key], rootPath || __classPrivateFieldGet(this, _YargsInstance_cwd, "f"), this[kGetParserConfiguration]()['deep-merge-config'] || false, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
            __classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects = (__classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects || []).concat(conf);
        }
        return this;
    };
    YargsInstance.prototype.positional = function (key, opts) {
        (0, argsert_js_1.argsert)('<string> <object>', [key, opts], arguments.length);
        // .positional() only supports a subset of the configuration
        // options available to .option():
        var supportedOpts = [
            'default',
            'defaultDescription',
            'implies',
            'normalize',
            'choices',
            'conflicts',
            'coerce',
            'type',
            'describe',
            'desc',
            'description',
            'alias',
        ];
        opts = (0, obj_filter_js_1.objFilter)(opts, function (k, v) {
            // type can be one of string|number|boolean.
            if (k === 'type' && !['string', 'number', 'boolean'].includes(v))
                return false;
            return supportedOpts.includes(k);
        });
        // copy over any settings that can be inferred from the command string.
        var fullCommand = __classPrivateFieldGet(this, _YargsInstance_context, "f").fullCommands[__classPrivateFieldGet(this, _YargsInstance_context, "f").fullCommands.length - 1];
        var parseOptions = fullCommand
            ? __classPrivateFieldGet(this, _YargsInstance_command, "f").cmdToParseOptions(fullCommand)
            : {
                array: [],
                alias: {},
                "default": {},
                demand: {}
            };
        (0, common_types_js_1.objectKeys)(parseOptions).forEach(function (pk) {
            var parseOption = parseOptions[pk];
            if (Array.isArray(parseOption)) {
                if (parseOption.indexOf(key) !== -1)
                    opts[pk] = true;
            }
            else {
                if (parseOption[key] && !(pk in opts))
                    opts[pk] = parseOption[key];
            }
        });
        this.group(key, __classPrivateFieldGet(this, _YargsInstance_usage, "f").getPositionalGroupName());
        return this.option(key, opts);
    };
    YargsInstance.prototype.recommendCommands = function (recommend) {
        if (recommend === void 0) { recommend = true; }
        (0, argsert_js_1.argsert)('[boolean]', [recommend], arguments.length);
        __classPrivateFieldSet(this, _YargsInstance_recommendCommands, recommend, "f");
        return this;
    };
    YargsInstance.prototype.required = function (keys, max, msg) {
        return this.demand(keys, max, msg);
    };
    YargsInstance.prototype.require = function (keys, max, msg) {
        return this.demand(keys, max, msg);
    };
    YargsInstance.prototype.requiresArg = function (keys) {
        // the 2nd paramter [number] in the argsert the assertion is mandatory
        // as populateParserHintSingleValueDictionary recursively calls requiresArg
        // with Nan as a 2nd parameter, although we ignore it
        (0, argsert_js_1.argsert)('<array|string|object> [number]', [keys], arguments.length);
        // If someone configures nargs at the same time as requiresArg,
        // nargs should take precedence,
        // see: https://github.com/yargs/yargs/pull/1572
        // TODO: make this work with aliases, using a check similar to
        // checkAllAliases() in yargs-parser.
        if (typeof keys === 'string' && __classPrivateFieldGet(this, _YargsInstance_options, "f").narg[keys]) {
            return this;
        }
        else {
            this[kPopulateParserHintSingleValueDictionary](this.requiresArg.bind(this), 'narg', keys, NaN);
        }
        return this;
    };
    YargsInstance.prototype.showCompletionScript = function ($0, cmd) {
        (0, argsert_js_1.argsert)('[string] [string]', [$0, cmd], arguments.length);
        $0 = $0 || this.$0;
        __classPrivateFieldGet(this, _YargsInstance_logger, "f").log(__classPrivateFieldGet(this, _YargsInstance_completion, "f").generateCompletionScript($0, cmd || __classPrivateFieldGet(this, _YargsInstance_completionCommand, "f") || 'completion'));
        return this;
    };
    YargsInstance.prototype.showHelp = function (level) {
        var _this = this;
        (0, argsert_js_1.argsert)('[string|function]', [level], arguments.length);
        __classPrivateFieldSet(this, _YargsInstance_hasOutput, true, "f");
        if (!__classPrivateFieldGet(this, _YargsInstance_usage, "f").hasCachedHelpMessage()) {
            if (!this.parsed) {
                // Run the parser as if --help was passed to it (this is what
                // the last parameter `true` indicates).
                var parse = this[kRunYargsParserAndExecuteCommands](__classPrivateFieldGet(this, _YargsInstance_processArgs, "f"), undefined, undefined, 0, true);
                if ((0, is_promise_js_1.isPromise)(parse)) {
                    parse.then(function () {
                        __classPrivateFieldGet(_this, _YargsInstance_usage, "f").showHelp(level);
                    });
                    return this;
                }
            }
            // Ensure top level options/positionals have been configured:
            var builderResponse = __classPrivateFieldGet(this, _YargsInstance_command, "f").runDefaultBuilderOn(this);
            if ((0, is_promise_js_1.isPromise)(builderResponse)) {
                builderResponse.then(function () {
                    __classPrivateFieldGet(_this, _YargsInstance_usage, "f").showHelp(level);
                });
                return this;
            }
        }
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").showHelp(level);
        return this;
    };
    YargsInstance.prototype.scriptName = function (scriptName) {
        this.customScriptName = true;
        this.$0 = scriptName;
        return this;
    };
    YargsInstance.prototype.showHelpOnFail = function (enabled, message) {
        (0, argsert_js_1.argsert)('[boolean|string] [string]', [enabled, message], arguments.length);
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").showHelpOnFail(enabled, message);
        return this;
    };
    YargsInstance.prototype.showVersion = function (level) {
        (0, argsert_js_1.argsert)('[string|function]', [level], arguments.length);
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").showVersion(level);
        return this;
    };
    YargsInstance.prototype.skipValidation = function (keys) {
        (0, argsert_js_1.argsert)('<array|string>', [keys], arguments.length);
        this[kPopulateParserHintArray]('skipValidation', keys);
        return this;
    };
    YargsInstance.prototype.strict = function (enabled) {
        (0, argsert_js_1.argsert)('[boolean]', [enabled], arguments.length);
        __classPrivateFieldSet(this, _YargsInstance_strict, enabled !== false, "f");
        return this;
    };
    YargsInstance.prototype.strictCommands = function (enabled) {
        (0, argsert_js_1.argsert)('[boolean]', [enabled], arguments.length);
        __classPrivateFieldSet(this, _YargsInstance_strictCommands, enabled !== false, "f");
        return this;
    };
    YargsInstance.prototype.strictOptions = function (enabled) {
        (0, argsert_js_1.argsert)('[boolean]', [enabled], arguments.length);
        __classPrivateFieldSet(this, _YargsInstance_strictOptions, enabled !== false, "f");
        return this;
    };
    YargsInstance.prototype.string = function (keys) {
        (0, argsert_js_1.argsert)('<array|string>', [keys], arguments.length);
        this[kPopulateParserHintArray]('string', keys);
        this[kTrackManuallySetKeys](keys);
        return this;
    };
    YargsInstance.prototype.terminalWidth = function () {
        (0, argsert_js_1.argsert)([], 0);
        return __classPrivateFieldGet(this, _YargsInstance_shim, "f").process.stdColumns;
    };
    YargsInstance.prototype.updateLocale = function (obj) {
        return this.updateStrings(obj);
    };
    YargsInstance.prototype.updateStrings = function (obj) {
        (0, argsert_js_1.argsert)('<object>', [obj], arguments.length);
        __classPrivateFieldSet(this, _YargsInstance_detectLocale, false, "f");
        __classPrivateFieldGet(this, _YargsInstance_shim, "f").y18n.updateLocale(obj);
        return this;
    };
    YargsInstance.prototype.usage = function (msg, description, builder, handler) {
        (0, argsert_js_1.argsert)('<string|null|undefined> [string|boolean] [function|object] [function]', [msg, description, builder, handler], arguments.length);
        if (description !== undefined) {
            (0, common_types_js_1.assertNotStrictEqual)(msg, null, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
            // .usage() can be used as an alias for defining
            // a default command.
            if ((msg || '').match(/^\$0( |$)/)) {
                return this.command(msg, description, builder, handler);
            }
            else {
                throw new yerror_js_1.YError('.usage() description must start with $0 if being used as alias for .command()');
            }
        }
        else {
            __classPrivateFieldGet(this, _YargsInstance_usage, "f").usage(msg);
            return this;
        }
    };
    YargsInstance.prototype.version = function (opt, msg, ver) {
        var defaultVersionOpt = 'version';
        (0, argsert_js_1.argsert)('[boolean|string] [string] [string]', [opt, msg, ver], arguments.length);
        // nuke the key previously configured
        // to return version #.
        if (__classPrivateFieldGet(this, _YargsInstance_versionOpt, "f")) {
            this[kDeleteFromParserHintObject](__classPrivateFieldGet(this, _YargsInstance_versionOpt, "f"));
            __classPrivateFieldGet(this, _YargsInstance_usage, "f").version(undefined);
            __classPrivateFieldSet(this, _YargsInstance_versionOpt, null, "f");
        }
        if (arguments.length === 0) {
            ver = this[kGuessVersion]();
            opt = defaultVersionOpt;
        }
        else if (arguments.length === 1) {
            if (opt === false) {
                // disable default 'version' key.
                return this;
            }
            ver = opt;
            opt = defaultVersionOpt;
        }
        else if (arguments.length === 2) {
            ver = msg;
            msg = undefined;
        }
        __classPrivateFieldSet(this, _YargsInstance_versionOpt, typeof opt === 'string' ? opt : defaultVersionOpt, "f");
        msg = msg || __classPrivateFieldGet(this, _YargsInstance_usage, "f").deferY18nLookup('Show version number');
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").version(ver || undefined);
        this.boolean(__classPrivateFieldGet(this, _YargsInstance_versionOpt, "f"));
        this.describe(__classPrivateFieldGet(this, _YargsInstance_versionOpt, "f"), msg);
        return this;
    };
    YargsInstance.prototype.wrap = function (cols) {
        (0, argsert_js_1.argsert)('<number|null|undefined>', [cols], arguments.length);
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").wrap(cols);
        return this;
    };
    // to simplify the parsing of positionals in commands,
    // we temporarily populate '--' rather than _, with arguments
    // after the '--' directive. After the parse, we copy these back.
    YargsInstance.prototype[(_YargsInstance_command = new WeakMap(), _YargsInstance_cwd = new WeakMap(), _YargsInstance_context = new WeakMap(), _YargsInstance_completion = new WeakMap(), _YargsInstance_completionCommand = new WeakMap(), _YargsInstance_defaultShowHiddenOpt = new WeakMap(), _YargsInstance_exitError = new WeakMap(), _YargsInstance_detectLocale = new WeakMap(), _YargsInstance_emittedWarnings = new WeakMap(), _YargsInstance_exitProcess = new WeakMap(), _YargsInstance_frozens = new WeakMap(), _YargsInstance_globalMiddleware = new WeakMap(), _YargsInstance_groups = new WeakMap(), _YargsInstance_hasOutput = new WeakMap(), _YargsInstance_helpOpt = new WeakMap(), _YargsInstance_logger = new WeakMap(), _YargsInstance_output = new WeakMap(), _YargsInstance_options = new WeakMap(), _YargsInstance_parentRequire = new WeakMap(), _YargsInstance_parserConfig = new WeakMap(), _YargsInstance_parseFn = new WeakMap(), _YargsInstance_parseContext = new WeakMap(), _YargsInstance_pkgs = new WeakMap(), _YargsInstance_preservedGroups = new WeakMap(), _YargsInstance_processArgs = new WeakMap(), _YargsInstance_recommendCommands = new WeakMap(), _YargsInstance_shim = new WeakMap(), _YargsInstance_strict = new WeakMap(), _YargsInstance_strictCommands = new WeakMap(), _YargsInstance_strictOptions = new WeakMap(), _YargsInstance_usage = new WeakMap(), _YargsInstance_versionOpt = new WeakMap(), _YargsInstance_validation = new WeakMap(), kCopyDoubleDash)] = function (argv) {
        if (!argv._ || !argv['--'])
            return argv;
        // eslint-disable-next-line prefer-spread
        argv._.push.apply(argv._, argv['--']);
        // We catch an error here, in case someone has called Object.seal()
        // on the parsed object, see: https://github.com/babel/babel/pull/10733
        try {
            delete argv['--'];
            // eslint-disable-next-line no-empty
        }
        catch (_err) { }
        return argv;
    };
    YargsInstance.prototype[kCreateLogger] = function () {
        var _this = this;
        return {
            log: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (!_this[kHasParseCallback]())
                    console.log.apply(console, args);
                __classPrivateFieldSet(_this, _YargsInstance_hasOutput, true, "f");
                if (__classPrivateFieldGet(_this, _YargsInstance_output, "f").length)
                    __classPrivateFieldSet(_this, _YargsInstance_output, __classPrivateFieldGet(_this, _YargsInstance_output, "f") + '\n', "f");
                __classPrivateFieldSet(_this, _YargsInstance_output, __classPrivateFieldGet(_this, _YargsInstance_output, "f") + args.join(' '), "f");
            },
            error: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (!_this[kHasParseCallback]())
                    console.error.apply(console, args);
                __classPrivateFieldSet(_this, _YargsInstance_hasOutput, true, "f");
                if (__classPrivateFieldGet(_this, _YargsInstance_output, "f").length)
                    __classPrivateFieldSet(_this, _YargsInstance_output, __classPrivateFieldGet(_this, _YargsInstance_output, "f") + '\n', "f");
                __classPrivateFieldSet(_this, _YargsInstance_output, __classPrivateFieldGet(_this, _YargsInstance_output, "f") + args.join(' '), "f");
            }
        };
    };
    YargsInstance.prototype[kDeleteFromParserHintObject] = function (optionKey) {
        var _this = this;
        // delete from all parsing hints:
        // boolean, array, key, alias, etc.
        (0, common_types_js_1.objectKeys)(__classPrivateFieldGet(this, _YargsInstance_options, "f")).forEach(function (hintKey) {
            // configObjects is not a parsing hint array
            if ((function (key) { return key === 'configObjects'; })(hintKey))
                return;
            var hint = __classPrivateFieldGet(_this, _YargsInstance_options, "f")[hintKey];
            if (Array.isArray(hint)) {
                if (hint.includes(optionKey))
                    hint.splice(hint.indexOf(optionKey), 1);
            }
            else if (typeof hint === 'object') {
                delete hint[optionKey];
            }
        });
        // now delete the description from usage.js.
        delete __classPrivateFieldGet(this, _YargsInstance_usage, "f").getDescriptions()[optionKey];
    };
    YargsInstance.prototype[kEmitWarning] = function (warning, type, deduplicationId) {
        // prevent duplicate warning emissions
        if (!__classPrivateFieldGet(this, _YargsInstance_emittedWarnings, "f")[deduplicationId]) {
            __classPrivateFieldGet(this, _YargsInstance_shim, "f").process.emitWarning(warning, type);
            __classPrivateFieldGet(this, _YargsInstance_emittedWarnings, "f")[deduplicationId] = true;
        }
    };
    YargsInstance.prototype[kFreeze] = function () {
        __classPrivateFieldGet(this, _YargsInstance_frozens, "f").push({
            options: __classPrivateFieldGet(this, _YargsInstance_options, "f"),
            configObjects: __classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects.slice(0),
            exitProcess: __classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"),
            groups: __classPrivateFieldGet(this, _YargsInstance_groups, "f"),
            strict: __classPrivateFieldGet(this, _YargsInstance_strict, "f"),
            strictCommands: __classPrivateFieldGet(this, _YargsInstance_strictCommands, "f"),
            strictOptions: __classPrivateFieldGet(this, _YargsInstance_strictOptions, "f"),
            completionCommand: __classPrivateFieldGet(this, _YargsInstance_completionCommand, "f"),
            output: __classPrivateFieldGet(this, _YargsInstance_output, "f"),
            exitError: __classPrivateFieldGet(this, _YargsInstance_exitError, "f"),
            hasOutput: __classPrivateFieldGet(this, _YargsInstance_hasOutput, "f"),
            parsed: this.parsed,
            parseFn: __classPrivateFieldGet(this, _YargsInstance_parseFn, "f"),
            parseContext: __classPrivateFieldGet(this, _YargsInstance_parseContext, "f")
        });
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").freeze();
        __classPrivateFieldGet(this, _YargsInstance_validation, "f").freeze();
        __classPrivateFieldGet(this, _YargsInstance_command, "f").freeze();
        __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").freeze();
    };
    YargsInstance.prototype[kGetDollarZero] = function () {
        var _this = this;
        var $0 = '';
        // ignore the node bin, specify this in your
        // bin file with #!/usr/bin/env node
        var default$0;
        if (/\b(node|iojs|electron)(\.exe)?$/.test(__classPrivateFieldGet(this, _YargsInstance_shim, "f").process.argv()[0])) {
            default$0 = __classPrivateFieldGet(this, _YargsInstance_shim, "f").process.argv().slice(1, 2);
        }
        else {
            default$0 = __classPrivateFieldGet(this, _YargsInstance_shim, "f").process.argv().slice(0, 1);
        }
        $0 = default$0
            .map(function (x) {
            var b = _this[kRebase](__classPrivateFieldGet(_this, _YargsInstance_cwd, "f"), x);
            return x.match(/^(\/|([a-zA-Z]:)?\\)/) && b.length < x.length ? b : x;
        })
            .join(' ')
            .trim();
        if (__classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv('_') &&
            __classPrivateFieldGet(this, _YargsInstance_shim, "f").getProcessArgvBin() === __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv('_')) {
            $0 = __classPrivateFieldGet(this, _YargsInstance_shim, "f")
                .getEnv('_')
                .replace("".concat(__classPrivateFieldGet(this, _YargsInstance_shim, "f").path.dirname(__classPrivateFieldGet(this, _YargsInstance_shim, "f").process.execPath()), "/"), '');
        }
        return $0;
    };
    YargsInstance.prototype[kGetParserConfiguration] = function () {
        return __classPrivateFieldGet(this, _YargsInstance_parserConfig, "f");
    };
    YargsInstance.prototype[kGuessLocale] = function () {
        if (!__classPrivateFieldGet(this, _YargsInstance_detectLocale, "f"))
            return;
        var locale = __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv('LC_ALL') ||
            __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv('LC_MESSAGES') ||
            __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv('LANG') ||
            __classPrivateFieldGet(this, _YargsInstance_shim, "f").getEnv('LANGUAGE') ||
            'en_US';
        this.locale(locale.replace(/[.:].*/, ''));
    };
    YargsInstance.prototype[kGuessVersion] = function () {
        var obj = this[kPkgUp]();
        return obj.version || 'unknown';
    };
    // We wait to coerce numbers for positionals until after the initial parse.
    // This allows commands to configure number parsing on a positional by
    // positional basis:
    YargsInstance.prototype[kParsePositionalNumbers] = function (argv) {
        var args = argv['--'] ? argv['--'] : argv._;
        for (var i = 0, arg = void 0; (arg = args[i]) !== undefined; i++) {
            if (__classPrivateFieldGet(this, _YargsInstance_shim, "f").Parser.looksLikeNumber(arg) &&
                Number.isSafeInteger(Math.floor(parseFloat("".concat(arg))))) {
                args[i] = Number(arg);
            }
        }
        return argv;
    };
    YargsInstance.prototype[kPkgUp] = function (rootPath) {
        var npath = rootPath || '*';
        if (__classPrivateFieldGet(this, _YargsInstance_pkgs, "f")[npath])
            return __classPrivateFieldGet(this, _YargsInstance_pkgs, "f")[npath];
        var obj = {};
        try {
            var startDir = rootPath || __classPrivateFieldGet(this, _YargsInstance_shim, "f").mainFilename;
            // When called in an environment that lacks require.main.filename, such as a jest test runner,
            // startDir is already process.cwd(), and should not be shortened.
            // Whether or not it is _actually_ a directory (e.g., extensionless bin) is irrelevant, find-up handles it.
            if (!rootPath && __classPrivateFieldGet(this, _YargsInstance_shim, "f").path.extname(startDir)) {
                startDir = __classPrivateFieldGet(this, _YargsInstance_shim, "f").path.dirname(startDir);
            }
            var pkgJsonPath = __classPrivateFieldGet(this, _YargsInstance_shim, "f").findUp(startDir, function (dir, names) {
                if (names.includes('package.json')) {
                    return 'package.json';
                }
                else {
                    return undefined;
                }
            });
            (0, common_types_js_1.assertNotStrictEqual)(pkgJsonPath, undefined, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
            obj = JSON.parse(__classPrivateFieldGet(this, _YargsInstance_shim, "f").readFileSync(pkgJsonPath, 'utf8'));
            // eslint-disable-next-line no-empty
        }
        catch (_noop) { }
        __classPrivateFieldGet(this, _YargsInstance_pkgs, "f")[npath] = obj || {};
        return __classPrivateFieldGet(this, _YargsInstance_pkgs, "f")[npath];
    };
    YargsInstance.prototype[kPopulateParserHintArray] = function (type, keys) {
        var _this = this;
        keys = [].concat(keys);
        keys.forEach(function (key) {
            key = _this[kSanitizeKey](key);
            __classPrivateFieldGet(_this, _YargsInstance_options, "f")[type].push(key);
        });
    };
    YargsInstance.prototype[kPopulateParserHintSingleValueDictionary] = function (builder, type, key, value) {
        var _this = this;
        this[kPopulateParserHintDictionary](builder, type, key, value, function (type, key, value) {
            __classPrivateFieldGet(_this, _YargsInstance_options, "f")[type][key] = value;
        });
    };
    YargsInstance.prototype[kPopulateParserHintArrayDictionary] = function (builder, type, key, value) {
        var _this = this;
        this[kPopulateParserHintDictionary](builder, type, key, value, function (type, key, value) {
            __classPrivateFieldGet(_this, _YargsInstance_options, "f")[type][key] = (__classPrivateFieldGet(_this, _YargsInstance_options, "f")[type][key] || []).concat(value);
        });
    };
    YargsInstance.prototype[kPopulateParserHintDictionary] = function (builder, type, key, value, singleKeyHandler) {
        if (Array.isArray(key)) {
            // an array of keys with one value ['x', 'y', 'z'], function parse () {}
            key.forEach(function (k) {
                builder(k, value);
            });
        }
        else if ((function (key) { return typeof key === 'object'; })(key)) {
            // an object of key value pairs: {'x': parse () {}, 'y': parse() {}}
            for (var _i = 0, _a = (0, common_types_js_1.objectKeys)(key); _i < _a.length; _i++) {
                var k = _a[_i];
                builder(k, key[k]);
            }
        }
        else {
            singleKeyHandler(type, this[kSanitizeKey](key), value);
        }
    };
    YargsInstance.prototype[kSanitizeKey] = function (key) {
        if (key === '__proto__')
            return '___proto___';
        return key;
    };
    YargsInstance.prototype[kSetKey] = function (key, set) {
        this[kPopulateParserHintSingleValueDictionary](this[kSetKey].bind(this), 'key', key, set);
        return this;
    };
    YargsInstance.prototype[kUnfreeze] = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var frozen = __classPrivateFieldGet(this, _YargsInstance_frozens, "f").pop();
        (0, common_types_js_1.assertNotStrictEqual)(frozen, undefined, __classPrivateFieldGet(this, _YargsInstance_shim, "f"));
        var configObjects;
        (_a = this, _b = this, _c = this, _d = this, _e = this, _f = this, _g = this, _h = this, _j = this, _k = this, _l = this, _m = this, ({ set value(_o) { __classPrivateFieldSet(_a, _YargsInstance_options, _o, "f"); } }).value = frozen.options, configObjects = frozen.configObjects, ({ set value(_o) { __classPrivateFieldSet(_b, _YargsInstance_exitProcess, _o, "f"); } }).value = frozen.exitProcess, ({ set value(_o) { __classPrivateFieldSet(_c, _YargsInstance_groups, _o, "f"); } }).value = frozen.groups, ({ set value(_o) { __classPrivateFieldSet(_d, _YargsInstance_output, _o, "f"); } }).value = frozen.output, ({ set value(_o) { __classPrivateFieldSet(_e, _YargsInstance_exitError, _o, "f"); } }).value = frozen.exitError, ({ set value(_o) { __classPrivateFieldSet(_f, _YargsInstance_hasOutput, _o, "f"); } }).value = frozen.hasOutput, this.parsed = frozen.parsed, ({ set value(_o) { __classPrivateFieldSet(_g, _YargsInstance_strict, _o, "f"); } }).value = frozen.strict, ({ set value(_o) { __classPrivateFieldSet(_h, _YargsInstance_strictCommands, _o, "f"); } }).value = frozen.strictCommands, ({ set value(_o) { __classPrivateFieldSet(_j, _YargsInstance_strictOptions, _o, "f"); } }).value = frozen.strictOptions, ({ set value(_o) { __classPrivateFieldSet(_k, _YargsInstance_completionCommand, _o, "f"); } }).value = frozen.completionCommand, ({ set value(_o) { __classPrivateFieldSet(_l, _YargsInstance_parseFn, _o, "f"); } }).value = frozen.parseFn, ({ set value(_o) { __classPrivateFieldSet(_m, _YargsInstance_parseContext, _o, "f"); } }).value = frozen.parseContext);
        __classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects = configObjects;
        __classPrivateFieldGet(this, _YargsInstance_usage, "f").unfreeze();
        __classPrivateFieldGet(this, _YargsInstance_validation, "f").unfreeze();
        __classPrivateFieldGet(this, _YargsInstance_command, "f").unfreeze();
        __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").unfreeze();
    };
    // If argv is a promise (which is possible if async middleware is used)
    // delay applying validation until the promise has resolved:
    YargsInstance.prototype[kValidateAsync] = function (validation, argv) {
        return (0, maybe_async_result_js_1.maybeAsyncResult)(argv, function (result) {
            validation(result);
            return result;
        });
    };
    // Note: these method names could change at any time, and should not be
    // depended upon externally:
    YargsInstance.prototype.getInternalMethods = function () {
        return {
            getCommandInstance: this[kGetCommandInstance].bind(this),
            getContext: this[kGetContext].bind(this),
            getHasOutput: this[kGetHasOutput].bind(this),
            getLoggerInstance: this[kGetLoggerInstance].bind(this),
            getParseContext: this[kGetParseContext].bind(this),
            getParserConfiguration: this[kGetParserConfiguration].bind(this),
            getUsageInstance: this[kGetUsageInstance].bind(this),
            getValidationInstance: this[kGetValidationInstance].bind(this),
            hasParseCallback: this[kHasParseCallback].bind(this),
            postProcess: this[kPostProcess].bind(this),
            reset: this[kReset].bind(this),
            runValidation: this[kRunValidation].bind(this),
            runYargsParserAndExecuteCommands: this[kRunYargsParserAndExecuteCommands].bind(this),
            setHasOutput: this[kSetHasOutput].bind(this)
        };
    };
    YargsInstance.prototype[kGetCommandInstance] = function () {
        return __classPrivateFieldGet(this, _YargsInstance_command, "f");
    };
    YargsInstance.prototype[kGetContext] = function () {
        return __classPrivateFieldGet(this, _YargsInstance_context, "f");
    };
    YargsInstance.prototype[kGetHasOutput] = function () {
        return __classPrivateFieldGet(this, _YargsInstance_hasOutput, "f");
    };
    YargsInstance.prototype[kGetLoggerInstance] = function () {
        return __classPrivateFieldGet(this, _YargsInstance_logger, "f");
    };
    YargsInstance.prototype[kGetParseContext] = function () {
        return __classPrivateFieldGet(this, _YargsInstance_parseContext, "f") || {};
    };
    YargsInstance.prototype[kGetUsageInstance] = function () {
        return __classPrivateFieldGet(this, _YargsInstance_usage, "f");
    };
    YargsInstance.prototype[kGetValidationInstance] = function () {
        return __classPrivateFieldGet(this, _YargsInstance_validation, "f");
    };
    YargsInstance.prototype[kHasParseCallback] = function () {
        return !!__classPrivateFieldGet(this, _YargsInstance_parseFn, "f");
    };
    YargsInstance.prototype[kPostProcess] = function (argv, populateDoubleDash, calledFromCommand, runGlobalMiddleware) {
        if (calledFromCommand)
            return argv;
        if ((0, is_promise_js_1.isPromise)(argv))
            return argv;
        if (!populateDoubleDash) {
            argv = this[kCopyDoubleDash](argv);
        }
        var parsePositionalNumbers = this[kGetParserConfiguration]()['parse-positional-numbers'] ||
            this[kGetParserConfiguration]()['parse-positional-numbers'] === undefined;
        if (parsePositionalNumbers) {
            argv = this[kParsePositionalNumbers](argv);
        }
        if (runGlobalMiddleware) {
            argv = (0, middleware_js_1.applyMiddleware)(argv, this, __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").getMiddleware(), false);
        }
        return argv;
    };
    // put yargs back into an initial state; this is used mainly for running
    // commands in a breadth first manner:
    YargsInstance.prototype[kReset] = function (aliases) {
        var _this = this;
        if (aliases === void 0) { aliases = {}; }
        __classPrivateFieldSet(this, _YargsInstance_options, __classPrivateFieldGet(this, _YargsInstance_options, "f") || {}, "f");
        var tmpOptions = {};
        tmpOptions.local = __classPrivateFieldGet(this, _YargsInstance_options, "f").local || [];
        tmpOptions.configObjects = __classPrivateFieldGet(this, _YargsInstance_options, "f").configObjects || [];
        // if a key has been explicitly set as local,
        // we should reset it before passing options to command.
        var localLookup = {};
        tmpOptions.local.forEach(function (l) {
            localLookup[l] = true;
            (aliases[l] || []).forEach(function (a) {
                localLookup[a] = true;
            });
        });
        // add all groups not set to local to preserved groups
        Object.assign(__classPrivateFieldGet(this, _YargsInstance_preservedGroups, "f"), Object.keys(__classPrivateFieldGet(this, _YargsInstance_groups, "f")).reduce(function (acc, groupName) {
            var keys = __classPrivateFieldGet(_this, _YargsInstance_groups, "f")[groupName].filter(function (key) { return !(key in localLookup); });
            if (keys.length > 0) {
                acc[groupName] = keys;
            }
            return acc;
        }, {}));
        // groups can now be reset
        __classPrivateFieldSet(this, _YargsInstance_groups, {}, "f");
        var arrayOptions = [
            'array',
            'boolean',
            'string',
            'skipValidation',
            'count',
            'normalize',
            'number',
            'hiddenOptions',
        ];
        var objectOptions = [
            'narg',
            'key',
            'alias',
            'default',
            'defaultDescription',
            'config',
            'choices',
            'demandedOptions',
            'demandedCommands',
            'deprecatedOptions',
        ];
        arrayOptions.forEach(function (k) {
            tmpOptions[k] = (__classPrivateFieldGet(_this, _YargsInstance_options, "f")[k] || []).filter(function (k) { return !localLookup[k]; });
        });
        objectOptions.forEach(function (k) {
            tmpOptions[k] = (0, obj_filter_js_1.objFilter)(__classPrivateFieldGet(_this, _YargsInstance_options, "f")[k], function (k) { return !localLookup[k]; });
        });
        tmpOptions.envPrefix = __classPrivateFieldGet(this, _YargsInstance_options, "f").envPrefix;
        __classPrivateFieldSet(this, _YargsInstance_options, tmpOptions, "f");
        // if this is the first time being executed, create
        // instances of all our helpers -- otherwise just reset.
        __classPrivateFieldSet(this, _YargsInstance_usage, __classPrivateFieldGet(this, _YargsInstance_usage, "f")
            ? __classPrivateFieldGet(this, _YargsInstance_usage, "f").reset(localLookup)
            : (0, usage_js_1.usage)(this, __classPrivateFieldGet(this, _YargsInstance_shim, "f")), "f");
        __classPrivateFieldSet(this, _YargsInstance_validation, __classPrivateFieldGet(this, _YargsInstance_validation, "f")
            ? __classPrivateFieldGet(this, _YargsInstance_validation, "f").reset(localLookup)
            : (0, validation_js_1.validation)(this, __classPrivateFieldGet(this, _YargsInstance_usage, "f"), __classPrivateFieldGet(this, _YargsInstance_shim, "f")), "f");
        __classPrivateFieldSet(this, _YargsInstance_command, __classPrivateFieldGet(this, _YargsInstance_command, "f")
            ? __classPrivateFieldGet(this, _YargsInstance_command, "f").reset()
            : (0, command_js_1.command)(__classPrivateFieldGet(this, _YargsInstance_usage, "f"), __classPrivateFieldGet(this, _YargsInstance_validation, "f"), __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f"), __classPrivateFieldGet(this, _YargsInstance_shim, "f")), "f");
        if (!__classPrivateFieldGet(this, _YargsInstance_completion, "f"))
            __classPrivateFieldSet(this, _YargsInstance_completion, (0, completion_js_1.completion)(this, __classPrivateFieldGet(this, _YargsInstance_usage, "f"), __classPrivateFieldGet(this, _YargsInstance_command, "f"), __classPrivateFieldGet(this, _YargsInstance_shim, "f")), "f");
        __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").reset();
        __classPrivateFieldSet(this, _YargsInstance_completionCommand, null, "f");
        __classPrivateFieldSet(this, _YargsInstance_output, '', "f");
        __classPrivateFieldSet(this, _YargsInstance_exitError, null, "f");
        __classPrivateFieldSet(this, _YargsInstance_hasOutput, false, "f");
        this.parsed = false;
        return this;
    };
    YargsInstance.prototype[kRebase] = function (base, dir) {
        return __classPrivateFieldGet(this, _YargsInstance_shim, "f").path.relative(base, dir);
    };
    YargsInstance.prototype[kRunYargsParserAndExecuteCommands] = function (args, shortCircuit, calledFromCommand, commandIndex, helpOnly) {
        var _this = this;
        if (commandIndex === void 0) { commandIndex = 0; }
        if (helpOnly === void 0) { helpOnly = false; }
        var skipValidation = !!calledFromCommand || helpOnly;
        args = args || __classPrivateFieldGet(this, _YargsInstance_processArgs, "f");
        __classPrivateFieldGet(this, _YargsInstance_options, "f").__ = __classPrivateFieldGet(this, _YargsInstance_shim, "f").y18n.__;
        __classPrivateFieldGet(this, _YargsInstance_options, "f").configuration = this[kGetParserConfiguration]();
        var populateDoubleDash = !!__classPrivateFieldGet(this, _YargsInstance_options, "f").configuration['populate--'];
        var config = Object.assign({}, __classPrivateFieldGet(this, _YargsInstance_options, "f").configuration, {
            'populate--': true
        });
        var parsed = __classPrivateFieldGet(this, _YargsInstance_shim, "f").Parser.detailed(args, Object.assign({}, __classPrivateFieldGet(this, _YargsInstance_options, "f"), {
            configuration: __assign({ 'parse-positional-numbers': false }, config)
        }));
        var argv = Object.assign(parsed.argv, __classPrivateFieldGet(this, _YargsInstance_parseContext, "f"));
        var argvPromise = undefined;
        var aliases = parsed.aliases;
        var helpOptSet = false;
        var versionOptSet = false;
        Object.keys(argv).forEach(function (key) {
            if (key === __classPrivateFieldGet(_this, _YargsInstance_helpOpt, "f") && argv[key]) {
                helpOptSet = true;
            }
            else if (key === __classPrivateFieldGet(_this, _YargsInstance_versionOpt, "f") && argv[key]) {
                versionOptSet = true;
            }
        });
        argv.$0 = this.$0;
        this.parsed = parsed;
        // A single yargs instance may be used multiple times, e.g.
        // const y = yargs(); y.parse('foo --bar'); yargs.parse('bar --foo').
        // When a prior parse has completed and a new parse is beginning, we
        // need to clear the cached help message from the previous parse:
        if (commandIndex === 0) {
            __classPrivateFieldGet(this, _YargsInstance_usage, "f").clearCachedHelpMessage();
        }
        try {
            this[kGuessLocale](); // guess locale lazily, so that it can be turned off in chain.
            // while building up the argv object, there
            // are two passes through the parser. If completion
            // is being performed short-circuit on the first pass.
            if (shortCircuit) {
                return this[kPostProcess](argv, populateDoubleDash, !!calledFromCommand, false // Don't run middleware when figuring out completion.
                );
            }
            // if there's a handler associated with a
            // command defer processing to it.
            if (__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f")) {
                // consider any multi-char helpOpt alias as a valid help command
                // unless all helpOpt aliases are single-char
                // note that parsed.aliases is a normalized bidirectional map :)
                var helpCmds = [__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f")]
                    .concat(aliases[__classPrivateFieldGet(this, _YargsInstance_helpOpt, "f")] || [])
                    .filter(function (k) { return k.length > 1; });
                // check if help should trigger and strip it from _.
                if (helpCmds.includes('' + argv._[argv._.length - 1])) {
                    argv._.pop();
                    helpOptSet = true;
                }
            }
            var handlerKeys = __classPrivateFieldGet(this, _YargsInstance_command, "f").getCommands();
            var requestCompletions = __classPrivateFieldGet(this, _YargsInstance_completion, "f").completionKey in argv;
            var skipRecommendation = helpOptSet || requestCompletions || helpOnly;
            if (argv._.length) {
                if (handlerKeys.length) {
                    var firstUnknownCommand = void 0;
                    for (var i = commandIndex || 0, cmd = void 0; argv._[i] !== undefined; i++) {
                        cmd = String(argv._[i]);
                        if (handlerKeys.includes(cmd) && cmd !== __classPrivateFieldGet(this, _YargsInstance_completionCommand, "f")) {
                            // commands are executed using a recursive algorithm that executes
                            // the deepest command first; we keep track of the position in the
                            // argv._ array that is currently being executed.
                            var innerArgv = __classPrivateFieldGet(this, _YargsInstance_command, "f").runCommand(cmd, this, parsed, i + 1, 
                            // Don't run a handler, just figure out the help string:
                            helpOnly, 
                            // Passed to builder so that expensive commands can be deferred:
                            helpOptSet || versionOptSet || helpOnly);
                            return this[kPostProcess](innerArgv, populateDoubleDash, !!calledFromCommand, false);
                        }
                        else if (!firstUnknownCommand &&
                            cmd !== __classPrivateFieldGet(this, _YargsInstance_completionCommand, "f")) {
                            firstUnknownCommand = cmd;
                            break;
                        }
                    }
                    // recommend a command if recommendCommands() has
                    // been enabled, and no commands were found to execute
                    if (!__classPrivateFieldGet(this, _YargsInstance_command, "f").hasDefaultCommand() &&
                        __classPrivateFieldGet(this, _YargsInstance_recommendCommands, "f") &&
                        firstUnknownCommand &&
                        !skipRecommendation) {
                        __classPrivateFieldGet(this, _YargsInstance_validation, "f").recommendCommands(firstUnknownCommand, handlerKeys);
                    }
                }
                // generate a completion script for adding to ~/.bashrc.
                if (__classPrivateFieldGet(this, _YargsInstance_completionCommand, "f") &&
                    argv._.includes(__classPrivateFieldGet(this, _YargsInstance_completionCommand, "f")) &&
                    !requestCompletions) {
                    if (__classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"))
                        (0, set_blocking_js_1["default"])(true);
                    this.showCompletionScript();
                    this.exit(0);
                }
            }
            if (__classPrivateFieldGet(this, _YargsInstance_command, "f").hasDefaultCommand() && !skipRecommendation) {
                var innerArgv = __classPrivateFieldGet(this, _YargsInstance_command, "f").runCommand(null, this, parsed, 0, helpOnly, helpOptSet || versionOptSet || helpOnly);
                return this[kPostProcess](innerArgv, populateDoubleDash, !!calledFromCommand, false);
            }
            // we must run completions first, a user might
            // want to complete the --help or --version option.
            if (requestCompletions) {
                if (__classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"))
                    (0, set_blocking_js_1["default"])(true);
                // we allow for asynchronous completions,
                // e.g., loading in a list of commands from an API.
                args = [].concat(args);
                var completionArgs = args.slice(args.indexOf("--".concat(__classPrivateFieldGet(this, _YargsInstance_completion, "f").completionKey)) + 1);
                __classPrivateFieldGet(this, _YargsInstance_completion, "f").getCompletion(completionArgs, function (err, completions) {
                    if (err)
                        throw new yerror_js_1.YError(err.message);
                    (completions || []).forEach(function (completion) {
                        __classPrivateFieldGet(_this, _YargsInstance_logger, "f").log(completion);
                    });
                    _this.exit(0);
                });
                return this[kPostProcess](argv, !populateDoubleDash, !!calledFromCommand, false // Don't run middleware when figuring out completion.
                );
            }
            // Handle 'help' and 'version' options
            // if we haven't already output help!
            if (!__classPrivateFieldGet(this, _YargsInstance_hasOutput, "f")) {
                if (helpOptSet) {
                    if (__classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"))
                        (0, set_blocking_js_1["default"])(true);
                    skipValidation = true;
                    this.showHelp('log');
                    this.exit(0);
                }
                else if (versionOptSet) {
                    if (__classPrivateFieldGet(this, _YargsInstance_exitProcess, "f"))
                        (0, set_blocking_js_1["default"])(true);
                    skipValidation = true;
                    __classPrivateFieldGet(this, _YargsInstance_usage, "f").showVersion('log');
                    this.exit(0);
                }
            }
            // Check if any of the options to skip validation were provided
            if (!skipValidation && __classPrivateFieldGet(this, _YargsInstance_options, "f").skipValidation.length > 0) {
                skipValidation = Object.keys(argv).some(function (key) {
                    return __classPrivateFieldGet(_this, _YargsInstance_options, "f").skipValidation.indexOf(key) >= 0 && argv[key] === true;
                });
            }
            // If the help or version options were used and exitProcess is false,
            // or if explicitly skipped, we won't run validations.
            if (!skipValidation) {
                if (parsed.error)
                    throw new yerror_js_1.YError(parsed.error.message);
                // if we're executed via bash completion, don't
                // bother with validation.
                if (!requestCompletions) {
                    var validation = this[kRunValidation](aliases, {}, parsed.error);
                    if (!calledFromCommand) {
                        argvPromise = (0, middleware_js_1.applyMiddleware)(argv, this, __classPrivateFieldGet(this, _YargsInstance_globalMiddleware, "f").getMiddleware(), true);
                    }
                    argvPromise = this[kValidateAsync](validation, argvPromise !== null && argvPromise !== void 0 ? argvPromise : argv);
                    if ((0, is_promise_js_1.isPromise)(argvPromise) && !calledFromCommand) {
                        argvPromise = argvPromise.then(function () {
                            return (0, middleware_js_1.applyMiddleware)(argv, _this, __classPrivateFieldGet(_this, _YargsInstance_globalMiddleware, "f").getMiddleware(), false);
                        });
                    }
                }
            }
        }
        catch (err) {
            if (err instanceof yerror_js_1.YError)
                __classPrivateFieldGet(this, _YargsInstance_usage, "f").fail(err.message, err);
            else
                throw err;
        }
        return this[kPostProcess](argvPromise !== null && argvPromise !== void 0 ? argvPromise : argv, populateDoubleDash, !!calledFromCommand, true);
    };
    YargsInstance.prototype[kRunValidation] = function (aliases, positionalMap, parseErrors, isDefaultCommand) {
        var _this = this;
        var demandedOptions = __assign({}, this.getDemandedOptions());
        return function (argv) {
            if (parseErrors)
                throw new yerror_js_1.YError(parseErrors.message);
            __classPrivateFieldGet(_this, _YargsInstance_validation, "f").nonOptionCount(argv);
            __classPrivateFieldGet(_this, _YargsInstance_validation, "f").requiredArguments(argv, demandedOptions);
            var failedStrictCommands = false;
            if (__classPrivateFieldGet(_this, _YargsInstance_strictCommands, "f")) {
                failedStrictCommands = __classPrivateFieldGet(_this, _YargsInstance_validation, "f").unknownCommands(argv);
            }
            if (__classPrivateFieldGet(_this, _YargsInstance_strict, "f") && !failedStrictCommands) {
                __classPrivateFieldGet(_this, _YargsInstance_validation, "f").unknownArguments(argv, aliases, positionalMap, !!isDefaultCommand);
            }
            else if (__classPrivateFieldGet(_this, _YargsInstance_strictOptions, "f")) {
                __classPrivateFieldGet(_this, _YargsInstance_validation, "f").unknownArguments(argv, aliases, {}, false, false);
            }
            __classPrivateFieldGet(_this, _YargsInstance_validation, "f").limitedChoices(argv);
            __classPrivateFieldGet(_this, _YargsInstance_validation, "f").implications(argv);
            __classPrivateFieldGet(_this, _YargsInstance_validation, "f").conflicting(argv);
        };
    };
    YargsInstance.prototype[kSetHasOutput] = function () {
        __classPrivateFieldSet(this, _YargsInstance_hasOutput, true, "f");
    };
    YargsInstance.prototype[kTrackManuallySetKeys] = function (keys) {
        if (typeof keys === 'string') {
            __classPrivateFieldGet(this, _YargsInstance_options, "f").key[keys] = true;
        }
        else {
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var k = keys_2[_i];
                __classPrivateFieldGet(this, _YargsInstance_options, "f").key[k] = true;
            }
        }
    };
    return YargsInstance;
}());
exports.YargsInstance = YargsInstance;
function isYargsInstance(y) {
    return !!y && typeof y.getInternalMethods === 'function';
}
exports.isYargsInstance = isYargsInstance;
