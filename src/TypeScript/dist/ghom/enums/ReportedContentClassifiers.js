"use strict";
// ReportedContentClassifiers
// The reasons a piece of content can be reported or minimized.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportedContentClassifiers = void 0;
// Values
// ABUSE
// An abusive or harassing piece of content
// OFF_TOPIC
// An irrelevant piece of content
// OUTDATED
// An outdated piece of content
// RESOLVED
// The content has been resolved
// SPAM
// A spammy piece of content
// The reasons a piece of content can be reported or minimized.
var ReportedContentClassifiers;
(function (ReportedContentClassifiers) {
    // An abusive or harassing piece of content
    ReportedContentClassifiers[ReportedContentClassifiers["ABUSE"] = 0] = "ABUSE";
    // An irrelevant piece of content
    ReportedContentClassifiers[ReportedContentClassifiers["OFF_TOPIC"] = 1] = "OFF_TOPIC";
    // An outdated piece of content
    ReportedContentClassifiers[ReportedContentClassifiers["OUTDATED"] = 2] = "OUTDATED";
    // The content has been resolved
    ReportedContentClassifiers[ReportedContentClassifiers["RESOLVED"] = 3] = "RESOLVED";
    // A spammy piece of content
    ReportedContentClassifiers[ReportedContentClassifiers["SPAM"] = 4] = "SPAM";
})(ReportedContentClassifiers = exports.ReportedContentClassifiers || (exports.ReportedContentClassifiers = {}));
