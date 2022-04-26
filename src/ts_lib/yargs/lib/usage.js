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
exports.usage = void 0;
var obj_filter_js_1 = require("./utils/obj-filter.js");
var yerror_js_1 = require("./yerror.js");
var set_blocking_js_1 = require("./utils/set-blocking.js");
function isBoolean(fail) {
    return typeof fail === 'boolean';
}
function usage(yargs, shim) {
    var __ = shim.y18n.__;
    var self = {};
    // methods for ouputting/building failure message.
    var fails = [];
    self.failFn = function failFn(f) {
        fails.push(f);
    };
    var failMessage = null;
    var showHelpOnFail = true;
    self.showHelpOnFail = function showHelpOnFailFn(arg1, arg2) {
        if (arg1 === void 0) { arg1 = true; }
        function parseFunctionArgs() {
            return typeof arg1 === 'string' ? [true, arg1] : [arg1, arg2];
        }
        var _a = parseFunctionArgs(), enabled = _a[0], message = _a[1];
        failMessage = message;
        showHelpOnFail = enabled;
        return self;
    };
    var failureOutput = false;
    self.fail = function fail(msg, err) {
        var logger = yargs.getInternalMethods().getLoggerInstance();
        if (fails.length) {
            for (var i = fails.length - 1; i >= 0; --i) {
                var fail_1 = fails[i];
                if (isBoolean(fail_1)) {
                    if (err)
                        throw err;
                    else if (msg)
                        throw Error(msg);
                }
                else {
                    fail_1(msg, err, self);
                }
            }
        }
        else {
            if (yargs.getExitProcess())
                (0, set_blocking_js_1["default"])(true);
            // don't output failure message more than once
            if (!failureOutput) {
                failureOutput = true;
                if (showHelpOnFail) {
                    yargs.showHelp('error');
                    logger.error();
                }
                if (msg || err)
                    logger.error(msg || err);
                if (failMessage) {
                    if (msg || err)
                        logger.error('');
                    logger.error(failMessage);
                }
            }
            err = err || new yerror_js_1.YError(msg);
            if (yargs.getExitProcess()) {
                return yargs.exit(1);
            }
            else if (yargs.getInternalMethods().hasParseCallback()) {
                return yargs.exit(1, err);
            }
            else {
                throw err;
            }
        }
    };
    // methods for ouputting/building help (usage) message.
    var usages = [];
    var usageDisabled = false;
    self.usage = function (msg, description) {
        if (msg === null) {
            usageDisabled = true;
            usages = [];
            return self;
        }
        usageDisabled = false;
        usages.push([msg, description || '']);
        return self;
    };
    self.getUsage = function () {
        return usages;
    };
    self.getUsageDisabled = function () {
        return usageDisabled;
    };
    self.getPositionalGroupName = function () {
        return __('Positionals:');
    };
    var examples = [];
    self.example = function (cmd, description) {
        examples.push([cmd, description || '']);
    };
    var commands = [];
    self.command = function command(cmd, description, isDefault, aliases, deprecated) {
        if (deprecated === void 0) { deprecated = false; }
        // the last default wins, so cancel out any previously set default
        if (isDefault) {
            commands = commands.map(function (cmdArray) {
                cmdArray[2] = false;
                return cmdArray;
            });
        }
        commands.push([cmd, description || '', isDefault, aliases, deprecated]);
    };
    self.getCommands = function () { return commands; };
    var descriptions = {};
    self.describe = function describe(keyOrKeys, desc) {
        if (Array.isArray(keyOrKeys)) {
            keyOrKeys.forEach(function (k) {
                self.describe(k, desc);
            });
        }
        else if (typeof keyOrKeys === 'object') {
            Object.keys(keyOrKeys).forEach(function (k) {
                self.describe(k, keyOrKeys[k]);
            });
        }
        else {
            descriptions[keyOrKeys] = desc;
        }
    };
    self.getDescriptions = function () { return descriptions; };
    var epilogs = [];
    self.epilog = function (msg) {
        epilogs.push(msg);
    };
    var wrapSet = false;
    var wrap;
    self.wrap = function (cols) {
        wrapSet = true;
        wrap = cols;
    };
    function getWrap() {
        if (!wrapSet) {
            wrap = windowWidth();
            wrapSet = true;
        }
        return wrap;
    }
    var deferY18nLookupPrefix = '__yargsString__:';
    self.deferY18nLookup = function (str) { return deferY18nLookupPrefix + str; };
    self.help = function help() {
        if (cachedHelpMessage)
            return cachedHelpMessage;
        normalizeAliases();
        // handle old demanded API
        var base$0 = yargs.customScriptName
            ? yargs.$0
            : shim.path.basename(yargs.$0);
        var demandedOptions = yargs.getDemandedOptions();
        var demandedCommands = yargs.getDemandedCommands();
        var deprecatedOptions = yargs.getDeprecatedOptions();
        var groups = yargs.getGroups();
        var options = yargs.getOptions();
        var keys = [];
        keys = keys.concat(Object.keys(descriptions));
        keys = keys.concat(Object.keys(demandedOptions));
        keys = keys.concat(Object.keys(demandedCommands));
        keys = keys.concat(Object.keys(options["default"]));
        keys = keys.filter(filterHiddenOptions);
        keys = Object.keys(keys.reduce(function (acc, key) {
            if (key !== '_')
                acc[key] = true;
            return acc;
        }, {}));
        var theWrap = getWrap();
        var ui = shim.cliui({
            width: theWrap,
            wrap: !!theWrap
        });
        // the usage string.
        if (!usageDisabled) {
            if (usages.length) {
                // user-defined usage.
                usages.forEach(function (usage) {
                    ui.div({ text: "".concat(usage[0].replace(/\$0/g, base$0)) });
                    if (usage[1]) {
                        ui.div({ text: "".concat(usage[1]), padding: [1, 0, 0, 0] });
                    }
                });
                ui.div();
            }
            else if (commands.length) {
                var u = null;
                // demonstrate how commands are used.
                if (demandedCommands._) {
                    u = "".concat(base$0, " <").concat(__('command'), ">\n");
                }
                else {
                    u = "".concat(base$0, " [").concat(__('command'), "]\n");
                }
                ui.div("".concat(u));
            }
        }
        // your application's commands, i.e., non-option
        // arguments populated in '_'.
        //
        // If there's only a single command, and it's the default command
        // (represented by commands[0][2]) don't show command stanza:
        //
        // TODO(@bcoe): why isnt commands[0][2] an object with a named property?
        if (commands.length > 1 || (commands.length === 1 && !commands[0][2])) {
            ui.div(__('Commands:'));
            var context = yargs.getInternalMethods().getContext();
            var parentCommands_1 = context.commands.length
                ? "".concat(context.commands.join(' '), " ")
                : '';
            if (yargs.getInternalMethods().getParserConfiguration()['sort-commands'] ===
                true) {
                commands = commands.sort(function (a, b) { return a[0].localeCompare(b[0]); });
            }
            var prefix_1 = base$0 ? "".concat(base$0, " ") : '';
            commands.forEach(function (command) {
                var commandString = "".concat(prefix_1).concat(parentCommands_1).concat(command[0].replace(/^\$0 ?/, '')); // drop $0 from default commands.
                ui.span({
                    text: commandString,
                    padding: [0, 2, 0, 2],
                    width: maxWidth(commands, theWrap, "".concat(base$0).concat(parentCommands_1)) + 4
                }, { text: command[1] });
                var hints = [];
                if (command[2])
                    hints.push("[".concat(__('default'), "]"));
                if (command[3] && command[3].length) {
                    hints.push("[".concat(__('aliases:'), " ").concat(command[3].join(', '), "]"));
                }
                if (command[4]) {
                    if (typeof command[4] === 'string') {
                        hints.push("[".concat(__('deprecated: %s', command[4]), "]"));
                    }
                    else {
                        hints.push("[".concat(__('deprecated'), "]"));
                    }
                }
                if (hints.length) {
                    ui.div({
                        text: hints.join(' '),
                        padding: [0, 0, 0, 2],
                        align: 'right'
                    });
                }
                else {
                    ui.div();
                }
            });
            ui.div();
        }
        // perform some cleanup on the keys array, making it
        // only include top-level keys not their aliases.
        var aliasKeys = (Object.keys(options.alias) || []).concat(Object.keys(yargs.parsed.newAliases) || []);
        keys = keys.filter(function (key) {
            return !yargs.parsed.newAliases[key] &&
                aliasKeys.every(function (alias) { return (options.alias[alias] || []).indexOf(key) === -1; });
        });
        // populate 'Options:' group with any keys that have not
        // explicitly had a group set.
        var defaultGroup = __('Options:');
        if (!groups[defaultGroup])
            groups[defaultGroup] = [];
        addUngroupedKeys(keys, options.alias, groups, defaultGroup);
        var isLongSwitch = function (sw) { return /^--/.test(getText(sw)); };
        // prepare 'Options:' tables display
        var displayedGroups = Object.keys(groups)
            .filter(function (groupName) { return groups[groupName].length > 0; })
            .map(function (groupName) {
            // if we've grouped the key 'f', but 'f' aliases 'foobar',
            // normalizedKeys should contain only 'foobar'.
            var normalizedKeys = groups[groupName]
                .filter(filterHiddenOptions)
                .map(function (key) {
                if (aliasKeys.includes(key))
                    return key;
                for (var i = 0, aliasKey = void 0; (aliasKey = aliasKeys[i]) !== undefined; i++) {
                    if ((options.alias[aliasKey] || []).includes(key))
                        return aliasKey;
                }
                return key;
            });
            return { groupName: groupName, normalizedKeys: normalizedKeys };
        })
            .filter(function (_a) {
            var normalizedKeys = _a.normalizedKeys;
            return normalizedKeys.length > 0;
        })
            .map(function (_a) {
            var groupName = _a.groupName, normalizedKeys = _a.normalizedKeys;
            // actually generate the switches string --foo, -f, --bar.
            var switches = normalizedKeys.reduce(function (acc, key) {
                acc[key] = [key]
                    .concat(options.alias[key] || [])
                    .map(function (sw) {
                    // for the special positional group don't
                    // add '--' or '-' prefix.
                    if (groupName === self.getPositionalGroupName())
                        return sw;
                    else {
                        return (
                        // matches yargs-parser logic in which single-digits
                        // aliases declared with a boolean type are now valid
                        (/^[0-9]$/.test(sw)
                            ? options.boolean.includes(key)
                                ? '-'
                                : '--'
                            : sw.length > 1
                                ? '--'
                                : '-') + sw);
                    }
                })
                    // place short switches first (see #1403)
                    .sort(function (sw1, sw2) {
                    return isLongSwitch(sw1) === isLongSwitch(sw2)
                        ? 0
                        : isLongSwitch(sw1)
                            ? 1
                            : -1;
                })
                    .join(', ');
                return acc;
            }, {});
            return { groupName: groupName, normalizedKeys: normalizedKeys, switches: switches };
        });
        // if some options use short switches, indent long-switches only options (see #1403)
        var shortSwitchesUsed = displayedGroups
            .filter(function (_a) {
            var groupName = _a.groupName;
            return groupName !== self.getPositionalGroupName();
        })
            .some(function (_a) {
            var normalizedKeys = _a.normalizedKeys, switches = _a.switches;
            return !normalizedKeys.every(function (key) { return isLongSwitch(switches[key]); });
        });
        if (shortSwitchesUsed) {
            displayedGroups
                .filter(function (_a) {
                var groupName = _a.groupName;
                return groupName !== self.getPositionalGroupName();
            })
                .forEach(function (_a) {
                var normalizedKeys = _a.normalizedKeys, switches = _a.switches;
                normalizedKeys.forEach(function (key) {
                    if (isLongSwitch(switches[key])) {
                        switches[key] = addIndentation(switches[key], '-x, '.length);
                    }
                });
            });
        }
        // display 'Options:' table along with any custom tables:
        displayedGroups.forEach(function (_a) {
            var groupName = _a.groupName, normalizedKeys = _a.normalizedKeys, switches = _a.switches;
            ui.div(groupName);
            normalizedKeys.forEach(function (key) {
                var kswitch = switches[key];
                var desc = descriptions[key] || '';
                var type = null;
                if (desc.includes(deferY18nLookupPrefix))
                    desc = __(desc.substring(deferY18nLookupPrefix.length));
                if (options.boolean.includes(key))
                    type = "[".concat(__('boolean'), "]");
                if (options.count.includes(key))
                    type = "[".concat(__('count'), "]");
                if (options.string.includes(key))
                    type = "[".concat(__('string'), "]");
                if (options.normalize.includes(key))
                    type = "[".concat(__('string'), "]");
                if (options.array.includes(key))
                    type = "[".concat(__('array'), "]");
                if (options.number.includes(key))
                    type = "[".concat(__('number'), "]");
                var deprecatedExtra = function (deprecated) {
                    return typeof deprecated === 'string'
                        ? "[".concat(__('deprecated: %s', deprecated), "]")
                        : "[".concat(__('deprecated'), "]");
                };
                var extra = [
                    key in deprecatedOptions
                        ? deprecatedExtra(deprecatedOptions[key])
                        : null,
                    type,
                    key in demandedOptions ? "[".concat(__('required'), "]") : null,
                    options.choices && options.choices[key]
                        ? "[".concat(__('choices:'), " ").concat(self.stringifiedValues(options.choices[key]), "]")
                        : null,
                    defaultString(options["default"][key], options.defaultDescription[key]),
                ]
                    .filter(Boolean)
                    .join(' ');
                ui.span({
                    text: getText(kswitch),
                    padding: [0, 2, 0, 2 + getIndentation(kswitch)],
                    width: maxWidth(switches, theWrap) + 4
                }, desc);
                if (extra)
                    ui.div({ text: extra, padding: [0, 0, 0, 2], align: 'right' });
                else
                    ui.div();
            });
            ui.div();
        });
        // describe some common use-cases for your application.
        if (examples.length) {
            ui.div(__('Examples:'));
            examples.forEach(function (example) {
                example[0] = example[0].replace(/\$0/g, base$0);
            });
            examples.forEach(function (example) {
                if (example[1] === '') {
                    ui.div({
                        text: example[0],
                        padding: [0, 2, 0, 2]
                    });
                }
                else {
                    ui.div({
                        text: example[0],
                        padding: [0, 2, 0, 2],
                        width: maxWidth(examples, theWrap) + 4
                    }, {
                        text: example[1]
                    });
                }
            });
            ui.div();
        }
        // the usage string.
        if (epilogs.length > 0) {
            var e = epilogs
                .map(function (epilog) { return epilog.replace(/\$0/g, base$0); })
                .join('\n');
            ui.div("".concat(e, "\n"));
        }
        // Remove the trailing white spaces
        return ui.toString().replace(/\s*$/, '');
    };
    // return the maximum width of a string
    // in the left-hand column of a table.
    function maxWidth(table, theWrap, modifier) {
        var width = 0;
        // table might be of the form [leftColumn],
        // or {key: leftColumn}
        if (!Array.isArray(table)) {
            table = Object.values(table).map(function (v) { return [v]; });
        }
        table.forEach(function (v) {
            // column might be of the form "text"
            // or { text: "text", indent: 4 }
            width = Math.max(shim.stringWidth(modifier ? "".concat(modifier, " ").concat(getText(v[0])) : getText(v[0])) + getIndentation(v[0]), width);
        });
        // if we've enabled 'wrap' we should limit
        // the max-width of the left-column.
        if (theWrap)
            width = Math.min(width, parseInt((theWrap * 0.5).toString(), 10));
        return width;
    }
    // make sure any options set for aliases,
    // are copied to the keys being aliased.
    function normalizeAliases() {
        // handle old demanded API
        var demandedOptions = yargs.getDemandedOptions();
        var options = yargs.getOptions();
        (Object.keys(options.alias) || []).forEach(function (key) {
            options.alias[key].forEach(function (alias) {
                // copy descriptions.
                if (descriptions[alias])
                    self.describe(key, descriptions[alias]);
                // copy demanded.
                if (alias in demandedOptions)
                    yargs.demandOption(key, demandedOptions[alias]);
                // type messages.
                if (options.boolean.includes(alias))
                    yargs.boolean(key);
                if (options.count.includes(alias))
                    yargs.count(key);
                if (options.string.includes(alias))
                    yargs.string(key);
                if (options.normalize.includes(alias))
                    yargs.normalize(key);
                if (options.array.includes(alias))
                    yargs.array(key);
                if (options.number.includes(alias))
                    yargs.number(key);
            });
        });
    }
    // if yargs is executing an async handler, we take a snapshot of the
    // help message to display on failure:
    var cachedHelpMessage;
    self.cacheHelpMessage = function () {
        cachedHelpMessage = this.help();
    };
    // however this snapshot must be cleared afterwards
    // not to be be used by next calls to parse
    self.clearCachedHelpMessage = function () {
        cachedHelpMessage = undefined;
    };
    self.hasCachedHelpMessage = function () {
        return !!cachedHelpMessage;
    };
    // given a set of keys, place any keys that are
    // ungrouped under the 'Options:' grouping.
    function addUngroupedKeys(keys, aliases, groups, defaultGroup) {
        var groupedKeys = [];
        var toCheck = null;
        Object.keys(groups).forEach(function (group) {
            groupedKeys = groupedKeys.concat(groups[group]);
        });
        keys.forEach(function (key) {
            toCheck = [key].concat(aliases[key]);
            if (!toCheck.some(function (k) { return groupedKeys.indexOf(k) !== -1; })) {
                groups[defaultGroup].push(key);
            }
        });
        return groupedKeys;
    }
    function filterHiddenOptions(key) {
        return (yargs.getOptions().hiddenOptions.indexOf(key) < 0 ||
            yargs.parsed.argv[yargs.getOptions().showHiddenOpt]);
    }
    self.showHelp = function (level) {
        var logger = yargs.getInternalMethods().getLoggerInstance();
        if (!level)
            level = 'error';
        var emit = typeof level === 'function' ? level : logger[level];
        emit(self.help());
    };
    self.functionDescription = function (fn) {
        var description = fn.name
            ? shim.Parser.decamelize(fn.name, '-')
            : __('generated-value');
        return ['(', description, ')'].join('');
    };
    self.stringifiedValues = function stringifiedValues(values, separator) {
        var string = '';
        var sep = separator || ', ';
        var array = [].concat(values);
        if (!values || !array.length)
            return string;
        array.forEach(function (value) {
            if (string.length)
                string += sep;
            string += JSON.stringify(value);
        });
        return string;
    };
    // format the default-value-string displayed in
    // the right-hand column.
    function defaultString(value, defaultDescription) {
        var string = "[".concat(__('default:'), " ");
        if (value === undefined && !defaultDescription)
            return null;
        if (defaultDescription) {
            string += defaultDescription;
        }
        else {
            switch (typeof value) {
                case 'string':
                    string += "\"".concat(value, "\"");
                    break;
                case 'object':
                    string += JSON.stringify(value);
                    break;
                default:
                    string += value;
            }
        }
        return "".concat(string, "]");
    }
    // guess the width of the console window, max-width 80.
    function windowWidth() {
        var maxWidth = 80;
        // CI is not a TTY
        /* c8 ignore next 2 */
        if (shim.process.stdColumns) {
            return Math.min(maxWidth, shim.process.stdColumns);
        }
        else {
            return maxWidth;
        }
    }
    // logic for displaying application version.
    var version = null;
    self.version = function (ver) {
        version = ver;
    };
    self.showVersion = function (level) {
        var logger = yargs.getInternalMethods().getLoggerInstance();
        if (!level)
            level = 'error';
        var emit = typeof level === 'function' ? level : logger[level];
        emit(version);
    };
    self.reset = function reset(localLookup) {
        // do not reset wrap here
        // do not reset fails here
        failMessage = null;
        failureOutput = false;
        usages = [];
        usageDisabled = false;
        epilogs = [];
        examples = [];
        commands = [];
        descriptions = (0, obj_filter_js_1.objFilter)(descriptions, function (k) { return !localLookup[k]; });
        return self;
    };
    var frozens = [];
    self.freeze = function freeze() {
        frozens.push({
            failMessage: failMessage,
            failureOutput: failureOutput,
            usages: usages,
            usageDisabled: usageDisabled,
            epilogs: epilogs,
            examples: examples,
            commands: commands,
            descriptions: descriptions
        });
    };
    self.unfreeze = function unfreeze(defaultCommand) {
        if (defaultCommand === void 0) { defaultCommand = false; }
        var frozen = frozens.pop();
        // In the case of running a defaultCommand, we reset
        // usage early to ensure we receive the top level instructions.
        // unfreezing again should just be a noop:
        if (!frozen)
            return;
        // Addresses: https://github.com/yargs/yargs/issues/2030
        if (defaultCommand) {
            descriptions = __assign(__assign({}, frozen.descriptions), descriptions);
            commands = __spreadArray(__spreadArray([], frozen.commands, true), commands, true);
            usages = __spreadArray(__spreadArray([], frozen.usages, true), usages, true);
            examples = __spreadArray(__spreadArray([], frozen.examples, true), examples, true);
            epilogs = __spreadArray(__spreadArray([], frozen.epilogs, true), epilogs, true);
        }
        else {
            (failMessage = frozen.failMessage, failureOutput = frozen.failureOutput, usages = frozen.usages, usageDisabled = frozen.usageDisabled, epilogs = frozen.epilogs, examples = frozen.examples, commands = frozen.commands, descriptions = frozen.descriptions);
        }
    };
    return self;
}
exports.usage = usage;
function isIndentedText(text) {
    return typeof text === 'object';
}
function addIndentation(text, indent) {
    return isIndentedText(text)
        ? { text: text.text, indentation: text.indentation + indent }
        : { text: text, indentation: indent };
}
function getIndentation(text) {
    return isIndentedText(text) ? text.indentation : 0;
}
function getText(text) {
    return isIndentedText(text) ? text.text : text;
}
