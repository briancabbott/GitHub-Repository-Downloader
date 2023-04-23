import { createOAuthUserAuth, requiresBasicAuth } from "../src";

describe("Smoke test", () => {
  it("createOAuthUserAuth is a function", () => {
    expect(createOAuthUserAuth).toBeInstanceOf(Function);
  });

  it("createOAuthUserAuth.VERSION is set", () => {
    expect(createOAuthUserAuth.VERSION).toEqual("0.0.0-development");
  });

  it("requiresBasicAuth is a function", () => {
    expect(requiresBasicAuth).toBeInstanceOf(Function);
  });
});
