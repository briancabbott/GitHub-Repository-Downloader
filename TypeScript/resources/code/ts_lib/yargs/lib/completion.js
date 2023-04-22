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
exports.completion = exports.Completion = void 0;
var command_js_1 = require("./command.js");
var common_types_js_1 = require("./typings/common-types.js");
var templates = require("./completion-templates.js");
var is_promise_js_1 = require("./utils/is-promise.js");
var parse_command_js_1 = require("./parse-command.js");
var Completion = /** @class */ (function () {
    function Completion(yargs, usage, command, shim) {
        var _a, _b, _c;
        this.yargs = yargs;
        this.usage = usage;
        this.command = command;
        this.shim = shim;
        this.completionKey = 'get-yargs-completions';
        this.aliases = null;
        this.customCompletionFunction = null;
        this.zshShell =
            (_c = (((_a = this.shim.getEnv('SHELL')) === null || _a === void 0 ? void 0 : _a.includes('zsh')) ||
                ((_b = this.shim.getEnv('ZSH_NAME')) === null || _b === void 0 ? void 0 : _b.includes('zsh')))) !== null && _c !== void 0 ? _c : false;
    }
    Completion.prototype.defaultCompletion = function (args, argv, current, done) {
        var handlers = this.command.getCommandHandlers();
        for (var i = 0, ii = args.length; i < ii; ++i) {
            if (handlers[args[i]] && handlers[args[i]].builder) {
                var builder = handlers[args[i]].builder;
                if ((0, command_js_1.isCommandBuilderCallback)(builder)) {
                    var y = this.yargs.getInternalMethods().reset();
                    builder(y, true);
                    return y.argv;
                }
            }
        }
        var completions = [];
        this.commandCompletions(completions, args, current);
        this.optionCompletions(completions, args, argv, current);
        this.choicesCompletions(completions, args, argv, current);
        done(null, completions);
    };
    // Default completions for commands
    Completion.prototype.commandCompletions = function (completions, args, current) {
        var _this = this;
        var parentCommands = this.yargs
            .getInternalMethods()
            .getContext().commands;
        if (!current.match(/^-/) &&
            parentCommands[parentCommands.length - 1] !== current &&
            !this.previousArgHasChoices(args)) {
            this.usage.getCommands().forEach(function (usageCommand) {
                var commandName = (0, parse_command_js_1.parseCommand)(usageCommand[0]).cmd;
                if (args.indexOf(commandName) === -1) {
                    if (!_this.zshShell) {
                        completions.push(commandName);
                    }
                    else {
                        var desc = usageCommand[1] || '';
                        completions.push(commandName.replace(/:/g, '\\:') + ':' + desc);
                    }
                }
            });
        }
    };
    // Default completions for - and -- options
    Completion.prototype.optionCompletions = function (completions, args, argv, current) {
        var _this = this;
        if ((current.match(/^-/) || (current === '' && completions.length === 0)) &&
            !this.previousArgHasChoices(args)) {
            var options_1 = this.yargs.getOptions();
            var positionalKeys_1 = this.yargs.getGroups()[this.usage.getPositionalGroupName()] || [];
            Object.keys(options_1.key).forEach(function (key) {
                var negable = !!options_1.configuration['boolean-negation'] &&
                    options_1.boolean.includes(key);
                var isPositionalKey = positionalKeys_1.includes(key);
                // If the key is not positional and its aliases aren't in 'args', add the key to 'completions'
                if (!isPositionalKey &&
                    !_this.argsContainKey(args, argv, key, negable)) {
                    _this.completeOptionKey(key, completions, current);
                    if (negable && !!options_1["default"][key])
                        _this.completeOptionKey("no-".concat(key), completions, current);
                }
            });
        }
    };
    Completion.prototype.choicesCompletions = function (completions, args, argv, current) {
        if (this.previousArgHasChoices(args)) {
            var choices = this.getPreviousArgChoices(args);
            if (choices && choices.length > 0) {
                completions.push.apply(completions, choices);
            }
        }
    };
    Completion.prototype.getPreviousArgChoices = function (args) {
        if (args.length < 1)
            return; // no args
        var previousArg = args[args.length - 1];
        var filter = '';
        // use second to last argument if the last one is not an option starting with --
        if (!previousArg.startsWith('-') && args.length > 1) {
            filter = previousArg; // use last arg as filter for choices
            previousArg = args[args.length - 2];
        }
        if (!previousArg.startsWith('-'))
            return; // still no valid arg, abort
        var previousArgKey = previousArg.replace(/^-+/, '');
        var options = this.yargs.getOptions();
        var possibleAliases = __spreadArray([
            previousArgKey
        ], (this.yargs.getAliases()[previousArgKey] || []), true);
        var choices;
        // Find choices across all possible aliases
        for (var _i = 0, possibleAliases_1 = possibleAliases; _i < possibleAliases_1.length; _i++) {
            var possibleAlias = possibleAliases_1[_i];
            if (Object.prototype.hasOwnProperty.call(options.key, possibleAlias) &&
                Array.isArray(options.choices[possibleAlias])) {
                choices = options.choices[possibleAlias];
                break;
            }
        }
        if (choices) {
            return choices.filter(function (choice) { return !filter || choice.startsWith(filter); });
        }
    };
    Completion.prototype.previousArgHasChoices = function (args) {
        var choices = this.getPreviousArgChoices(args);
        return choices !== undefined && choices.length > 0;
    };
    Completion.prototype.argsContainKey = function (args, argv, key, negable) {
        if (args.indexOf("--".concat(key)) !== -1)
            return true;
        if (negable && args.indexOf("--no-".concat(key)) !== -1)
            return true;
        if (this.aliases) {
            // search for aliases in parsed argv
            // can't do the same thing for main option names because argv can contain default values
            for (var _i = 0, _a = this.aliases[key]; _i < _a.length; _i++) {
                var alias = _a[_i];
                if (argv[alias] !== undefined)
                    return true;
            }
        }
        return false;
    };
    // Add completion for a single - or -- option
    Completion.prototype.completeOptionKey = function (key, completions, current) {
        var descs = this.usage.getDescriptions();
        var startsByTwoDashes = function (s) { return /^--/.test(s); };
        var isShortOption = function (s) { return /^[^0-9]$/.test(s); };
        var dashes = !startsByTwoDashes(current) && isShortOption(key) ? '-' : '--';
        if (!this.zshShell) {
            completions.push(dashes + key);
        }
        else {
            var desc = descs[key] || '';
            completions.push(dashes +
                "".concat(key.replace(/:/g, '\\:'), ":").concat(desc.replace('__yargsString__:', '')));
        }
    };
    // a custom completion function can be provided
    // to completion().
    Completion.prototype.customCompletion = function (args, argv, current, done) {
        var _this = this;
        (0, common_types_js_1.assertNotStrictEqual)(this.customCompletionFunction, null, this.shim);
        if (isSyncCompletionFunction(this.customCompletionFunction)) {
            var result = this.customCompletionFunction(current, argv);
            // promise based completion function.
            if ((0, is_promise_js_1.isPromise)(result)) {
                return result
                    .then(function (list) {
                    _this.shim.process.nextTick(function () {
                        done(null, list);
                    });
                })["catch"](function (err) {
                    _this.shim.process.nextTick(function () {
                        done(err, undefined);
                    });
                });
            }
            // synchronous completion function.
            return done(null, result);
        }
        else if (isFallbackCompletionFunction(this.customCompletionFunction)) {
            return this.customCompletionFunction(current, argv, function (onCompleted) {
                if (onCompleted === void 0) { onCompleted = done; }
                return _this.defaultCompletion(args, argv, current, onCompleted);
            }, function (completions) {
                done(null, completions);
            });
        }
        else {
            return this.customCompletionFunction(current, argv, function (completions) {
                done(null, completions);
            });
        }
    };
    // get a list of completion commands.
    // 'args' is the array of strings from the line to be completed
    Completion.prototype.getCompletion = function (args, done) {
        var _this = this;
        var current = args.length ? args[args.length - 1] : '';
        var argv = this.yargs.parse(args, true);
        var completionFunction = this.customCompletionFunction
            ? function (argv) { return _this.customCompletion(args, argv, current, done); }
            : function (argv) { return _this.defaultCompletion(args, argv, current, done); };
        return (0, is_promise_js_1.isPromise)(argv)
            ? argv.then(completionFunction)
            : completionFunction(argv);
    };
    // generate the completion script to add to your .bashrc.
    Completion.prototype.generateCompletionScript = function ($0, cmd) {
        var script = this.zshShell
            ? templates.completionZshTemplate
            : templates.completionShTemplate;
        var name = this.shim.path.basename($0);
        // add ./ to applications not yet installed as bin.
        if ($0.match(/\.js$/))
            $0 = "./".concat($0);
        script = script.replace(/{{app_name}}/g, name);
        script = script.replace(/{{completion_command}}/g, cmd);
        return script.replace(/{{app_path}}/g, $0);
    };
    // register a function to perform your own custom
    // completions. this function can be either
    // synchronous or asynchronous.
    Completion.prototype.registerFunction = function (fn) {
        this.customCompletionFunction = fn;
    };
    Completion.prototype.setParsed = function (parsed) {
        this.aliases = parsed.aliases;
    };
    return Completion;
}());
exports.Completion = Completion;
// For backwards compatibility
function completion(yargs, usage, command, shim) {
    return new Completion(yargs, usage, command, shim);
}
exports.completion = completion;
function isSyncCompletionFunction(completionFunction) {
    return completionFunction.length < 3;
}
function isFallbackCompletionFunction(completionFunction) {
    return completionFunction.length > 3;
}
