"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitCommentThread = void 0;
// CommitCommentThread
// A thread of comments on a commit.
// Implements
// Node
// RepositoryNode
// Connections
// comments (CommitCommentConnection!)
// The comments that exist in this thread.
// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.
// before	String	
// Returns the elements in the list that come before the specified cursor.
// first	Int	
// Returns the first n elements from the list.
// last	Int	
// Returns the last n elements from the list.
// Fields
// commit (Commit!)
// The commit the comments were made on.
// id (ID!)
// path (String)
// The file the comments were made on.
// position (Int)
// The position in the diff for the commit that the comment was made on.
// repository (Repository!)
// The repository associated with this node.
// A thread of comments on a commit.
class CommitCommentThread {
}
exports.CommitCommentThread = CommitCommentThread;
