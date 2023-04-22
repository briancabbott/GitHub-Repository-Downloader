"use strict";
exports.__esModule = true;
exports.isCommandHandlerDefinition = exports.isCommandBuilderCallback = exports.isCommandBuilderDefinition = exports.command = exports.CommandInstance = void 0;
var common_types_js_1 = require("./typings/common-types.js");
var is_promise_js_1 = require("./utils/is-promise.js");
var middleware_js_1 = require("./middleware.js");
var parse_command_js_1 = require("./parse-command.js");
var yargs_factory_js_1 = require("./yargs-factory.js");
var maybe_async_result_js_1 = require("./utils/maybe-async-result.js");
var which_module_js_1 = require("./utils/which-module.js");
var DEFAULT_MARKER = /(^\*)|(^\$0)/;
var CommandInstance = /** @class */ (function () {
    function CommandInstance(usage, validation, globalMiddleware, shim) {
        this.requireCache = new Set();
        this.handlers = {};
        this.aliasMap = {};
        // Used to cache state from prior invocations of commands.
        // This allows the parser to push and pop state when running
        // a nested command:
        this.frozens = [];
        this.shim = shim;
        this.usage = usage;
        this.globalMiddleware = globalMiddleware;
        this.validation = validation;
    }
    CommandInstance.prototype.addDirectory = function (dir, req, callerFile, opts) {
        var _this = this;
        opts = opts || {};
        // disable recursion to support nested directories of subcommands
        if (typeof opts.recurse !== 'boolean')
            opts.recurse = false;
        // exclude 'json', 'coffee' from require-directory defaults
        if (!Array.isArray(opts.extensions))
            opts.extensions = ['js'];
        // allow consumer to define their own visitor function
        var parentVisit = typeof opts.visit === 'function' ? opts.visit : function (o) { return o; };
        // call addHandler via visitor function
        opts.visit = function (obj, joined, filename) {
            var visited = parentVisit(obj, joined, filename);
            // allow consumer to skip modules with their own visitor
            if (visited) {
                // check for cyclic reference:
                if (_this.requireCache.has(joined))
                    return visited;
                else
                    _this.requireCache.add(joined);
                _this.addHandler(visited);
            }
            return visited;
        };
        this.shim.requireDirectory({ require: req, filename: callerFile }, dir, opts);
    };
    CommandInstance.prototype.addHandler = function (cmd, description, builder, handler, commandMiddleware, deprecated) {
        var _a;
        var _this = this;
        var aliases = [];
        var middlewares = (0, middleware_js_1.commandMiddlewareFactory)(commandMiddleware);
        handler = handler || (function () { });
        // If an array is provided that is all CommandHandlerDefinitions, add
        // each handler individually:
        if (Array.isArray(cmd)) {
            if (isCommandAndAliases(cmd)) {
                _a = cmd, cmd = _a[0], aliases = _a.slice(1);
            }
            else {
                for (var _i = 0, cmd_1 = cmd; _i < cmd_1.length; _i++) {
                    var command_1 = cmd_1[_i];
                    this.addHandler(command_1);
                }
            }
        }
        else if (isCommandHandlerDefinition(cmd)) {
            var command_2 = Array.isArray(cmd.command) || typeof cmd.command === 'string'
                ? cmd.command
                : this.moduleName(cmd);
            if (cmd.aliases)
                command_2 = [].concat(command_2).concat(cmd.aliases);
            this.addHandler(command_2, this.extractDesc(cmd), cmd.builder, cmd.handler, cmd.middlewares, cmd.deprecated);
            return;
        }
        else if (isCommandBuilderDefinition(builder)) {
            // Allow a module to be provided as builder, rather than function:
            this.addHandler([cmd].concat(aliases), description, builder.builder, builder.handler, builder.middlewares, builder.deprecated);
            return;
        }
        // The 'cmd' provided was a string, we apply the command DSL:
        // https://github.com/yargs/yargs/blob/master/docs/advanced.md#advanced-topics
        if (typeof cmd === 'string') {
            // parse positionals out of cmd string
            var parsedCommand_1 = (0, parse_command_js_1.parseCommand)(cmd);
            // remove positional args from aliases only
            aliases = aliases.map(function (alias) { return (0, parse_command_js_1.parseCommand)(alias).cmd; });
            // check for default and filter out '*'
            var isDefault_1 = false;
            var parsedAliases = [parsedCommand_1.cmd].concat(aliases).filter(function (c) {
                if (DEFAULT_MARKER.test(c)) {
                    isDefault_1 = true;
                    return false;
                }
                return true;
            });
            // standardize on $0 for default command.
            if (parsedAliases.length === 0 && isDefault_1)
                parsedAliases.push('$0');
            // shift cmd and aliases after filtering out '*'
            if (isDefault_1) {
                parsedCommand_1.cmd = parsedAliases[0];
                aliases = parsedAliases.slice(1);
                cmd = cmd.replace(DEFAULT_MARKER, parsedCommand_1.cmd);
            }
            // populate aliasMap
            aliases.forEach(function (alias) {
                _this.aliasMap[alias] = parsedCommand_1.cmd;
            });
            if (description !== false) {
                this.usage.command(cmd, description, isDefault_1, aliases, deprecated);
            }
            this.handlers[parsedCommand_1.cmd] = {
                original: cmd,
                description: description,
                handler: handler,
                builder: builder || {},
                middlewares: middlewares,
                deprecated: deprecated,
                demanded: parsedCommand_1.demanded,
                optional: parsedCommand_1.optional
            };
            if (isDefault_1)
                this.defaultCommand = this.handlers[parsedCommand_1.cmd];
        }
    };
    CommandInstance.prototype.getCommandHandlers = function () {
        return this.handlers;
    };
    CommandInstance.prototype.getCommands = function () {
        return Object.keys(this.handlers).concat(Object.keys(this.aliasMap));
    };
    CommandInstance.prototype.hasDefaultCommand = function () {
        return !!this.defaultCommand;
    };
    CommandInstance.prototype.runCommand = function (command, yargs, parsed, commandIndex, helpOnly, helpOrVersionSet) {
        var _this = this;
        var commandHandler = this.handlers[command] ||
            this.handlers[this.aliasMap[command]] ||
            this.defaultCommand;
        var currentContext = yargs.getInternalMethods().getContext();
        var parentCommands = currentContext.commands.slice();
        var isDefaultCommand = !command;
        if (command) {
            currentContext.commands.push(command);
            currentContext.fullCommands.push(commandHandler.original);
        }
        var builderResult = this.applyBuilderUpdateUsageAndParse(isDefaultCommand, commandHandler, yargs, parsed.aliases, parentCommands, commandIndex, helpOnly, helpOrVersionSet);
        return (0, is_promise_js_1.isPromise)(builderResult)
            ? builderResult.then(function (result) {
                return _this.applyMiddlewareAndGetResult(isDefaultCommand, commandHandler, result.innerArgv, currentContext, helpOnly, result.aliases, yargs);
            })
            : this.applyMiddlewareAndGetResult(isDefaultCommand, commandHandler, builderResult.innerArgv, currentContext, helpOnly, builderResult.aliases, yargs);
    };
    CommandInstance.prototype.applyBuilderUpdateUsageAndParse = function (isDefaultCommand, commandHandler, yargs, aliases, parentCommands, commandIndex, helpOnly, helpOrVersionSet) {
        var _this = this;
        var builder = commandHandler.builder;
        var innerYargs = yargs;
        if (isCommandBuilderCallback(builder)) {
            // A function can be provided, which builds
            // up a yargs chain and possibly returns it.
            var builderOutput = builder(yargs.getInternalMethods().reset(aliases), helpOrVersionSet);
            // Support the use-case of async builders:
            if ((0, is_promise_js_1.isPromise)(builderOutput)) {
                return builderOutput.then(function (output) {
                    innerYargs = (0, yargs_factory_js_1.isYargsInstance)(output) ? output : yargs;
                    return _this.parseAndUpdateUsage(isDefaultCommand, commandHandler, innerYargs, parentCommands, commandIndex, helpOnly);
                });
            }
        }
        else if (isCommandBuilderOptionDefinitions(builder)) {
            // as a short hand, an object can instead be provided, specifying
            // the options that a command takes.
            innerYargs = yargs.getInternalMethods().reset(aliases);
            Object.keys(commandHandler.builder).forEach(function (key) {
                innerYargs.option(key, builder[key]);
            });
        }
        return this.parseAndUpdateUsage(isDefaultCommand, commandHandler, innerYargs, parentCommands, commandIndex, helpOnly);
    };
    CommandInstance.prototype.parseAndUpdateUsage = function (isDefaultCommand, commandHandler, innerYargs, parentCommands, commandIndex, helpOnly) {
        // A null command indicates we are running the default command,
        // if this is the case, we should show the root usage instructions
        // rather than the usage instructions for the nested default command:
        if (isDefaultCommand)
            innerYargs.getInternalMethods().getUsageInstance().unfreeze(true);
        if (this.shouldUpdateUsage(innerYargs)) {
            innerYargs
                .getInternalMethods()
                .getUsageInstance()
                .usage(this.usageFromParentCommandsCommandHandler(parentCommands, commandHandler), commandHandler.description);
        }
        var innerArgv = innerYargs
            .getInternalMethods()
            .runYargsParserAndExecuteCommands(null, undefined, true, commandIndex, helpOnly);
        return (0, is_promise_js_1.isPromise)(innerArgv)
            ? innerArgv.then(function (argv) { return ({
                aliases: innerYargs.parsed.aliases,
                innerArgv: argv
            }); })
            : {
                aliases: innerYargs.parsed.aliases,
                innerArgv: innerArgv
            };
    };
    CommandInstance.prototype.shouldUpdateUsage = function (yargs) {
        return (!yargs.getInternalMethods().getUsageInstance().getUsageDisabled() &&
            yargs.getInternalMethods().getUsageInstance().getUsage().length === 0);
    };
    CommandInstance.prototype.usageFromParentCommandsCommandHandler = function (parentCommands, commandHandler) {
        var c = DEFAULT_MARKER.test(commandHandler.original)
            ? commandHandler.original.replace(DEFAULT_MARKER, '').trim()
            : commandHandler.original;
        var pc = parentCommands.filter(function (c) {
            return !DEFAULT_MARKER.test(c);
        });
        pc.push(c);
        return "$0 ".concat(pc.join(' '));
    };
    CommandInstance.prototype.applyMiddlewareAndGetResult = function (isDefaultCommand, commandHandler, innerArgv, currentContext, helpOnly, aliases, yargs) {
        var positionalMap = {};
        // If showHelp() or getHelp() is being run, we should not
        // execute middleware or handlers (these may perform expensive operations
        // like creating a DB connection).
        if (helpOnly)
            return innerArgv;
        if (!yargs.getInternalMethods().getHasOutput()) {
            positionalMap = this.populatePositionals(commandHandler, innerArgv, currentContext, yargs);
        }
        var middlewares = this.globalMiddleware
            .getMiddleware()
            .slice(0)
            .concat(commandHandler.middlewares);
        innerArgv = (0, middleware_js_1.applyMiddleware)(innerArgv, yargs, middlewares, true);
        // we apply validation post-hoc, so that custom
        // checks get passed populated positional arguments.
        if (!yargs.getInternalMethods().getHasOutput()) {
            var validation_1 = yargs
                .getInternalMethods()
                .runValidation(aliases, positionalMap, yargs.parsed.error, isDefaultCommand);
            innerArgv = (0, maybe_async_result_js_1.maybeAsyncResult)(innerArgv, function (result) {
                validation_1(result);
                return result;
            });
        }
        if (commandHandler.handler && !yargs.getInternalMethods().getHasOutput()) {
            yargs.getInternalMethods().setHasOutput();
            // to simplify the parsing of positionals in commands,
            // we temporarily populate '--' rather than _, with arguments
            var populateDoubleDash = !!yargs.getOptions().configuration['populate--'];
            yargs
                .getInternalMethods()
                .postProcess(innerArgv, populateDoubleDash, false, false);
            innerArgv = (0, middleware_js_1.applyMiddleware)(innerArgv, yargs, middlewares, false);
            innerArgv = (0, maybe_async_result_js_1.maybeAsyncResult)(innerArgv, function (result) {
                var handlerResult = commandHandler.handler(result);
                return (0, is_promise_js_1.isPromise)(handlerResult)
                    ? handlerResult.then(function () { return result; })
                    : result;
            });
            if (!isDefaultCommand) {
                yargs.getInternalMethods().getUsageInstance().cacheHelpMessage();
            }
            if ((0, is_promise_js_1.isPromise)(innerArgv) &&
                !yargs.getInternalMethods().hasParseCallback()) {
                innerArgv["catch"](function (error) {
                    try {
                        yargs.getInternalMethods().getUsageInstance().fail(null, error);
                    }
                    catch (_err) {
                        // If .fail(false) is not set, and no parse cb() has been
                        // registered, run usage's default fail method.
                    }
                });
            }
        }
        if (!isDefaultCommand) {
            currentContext.commands.pop();
            currentContext.fullCommands.pop();
        }
        return innerArgv;
    };
    // transcribe all positional arguments "command <foo> <bar> [apple]"
    // onto argv.
    CommandInstance.prototype.populatePositionals = function (commandHandler, argv, context, yargs) {
        argv._ = argv._.slice(context.commands.length); // nuke the current commands
        var demanded = commandHandler.demanded.slice(0);
        var optional = commandHandler.optional.slice(0);
        var positionalMap = {};
        this.validation.positionalCount(demanded.length, argv._.length);
        while (demanded.length) {
            var demand = demanded.shift();
            this.populatePositional(demand, argv, positionalMap);
        }
        while (optional.length) {
            var maybe = optional.shift();
            this.populatePositional(maybe, argv, positionalMap);
        }
        argv._ = context.commands.concat(argv._.map(function (a) { return '' + a; }));
        this.postProcessPositionals(argv, positionalMap, this.cmdToParseOptions(commandHandler.original), yargs);
        return positionalMap;
    };
    CommandInstance.prototype.populatePositional = function (positional, argv, positionalMap) {
        var cmd = positional.cmd[0];
        if (positional.variadic) {
            positionalMap[cmd] = argv._.splice(0).map(String);
        }
        else {
            if (argv._.length)
                positionalMap[cmd] = [String(argv._.shift())];
        }
    };
    // Based on parsing variadic markers '...', demand syntax '<foo>', etc.,
    // populate parser hints:
    CommandInstance.prototype.cmdToParseOptions = function (cmdString) {
        var parseOptions = {
            array: [],
            "default": {},
            alias: {},
            demand: {}
        };
        var parsed = (0, parse_command_js_1.parseCommand)(cmdString);
        parsed.demanded.forEach(function (d) {
            var _a = d.cmd, cmd = _a[0], aliases = _a.slice(1);
            if (d.variadic) {
                parseOptions.array.push(cmd);
                parseOptions["default"][cmd] = [];
            }
            parseOptions.alias[cmd] = aliases;
            parseOptions.demand[cmd] = true;
        });
        parsed.optional.forEach(function (o) {
            var _a = o.cmd, cmd = _a[0], aliases = _a.slice(1);
            if (o.variadic) {
                parseOptions.array.push(cmd);
                parseOptions["default"][cmd] = [];
            }
            parseOptions.alias[cmd] = aliases;
        });
        return parseOptions;
    };
    // we run yargs-parser against the positional arguments
    // applying the same parsing logic used for flags.
    CommandInstance.prototype.postProcessPositionals = function (argv, positionalMap, parseOptions, yargs) {
        // combine the parsing hints we've inferred from the command
        // string with explicitly configured parsing hints.
        var options = Object.assign({}, yargs.getOptions());
        options["default"] = Object.assign(parseOptions["default"], options["default"]);
        for (var _i = 0, _a = Object.keys(parseOptions.alias); _i < _a.length; _i++) {
            var key = _a[_i];
            options.alias[key] = (options.alias[key] || []).concat(parseOptions.alias[key]);
        }
        options.array = options.array.concat(parseOptions.array);
        options.config = {}; //  don't load config when processing positionals.
        var unparsed = [];
        Object.keys(positionalMap).forEach(function (key) {
            positionalMap[key].map(function (value) {
                if (options.configuration['unknown-options-as-args'])
                    options.key[key] = true;
                unparsed.push("--".concat(key));
                unparsed.push(value);
            });
        });
        // short-circuit parse.
        if (!unparsed.length)
            return;
        var config = Object.assign({}, options.configuration, {
            'populate--': false
        });
        var parsed = this.shim.Parser.detailed(unparsed, Object.assign({}, options, {
            configuration: config
        }));
        if (parsed.error) {
            yargs
                .getInternalMethods()
                .getUsageInstance()
                .fail(parsed.error.message, parsed.error);
        }
        else {
            // only copy over positional keys (don't overwrite
            // flag arguments that were already parsed).
            var positionalKeys_1 = Object.keys(positionalMap);
            Object.keys(positionalMap).forEach(function (key) {
                positionalKeys_1.push.apply(positionalKeys_1, parsed.aliases[key]);
            });
            var defaults_1 = yargs.getOptions()["default"];
            Object.keys(parsed.argv).forEach(function (key) {
                if (positionalKeys_1.includes(key)) {
                    // any new aliases need to be placed in positionalMap, which
                    // is used for validation.
                    if (!positionalMap[key])
                        positionalMap[key] = parsed.argv[key];
                    // Addresses: https://github.com/yargs/yargs/issues/1637
                    // If both positionals/options provided, no default was set,
                    // and if at least one is an array: don't overwrite, combine.
                    if (!Object.prototype.hasOwnProperty.call(defaults_1, key) &&
                        Object.prototype.hasOwnProperty.call(argv, key) &&
                        Object.prototype.hasOwnProperty.call(parsed.argv, key) &&
                        (Array.isArray(argv[key]) || Array.isArray(parsed.argv[key]))) {
                        argv[key] = [].concat(argv[key], parsed.argv[key]);
                    }
                    else {
                        argv[key] = parsed.argv[key];
                    }
                }
            });
        }
    };
    CommandInstance.prototype.runDefaultBuilderOn = function (yargs) {
        if (!this.defaultCommand)
            return;
        if (this.shouldUpdateUsage(yargs)) {
            // build the root-level command string from the default string.
            var commandString = DEFAULT_MARKER.test(this.defaultCommand.original)
                ? this.defaultCommand.original
                : this.defaultCommand.original.replace(/^[^[\]<>]*/, '$0 ');
            yargs
                .getInternalMethods()
                .getUsageInstance()
                .usage(commandString, this.defaultCommand.description);
        }
        var builder = this.defaultCommand.builder;
        if (isCommandBuilderCallback(builder)) {
            return builder(yargs, true);
        }
        else if (!isCommandBuilderDefinition(builder)) {
            Object.keys(builder).forEach(function (key) {
                yargs.option(key, builder[key]);
            });
        }
        return undefined;
    };
    // lookup module object from require()d command and derive name
    // if module was not require()d and no name given, throw error
    CommandInstance.prototype.moduleName = function (obj) {
        var mod = (0, which_module_js_1["default"])(obj);
        if (!mod)
            throw new Error("No command name given for module: ".concat(this.shim.inspect(obj)));
        return this.commandFromFilename(mod.filename);
    };
    CommandInstance.prototype.commandFromFilename = function (filename) {
        return this.shim.path.basename(filename, this.shim.path.extname(filename));
    };
    CommandInstance.prototype.extractDesc = function (_a) {
        var describe = _a.describe, description = _a.description, desc = _a.desc;
        for (var _i = 0, _b = [describe, description, desc]; _i < _b.length; _i++) {
            var test = _b[_i];
            if (typeof test === 'string' || test === false)
                return test;
            (0, common_types_js_1.assertNotStrictEqual)(test, true, this.shim);
        }
        return false;
    };
    // Push/pop the current command configuration:
    CommandInstance.prototype.freeze = function () {
        this.frozens.push({
            handlers: this.handlers,
            aliasMap: this.aliasMap,
            defaultCommand: this.defaultCommand
        });
    };
    CommandInstance.prototype.unfreeze = function () {
        var frozen = this.frozens.pop();
        (0, common_types_js_1.assertNotStrictEqual)(frozen, undefined, this.shim);
        (this.handlers = frozen.handlers, this.aliasMap = frozen.aliasMap, this.defaultCommand = frozen.defaultCommand);
    };
    // Revert to initial state:
    CommandInstance.prototype.reset = function () {
        this.handlers = {};
        this.aliasMap = {};
        this.defaultCommand = undefined;
        this.requireCache = new Set();
        return this;
    };
    return CommandInstance;
}());
exports.CommandInstance = CommandInstance;
// Adds support to yargs for lazy loading a hierarchy of commands:
function command(usage, validation, globalMiddleware, shim) {
    return new CommandInstance(usage, validation, globalMiddleware, shim);
}
exports.command = command;
function isCommandBuilderDefinition(builder) {
    return (typeof builder === 'object' &&
        !!builder.builder &&
        typeof builder.handler === 'function');
}
exports.isCommandBuilderDefinition = isCommandBuilderDefinition;
function isCommandAndAliases(cmd) {
    return cmd.every(function (c) { return typeof c === 'string'; });
}
function isCommandBuilderCallback(builder) {
    return typeof builder === 'function';
}
exports.isCommandBuilderCallback = isCommandBuilderCallback;
function isCommandBuilderOptionDefinitions(builder) {
    return typeof builder === 'object';
}
function isCommandHandlerDefinition(cmd) {
    return typeof cmd === 'object' && !Array.isArray(cmd);
}
exports.isCommandHandlerDefinition = isCommandHandlerDefinition;
