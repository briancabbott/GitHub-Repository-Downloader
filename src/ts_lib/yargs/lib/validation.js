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
exports.validation = void 0;
var argsert_js_1 = require("./argsert.js");
var common_types_js_1 = require("./typings/common-types.js");
var levenshtein_js_1 = require("./utils/levenshtein.js");
var obj_filter_js_1 = require("./utils/obj-filter.js");
var specialKeys = ['$0', '--', '_'];
// validation-type-stuff, missing params,
// bad implications:
function validation(yargs, usage, shim) {
    var __ = shim.y18n.__;
    var __n = shim.y18n.__n;
    var self = {};
    // validate appropriate # of non-option
    // arguments were provided, i.e., '_'.
    self.nonOptionCount = function nonOptionCount(argv) {
        var demandedCommands = yargs.getDemandedCommands();
        // don't count currently executing commands
        var positionalCount = argv._.length + (argv['--'] ? argv['--'].length : 0);
        var _s = positionalCount - yargs.getInternalMethods().getContext().commands.length;
        if (demandedCommands._ &&
            (_s < demandedCommands._.min || _s > demandedCommands._.max)) {
            if (_s < demandedCommands._.min) {
                if (demandedCommands._.minMsg !== undefined) {
                    usage.fail(
                    // replace $0 with observed, $1 with expected.
                    demandedCommands._.minMsg
                        ? demandedCommands._.minMsg
                            .replace(/\$0/g, _s.toString())
                            .replace(/\$1/, demandedCommands._.min.toString())
                        : null);
                }
                else {
                    usage.fail(__n('Not enough non-option arguments: got %s, need at least %s', 'Not enough non-option arguments: got %s, need at least %s', _s, _s.toString(), demandedCommands._.min.toString()));
                }
            }
            else if (_s > demandedCommands._.max) {
                if (demandedCommands._.maxMsg !== undefined) {
                    usage.fail(
                    // replace $0 with observed, $1 with expected.
                    demandedCommands._.maxMsg
                        ? demandedCommands._.maxMsg
                            .replace(/\$0/g, _s.toString())
                            .replace(/\$1/, demandedCommands._.max.toString())
                        : null);
                }
                else {
                    usage.fail(__n('Too many non-option arguments: got %s, maximum of %s', 'Too many non-option arguments: got %s, maximum of %s', _s, _s.toString(), demandedCommands._.max.toString()));
                }
            }
        }
    };
    // validate the appropriate # of <required>
    // positional arguments were provided:
    self.positionalCount = function positionalCount(required, observed) {
        if (observed < required) {
            usage.fail(__n('Not enough non-option arguments: got %s, need at least %s', 'Not enough non-option arguments: got %s, need at least %s', observed, observed + '', required + ''));
        }
    };
    // make sure all the required arguments are present.
    self.requiredArguments = function requiredArguments(argv, demandedOptions) {
        var missing = null;
        for (var _i = 0, _a = Object.keys(demandedOptions); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!Object.prototype.hasOwnProperty.call(argv, key) ||
                typeof argv[key] === 'undefined') {
                missing = missing || {};
                missing[key] = demandedOptions[key];
            }
        }
        if (missing) {
            var customMsgs = [];
            for (var _b = 0, _c = Object.keys(missing); _b < _c.length; _b++) {
                var key = _c[_b];
                var msg = missing[key];
                if (msg && customMsgs.indexOf(msg) < 0) {
                    customMsgs.push(msg);
                }
            }
            var customMsg = customMsgs.length ? "\n".concat(customMsgs.join('\n')) : '';
            usage.fail(__n('Missing required argument: %s', 'Missing required arguments: %s', Object.keys(missing).length, Object.keys(missing).join(', ') + customMsg));
        }
    };
    // check for unknown arguments (strict-mode).
    self.unknownArguments = function unknownArguments(argv, aliases, positionalMap, isDefaultCommand, checkPositionals) {
        var _a;
        if (checkPositionals === void 0) { checkPositionals = true; }
        var commandKeys = yargs
            .getInternalMethods()
            .getCommandInstance()
            .getCommands();
        var unknown = [];
        var currentContext = yargs.getInternalMethods().getContext();
        Object.keys(argv).forEach(function (key) {
            if (!specialKeys.includes(key) &&
                !Object.prototype.hasOwnProperty.call(positionalMap, key) &&
                !Object.prototype.hasOwnProperty.call(yargs.getInternalMethods().getParseContext(), key) &&
                !self.isValidAndSomeAliasIsNotNew(key, aliases)) {
                unknown.push(key);
            }
        });
        if (checkPositionals &&
            (currentContext.commands.length > 0 ||
                commandKeys.length > 0 ||
                isDefaultCommand)) {
            argv._.slice(currentContext.commands.length).forEach(function (key) {
                if (!commandKeys.includes('' + key)) {
                    unknown.push('' + key);
                }
            });
        }
        // https://github.com/yargs/yargs/issues/1861
        if (checkPositionals) {
            // Check for non-option args that are not in currentContext.commands
            // Take into account expected args from commands and yargs.demand(number)
            var demandedCommands = yargs.getDemandedCommands();
            var maxNonOptDemanded = ((_a = demandedCommands._) === null || _a === void 0 ? void 0 : _a.max) || 0;
            var expected = currentContext.commands.length + maxNonOptDemanded;
            if (expected < argv._.length) {
                argv._.slice(expected).forEach(function (key) {
                    key = String(key);
                    if (!currentContext.commands.includes(key) &&
                        !unknown.includes(key)) {
                        unknown.push(key);
                    }
                });
            }
        }
        if (unknown.length) {
            usage.fail(__n('Unknown argument: %s', 'Unknown arguments: %s', unknown.length, unknown.map(function (s) { return (s.trim() ? s : "\"".concat(s, "\"")); }).join(', ')));
        }
    };
    self.unknownCommands = function unknownCommands(argv) {
        var commandKeys = yargs
            .getInternalMethods()
            .getCommandInstance()
            .getCommands();
        var unknown = [];
        var currentContext = yargs.getInternalMethods().getContext();
        if (currentContext.commands.length > 0 || commandKeys.length > 0) {
            argv._.slice(currentContext.commands.length).forEach(function (key) {
                if (!commandKeys.includes('' + key)) {
                    unknown.push('' + key);
                }
            });
        }
        if (unknown.length > 0) {
            usage.fail(__n('Unknown command: %s', 'Unknown commands: %s', unknown.length, unknown.join(', ')));
            return true;
        }
        else {
            return false;
        }
    };
    // check for a key that is not an alias, or for which every alias is new,
    // implying that it was invented by the parser, e.g., during camelization
    self.isValidAndSomeAliasIsNotNew = function isValidAndSomeAliasIsNotNew(key, aliases) {
        if (!Object.prototype.hasOwnProperty.call(aliases, key)) {
            return false;
        }
        var newAliases = yargs.parsed.newAliases;
        return __spreadArray([key], aliases[key], true).some(function (a) {
            return !Object.prototype.hasOwnProperty.call(newAliases, a) || !newAliases[key];
        });
    };
    // validate arguments limited to enumerated choices
    self.limitedChoices = function limitedChoices(argv) {
        var options = yargs.getOptions();
        var invalid = {};
        if (!Object.keys(options.choices).length)
            return;
        Object.keys(argv).forEach(function (key) {
            if (specialKeys.indexOf(key) === -1 &&
                Object.prototype.hasOwnProperty.call(options.choices, key)) {
                [].concat(argv[key]).forEach(function (value) {
                    // TODO case-insensitive configurability
                    if (options.choices[key].indexOf(value) === -1 &&
                        value !== undefined) {
                        invalid[key] = (invalid[key] || []).concat(value);
                    }
                });
            }
        });
        var invalidKeys = Object.keys(invalid);
        if (!invalidKeys.length)
            return;
        var msg = __('Invalid values:');
        invalidKeys.forEach(function (key) {
            msg += "\n  ".concat(__('Argument: %s, Given: %s, Choices: %s', key, usage.stringifiedValues(invalid[key]), usage.stringifiedValues(options.choices[key])));
        });
        usage.fail(msg);
    };
    // check implications, argument foo implies => argument bar.
    var implied = {};
    self.implies = function implies(key, value) {
        (0, argsert_js_1.argsert)('<string|object> [array|number|string]', [key, value], arguments.length);
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) {
                self.implies(k, key[k]);
            });
        }
        else {
            yargs.global(key);
            if (!implied[key]) {
                implied[key] = [];
            }
            if (Array.isArray(value)) {
                value.forEach(function (i) { return self.implies(key, i); });
            }
            else {
                (0, common_types_js_1.assertNotStrictEqual)(value, undefined, shim);
                implied[key].push(value);
            }
        }
    };
    self.getImplied = function getImplied() {
        return implied;
    };
    function keyExists(argv, val) {
        // convert string '1' to number 1
        var num = Number(val);
        val = isNaN(num) ? val : num;
        if (typeof val === 'number') {
            // check length of argv._
            val = argv._.length >= val;
        }
        else if (val.match(/^--no-.+/)) {
            // check if key/value doesn't exist
            val = val.match(/^--no-(.+)/)[1];
            val = !Object.prototype.hasOwnProperty.call(argv, val);
        }
        else {
            // check if key/value exists
            val = Object.prototype.hasOwnProperty.call(argv, val);
        }
        return val;
    }
    self.implications = function implications(argv) {
        var implyFail = [];
        Object.keys(implied).forEach(function (key) {
            var origKey = key;
            (implied[key] || []).forEach(function (value) {
                var key = origKey;
                var origValue = value;
                key = keyExists(argv, key);
                value = keyExists(argv, value);
                if (key && !value) {
                    implyFail.push(" ".concat(origKey, " -> ").concat(origValue));
                }
            });
        });
        if (implyFail.length) {
            var msg_1 = "".concat(__('Implications failed:'), "\n");
            implyFail.forEach(function (value) {
                msg_1 += value;
            });
            usage.fail(msg_1);
        }
    };
    var conflicting = {};
    self.conflicts = function conflicts(key, value) {
        (0, argsert_js_1.argsert)('<string|object> [array|string]', [key, value], arguments.length);
        if (typeof key === 'object') {
            Object.keys(key).forEach(function (k) {
                self.conflicts(k, key[k]);
            });
        }
        else {
            yargs.global(key);
            if (!conflicting[key]) {
                conflicting[key] = [];
            }
            if (Array.isArray(value)) {
                value.forEach(function (i) { return self.conflicts(key, i); });
            }
            else {
                conflicting[key].push(value);
            }
        }
    };
    self.getConflicting = function () { return conflicting; };
    self.conflicting = function conflictingFn(argv) {
        Object.keys(argv).forEach(function (key) {
            if (conflicting[key]) {
                conflicting[key].forEach(function (value) {
                    // we default keys to 'undefined' that have been configured, we should not
                    // apply conflicting check unless they are a value other than 'undefined'.
                    if (value && argv[key] !== undefined && argv[value] !== undefined) {
                        usage.fail(__('Arguments %s and %s are mutually exclusive', key, value));
                    }
                });
            }
        });
        // When strip-dashed is true, match conflicts (kebab) with argv (camel)
        // Addresses: https://github.com/yargs/yargs/issues/1952
        if (yargs.getInternalMethods().getParserConfiguration()['strip-dashed']) {
            Object.keys(conflicting).forEach(function (key) {
                conflicting[key].forEach(function (value) {
                    if (value &&
                        argv[shim.Parser.camelCase(key)] !== undefined &&
                        argv[shim.Parser.camelCase(value)] !== undefined) {
                        usage.fail(__('Arguments %s and %s are mutually exclusive', key, value));
                    }
                });
            });
        }
    };
    self.recommendCommands = function recommendCommands(cmd, potentialCommands) {
        var threshold = 3; // if it takes more than three edits, let's move on.
        potentialCommands = potentialCommands.sort(function (a, b) { return b.length - a.length; });
        var recommended = null;
        var bestDistance = Infinity;
        for (var i = 0, candidate = void 0; (candidate = potentialCommands[i]) !== undefined; i++) {
            var d = (0, levenshtein_js_1.levenshtein)(cmd, candidate);
            if (d <= threshold && d < bestDistance) {
                bestDistance = d;
                recommended = candidate;
            }
        }
        if (recommended)
            usage.fail(__('Did you mean %s?', recommended));
    };
    self.reset = function reset(localLookup) {
        implied = (0, obj_filter_js_1.objFilter)(implied, function (k) { return !localLookup[k]; });
        conflicting = (0, obj_filter_js_1.objFilter)(conflicting, function (k) { return !localLookup[k]; });
        return self;
    };
    var frozens = [];
    self.freeze = function freeze() {
        frozens.push({
            implied: implied,
            conflicting: conflicting
        });
    };
    self.unfreeze = function unfreeze() {
        var frozen = frozens.pop();
        (0, common_types_js_1.assertNotStrictEqual)(frozen, undefined, shim);
        (implied = frozen.implied, conflicting = frozen.conflicting);
    };
    return self;
}
exports.validation = validation;
