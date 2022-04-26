"use strict";
// LockReason
// The possible reasons that an issue or pull request was locked.
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockReason = void 0;
// Values
// OFF_TOPIC
// The issue or pull request was locked because the conversation was off-topic.
// RESOLVED
// The issue or pull request was locked because the conversation was resolved.
// SPAM
// The issue or pull request was locked because the conversation was spam.
// TOO_HEATED
// The issue or pull request was locked because the conversation was too heated.
// The possible reasons that an issue or pull request was locked.
var LockReason;
(function (LockReason) {
    // The issue or pull request was locked because the conversation was off-topic.
    LockReason[LockReason["OFF_TOPIC"] = 0] = "OFF_TOPIC";
    // The issue or pull request was locked because the conversation was resolved.
    LockReason[LockReason["RESOLVED"] = 1] = "RESOLVED";
    // The issue or pull request was locked because the conversation was spam.
    LockReason[LockReason["SPAM"] = 2] = "SPAM";
    // The issue or pull request was locked because the conversation was too heated.
    LockReason[LockReason["TOO_HEATED"] = 3] = "TOO_HEATED";
})(LockReason = exports.LockReason || (exports.LockReason = {}));
