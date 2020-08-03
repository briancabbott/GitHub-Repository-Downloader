import { HovercardContext } from "../interfaces/HovercardContext";

// A generic hovercard context with a message and icon
export class GenericHovercardContext implements HovercardContext {
    // A string describing this context
    message: string

    // An octicon to accompany this context
    octicon: string
}
