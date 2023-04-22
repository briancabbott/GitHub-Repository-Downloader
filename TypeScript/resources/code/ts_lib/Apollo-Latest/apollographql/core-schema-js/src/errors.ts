// autogenerated by ../generate-errors.js
// regenerate when new error types are added anywhere in the project.
// to regenerate: npm run build && node ./generate-errors

import { ErrEmpty, ErrTooMany } from "./each";
import { ErrExtraImport } from "./scope";
import { ErrNoDefinition } from "./de";
import { ErrBadImport } from "./linker";

export type AnyError = ReturnType<
  | typeof ErrEmpty
  | typeof ErrTooMany
  | typeof ErrExtraImport
  | typeof ErrNoDefinition
  | typeof ErrBadImport
>;

const ERROR_CODES = new Set([
  "Empty",
  "TooMany",
  "ExtraImport",
  "NoDefinition",
  "BadImport",
]);

export function isAnyError(o: any): o is AnyError {
  return ERROR_CODES.has(o?.code);
}