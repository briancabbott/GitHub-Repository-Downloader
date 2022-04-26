"use strict";
exports.__esModule = true;
exports.applyExtends = void 0;
var yerror_js_1 = require("../yerror.js");
var previouslyVisitedConfigs = [];
var shim;
function applyExtends(config, cwd, mergeExtends, _shim) {
    shim = _shim;
    var defaultConfig = {};
    if (Object.prototype.hasOwnProperty.call(config, 'extends')) {
        if (typeof config["extends"] !== 'string')
            return defaultConfig;
        var isPath = /\.json|\..*rc$/.test(config["extends"]);
        var pathToDefault = null;
        if (!isPath) {
            try {
                pathToDefault = require.resolve(config["extends"]);
            }
            catch (_err) {
                // maybe the module uses key for some other reason,
                // err on side of caution.
                return config;
            }
        }
        else {
            pathToDefault = getPathToDefaultConfig(cwd, config["extends"]);
        }
        checkForCircularExtends(pathToDefault);
        previouslyVisitedConfigs.push(pathToDefault);
        defaultConfig = isPath
            ? JSON.parse(shim.readFileSync(pathToDefault, 'utf8'))
            : require(config["extends"]);
        delete config["extends"];
        defaultConfig = applyExtends(defaultConfig, shim.path.dirname(pathToDefault), mergeExtends, shim);
    }
    previouslyVisitedConfigs = [];
    return mergeExtends
        ? mergeDeep(defaultConfig, config)
        : Object.assign({}, defaultConfig, config);
}
exports.applyExtends = applyExtends;
function checkForCircularExtends(cfgPath) {
    if (previouslyVisitedConfigs.indexOf(cfgPath) > -1) {
        throw new yerror_js_1.YError("Circular extended configurations: '".concat(cfgPath, "'."));
    }
}
function getPathToDefaultConfig(cwd, pathToExtend) {
    return shim.path.resolve(cwd, pathToExtend);
}
function mergeDeep(config1, config2) {
    var target = {};
    function isObject(obj) {
        return obj && typeof obj === 'object' && !Array.isArray(obj);
    }
    Object.assign(target, config1);
    for (var _i = 0, _a = Object.keys(config2); _i < _a.length; _i++) {
        var key = _a[_i];
        if (isObject(config2[key]) && isObject(target[key])) {
            target[key] = mergeDeep(config1[key], config2[key]);
        }
        else {
            target[key] = config2[key];
        }
    }
    return target;
}
