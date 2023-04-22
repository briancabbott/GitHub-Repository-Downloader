"use strict";
exports.__esModule = true;
exports.objectKeys = exports.assertSingleKey = exports.assertNotStrictEqual = void 0;
/**
 * Typing wrapper around assert.notStrictEqual()
 */
function assertNotStrictEqual(actual, expected, shim, message) {
    shim.assert.notStrictEqual(actual, expected, message);
}
exports.assertNotStrictEqual = assertNotStrictEqual;
/**
 * Asserts actual is a single key, not a key array or a key map.
 */
function assertSingleKey(actual, shim) {
    shim.assert.strictEqual(typeof actual, 'string');
}
exports.assertSingleKey = assertSingleKey;
/**
 * Typing wrapper around Object.keys()
 */
function objectKeys(object) {
    return Object.keys(object);
}
exports.objectKeys = objectKeys;
