// PullRequestChangedFile
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Pull Requests Preview preview for more details.

// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.

// A file changed in a pull request.

// Fields
// additions (Int!)
// The number of additions to the file.

// deletions (Int!)
// The number of deletions to the file.

// path (String!)
// The path of the file.






// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Pull Requests Preview preview for more details.
export class PullRequestChangedFile {

    // A file changed in a pull request.

    // Fields

    // The number of additions to the file.
    additions: number

    // The number of deletions to the file.
    deletions: number

    // The path of the file.
    path: string
}