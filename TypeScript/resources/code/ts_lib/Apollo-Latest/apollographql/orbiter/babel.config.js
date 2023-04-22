const {
  volta: { node: nodeVersion },
} = require("./package.json");
const nodeMajor = nodeVersion[0];
const nodeMinor = nodeVersion[1];

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: `${nodeMajor}.${nodeMinor}` } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
  ],
};
