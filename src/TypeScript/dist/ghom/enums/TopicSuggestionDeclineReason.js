"use strict";
// TopicSuggestionDeclineReason
// Reason that the suggested topic is declined.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicSuggestionDeclineReason = void 0;
// Values
// NOT_RELEVANT
// The suggested topic is not relevant to the repository.
// PERSONAL_PREFERENCE
// The viewer does not like the suggested topic.
// TOO_GENERAL
// The suggested topic is too general for the repository.
// TOO_SPECIFIC
// The suggested topic is too specific for the repository (e.g. #ruby-on-rails-version-4-2-1).
// Reason that the suggested topic is declined.
var TopicSuggestionDeclineReason;
(function (TopicSuggestionDeclineReason) {
    // The suggested topic is not relevant to the repository.
    TopicSuggestionDeclineReason[TopicSuggestionDeclineReason["NOT_RELEVANT"] = 0] = "NOT_RELEVANT";
    // The viewer does not like the suggested topic.
    TopicSuggestionDeclineReason[TopicSuggestionDeclineReason["PERSONAL_PREFERENCE"] = 1] = "PERSONAL_PREFERENCE";
    // The suggested topic is too general for the repository.
    TopicSuggestionDeclineReason[TopicSuggestionDeclineReason["TOO_GENERAL"] = 2] = "TOO_GENERAL";
    // The suggested topic is too specific for the repository (e.g. #ruby-on-rails-version-4-2-1).
    TopicSuggestionDeclineReason[TopicSuggestionDeclineReason["TOO_SPECIFIC"] = 3] = "TOO_SPECIFIC";
})(TopicSuggestionDeclineReason = exports.TopicSuggestionDeclineReason || (exports.TopicSuggestionDeclineReason = {}));
