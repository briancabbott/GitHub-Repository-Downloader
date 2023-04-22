

// TopicSuggestionDeclineReason
// Reason that the suggested topic is declined.

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
export enum TopicSuggestionDeclineReason {
    // The suggested topic is not relevant to the repository.
    NOT_RELEVANT,

    // The viewer does not like the suggested topic.
    PERSONAL_PREFERENCE,

    // The suggested topic is too general for the repository.
    TOO_GENERAL,

    // The suggested topic is too specific for the repository (e.g. #ruby-on-rails-version-4-2-1).
    TOO_SPECIFIC
}

