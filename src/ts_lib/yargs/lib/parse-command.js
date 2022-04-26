"use strict";
exports.__esModule = true;
exports.parseCommand = void 0;
function parseCommand(cmd) {
    var extraSpacesStrippedCommand = cmd.replace(/\s{2,}/g, ' ');
    var splitCommand = extraSpacesStrippedCommand.split(/\s+(?![^[]*]|[^<]*>)/);
    var bregex = /\.*[\][<>]/g;
    var firstCommand = splitCommand.shift();
    if (!firstCommand)
        throw new Error("No command found in: ".concat(cmd));
    var parsedCommand = {
        cmd: firstCommand.replace(bregex, ''),
        demanded: [],
        optional: []
    };
    splitCommand.forEach(function (cmd, i) {
        var variadic = false;
        cmd = cmd.replace(/\s/g, '');
        if (/\.+[\]>]/.test(cmd) && i === splitCommand.length - 1)
            variadic = true;
        if (/^\[/.test(cmd)) {
            parsedCommand.optional.push({
                cmd: cmd.replace(bregex, '').split('|'),
                variadic: variadic
            });
        }
        else {
            parsedCommand.demanded.push({
                cmd: cmd.replace(bregex, '').split('|'),
                variadic: variadic
            });
        }
    });
    return parsedCommand;
}
exports.parseCommand = parseCommand;
