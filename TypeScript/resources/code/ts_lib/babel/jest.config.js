const supportsESM = parseInt(process.versions.node) >= 12;
const isPublishBundle = process.env.IS_PUBLISH;

module.exports = {
  runner: supportsESM ? "./test/jest-light-runner" : "jest-runner",

  collectCoverageFrom: [
    "packages/*/src/**/*.{js,mjs,ts}",
    "codemods/*/src/**/*.{js,mjs,ts}",
    "eslint/*/src/**/*.{js,mjs,ts}",
  ],
  // The eslint/* packages use ESLint v6, which has dropped support for Node v6.
  // TODO: Remove this process.version check in Babel 8.
  testRegex: `./(packages|codemods${
    Number(process.versions.node.split(".")[0]) < 10 ? "" : "|eslint"
  })/[^/]+/test/.+\\.m?js$`,
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/fixtures/",
    "/test/debug-fixtures/",
    "/babel-parser/test/expressions/",
    "/test/tmp/",
    "/test/__data__/",
    "/test/helpers/",
    "<rootDir>/test/warning\\.js",
    "<rootDir>/build/",
    "<rootDir>/.history/", // local directory for VSCode Extension - https://marketplace.visualstudio.com/items?itemName=xyz.local-history
    "_browser\\.js",
    // Some tests require internal files of bundled packages, which are not available
    // in production builds. They are marked using the .skip-bundled.js extension.
    ...(isPublishBundle ? ["\\.skip-bundled\\.js$"] : []),
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/testSetupFile.js"],
  transformIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/packages/babel-standalone/babel(\\.min)?\\.js",
    "/test/(fixtures|tmp|__data__)/",
    "<rootDir>/(packages|codemods|eslint)/[^/]+/lib/",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/packages/babel-standalone/babel(\\.min)?\\.js",
    "/test/(fixtures|tmp|__data__)/",
  ],
  modulePathIgnorePatterns: [
    "/test/fixtures/",
    "/test/tmp/",
    "/test/__data__/",
    "<rootDir>/build/",
  ],
  // We don't need module name mappers here as depedencies of workspace
  // package should be declared explicitly in the package.json
  // Yarn will generate correct file links so that Jest can resolve correctly
  moduleNameMapper: null,
};
