"use strict";
exports.__esModule = true;
function whichModule(exported) {
    if (typeof require === 'undefined')
        return null;
    for (var i = 0, files = Object.keys(require.cache), mod = void 0; i < files.length; i++) {
        mod = require.cache[files[i]];
        if (mod.exports === exported)
            return mod;
    }
    return null;
}
exports["default"] = whichModule;
