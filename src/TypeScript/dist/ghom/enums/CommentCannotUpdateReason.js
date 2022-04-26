"use strict";
// CommentCannotUpdateReason
// The possible errors that will prevent a user from updating a comment.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentCannotUpdateReason = void 0;
// Values
// DENIED
// You cannot update this comment
// INSUFFICIENT_ACCESS
// You must be the author or have write access to this repository to update this comment.
// LOCKED
// Unable to create comment because issue is locked.
// LOGIN_REQUIRED
// You must be logged in to update this comment.
// MAINTENANCE
// Repository is under maintenance.
// VERIFIED_EMAIL_REQUIRED
// At least one email address must be verified to update this comment.
// The possible errors that will prevent a user from updating a comment.
var CommentCannotUpdateReason;
(function (CommentCannotUpdateReason) {
    // You cannot update this comment
    CommentCannotUpdateReason[CommentCannotUpdateReason["DENIED"] = 0] = "DENIED";
    // You must be the author or have write access to this repository to update this comment.
    CommentCannotUpdateReason[CommentCannotUpdateReason["INSUFFICIENT_ACCESS"] = 1] = "INSUFFICIENT_ACCESS";
    // Unable to create comment because issue is locked.
    CommentCannotUpdateReason[CommentCannotUpdateReason["LOCKED"] = 2] = "LOCKED";
    // You must be logged in to update this comment.
    CommentCannotUpdateReason[CommentCannotUpdateReason["LOGIN_REQUIRED"] = 3] = "LOGIN_REQUIRED";
    // Repository is under maintenance.
    CommentCannotUpdateReason[CommentCannotUpdateReason["MAINTENANCE"] = 4] = "MAINTENANCE";
    // At least one email address must be verified to update this comment.
    CommentCannotUpdateReason[CommentCannotUpdateReason["VERIFIED_EMAIL_REQUIRED"] = 5] = "VERIFIED_EMAIL_REQUIRED";
})(CommentCannotUpdateReason = exports.CommentCannotUpdateReason || (exports.CommentCannotUpdateReason = {}));
