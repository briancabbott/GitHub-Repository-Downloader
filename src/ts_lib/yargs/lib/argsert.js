"use strict";
exports.__esModule = true;
exports.argsert = void 0;
var yerror_js_1 = require("./yerror.js");
var parse_command_js_1 = require("./parse-command.js");
var positionName = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
function argsert(arg1, arg2, arg3) {
    function parseArgs() {
        return typeof arg1 === 'object'
            ? [{ demanded: [], optional: [] }, arg1, arg2]
            : [
                (0, parse_command_js_1.parseCommand)("cmd ".concat(arg1)),
                arg2,
                arg3,
            ];
    }
    // TODO: should this eventually raise an exception.
    try {
        // preface the argument description with "cmd", so
        // that we can run it through yargs' command parser.
        var position_1 = 0;
        var _a = parseArgs(), parsed = _a[0], callerArguments = _a[1], _length = _a[2];
        var args_1 = [].slice.call(callerArguments);
        while (args_1.length && args_1[args_1.length - 1] === undefined)
            args_1.pop();
        var length_1 = _length || args_1.length;
        if (length_1 < parsed.demanded.length) {
            throw new yerror_js_1.YError("Not enough arguments provided. Expected ".concat(parsed.demanded.length, " but received ").concat(args_1.length, "."));
        }
        var totalCommands = parsed.demanded.length + parsed.optional.length;
        if (length_1 > totalCommands) {
            throw new yerror_js_1.YError("Too many arguments provided. Expected max ".concat(totalCommands, " but received ").concat(length_1, "."));
        }
        parsed.demanded.forEach(function (demanded) {
            var arg = args_1.shift();
            var observedType = guessType(arg);
            var matchingTypes = demanded.cmd.filter(function (type) { return type === observedType || type === '*'; });
            if (matchingTypes.length === 0)
                argumentTypeError(observedType, demanded.cmd, position_1);
            position_1 += 1;
        });
        parsed.optional.forEach(function (optional) {
            if (args_1.length === 0)
                return;
            var arg = args_1.shift();
            var observedType = guessType(arg);
            var matchingTypes = optional.cmd.filter(function (type) { return type === observedType || type === '*'; });
            if (matchingTypes.length === 0)
                argumentTypeError(observedType, optional.cmd, position_1);
            position_1 += 1;
        });
    }
    catch (err) {
        console.warn(err.stack);
    }
}
exports.argsert = argsert;
function guessType(arg) {
    if (Array.isArray(arg)) {
        return 'array';
    }
    else if (arg === null) {
        return 'null';
    }
    return typeof arg;
}
function argumentTypeError(observedType, allowedTypes, position) {
    throw new yerror_js_1.YError("Invalid ".concat(positionName[position] || 'manyith', " argument. Expected ").concat(allowedTypes.join(' or '), " but received ").concat(observedType, "."));
}
