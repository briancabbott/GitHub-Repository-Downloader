"use strict";
exports.__esModule = true;
function setBlocking(blocking) {
    // Deno and browser have no process object:
    if (typeof process === 'undefined')
        return;
    [process.stdout, process.stderr].forEach(function (_stream) {
        var stream = _stream;
        if (stream._handle &&
            stream.isTTY &&
            typeof stream._handle.setBlocking === 'function') {
            stream._handle.setBlocking(blocking);
        }
    });
}
exports["default"] = setBlocking;
