"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentAuthorAssociation = void 0;
// A comment author association with repository.
var CommentAuthorAssociation;
(function (CommentAuthorAssociation) {
    // Author has been invited to collaborate on the repository.
    CommentAuthorAssociation[CommentAuthorAssociation["COLLABORATOR"] = 0] = "COLLABORATOR";
    // Author has previously committed to the repository.
    CommentAuthorAssociation[CommentAuthorAssociation["CONTRIBUTOR"] = 1] = "CONTRIBUTOR";
    // Author has not previously committed to GitHub.
    CommentAuthorAssociation[CommentAuthorAssociation["FIRST_TIMER"] = 2] = "FIRST_TIMER";
    // Author has not previously committed to the repository.
    CommentAuthorAssociation[CommentAuthorAssociation["FIRST_TIME_CONTRIBUTOR"] = 3] = "FIRST_TIME_CONTRIBUTOR";
    // Author is a member of the organization that owns the repository.
    CommentAuthorAssociation[CommentAuthorAssociation["MEMBER"] = 4] = "MEMBER";
    // Author has no association with the repository.
    CommentAuthorAssociation[CommentAuthorAssociation["NONE"] = 5] = "NONE";
    // Author is the owner of the repository.
    CommentAuthorAssociation[CommentAuthorAssociation["OWNER"] = 6] = "OWNER";
})(CommentAuthorAssociation = exports.CommentAuthorAssociation || (exports.CommentAuthorAssociation = {}));
