import { HovercardContext } from "../interfaces/HovercardContext";


// Hovercard
// This part of the schema is currently available for developers to preview. During this preview period, the API may change without any advance notice. Please see the Hovercards preview for more details.
// Note: The GraphQL resources under preview cannot be accessed via the Explorer at this time.
// Detail needed to display a hovercard for a user
// Fields
// contexts ([HovercardContext!]!)
// Each of the contexts for this hovercard


// Detail needed to display a hovercard for a user
export class Hovercard {
    // Each of the contexts for this hovercard
    contexts: Array<HovercardContext>
}