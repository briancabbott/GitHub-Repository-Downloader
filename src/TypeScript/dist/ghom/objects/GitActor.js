"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitActor = void 0;
// GitActor
// Represents an actor in a Git commit (ie. an author or committer).
// Fields
// avatarUrl (URI!)
// A URL pointing to the author's public avatar.
// Argument	Type	Description
// size	Int
// The size of the resulting square image.
// date (GitTimestamp)
// The timestamp of the Git action (authoring or committing).
// email (String)
// The email in the Git commit.
// name (String)
// The name in the Git commit.
// user (User)
// The GitHub user corresponding to the email field. Null if no such user exists.
// Represents an actor in a Git commit (ie. an author or committer).
class GitActor {
}
exports.GitActor = GitActor;
