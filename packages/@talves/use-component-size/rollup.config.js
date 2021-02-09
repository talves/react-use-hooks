import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");
const plugins = [
  peerDepsExternal(),
  resolve({
    browser: true,
    resolveOnly: [/^(?!react$)/, /^(?!react-dom$)/, /^(?!prop-types)/],
  }),
  babel({ babelHelpers: "runtime" }),
  commonjs(),
];

const getOutput = (dirBase = "dist") => {
  return [
    {
      // file: packageJson.main,
      dir: `${dirBase}/cjs`,
      format: "cjs",
    },
    {
      // file: packageJson.module,
      dir: `${dirBase}/esm`,
      format: "es",
    },
  ];
};

export default [
  {
    input: ["src/index.js"],
    output: getOutput(),
    plugins,
  },
];
