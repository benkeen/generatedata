const nodeResolve = require("rollup-plugin-node-resolve")
const typescriptPlugin = require("rollup-plugin-typescript")

exports.createRollupConfig = typescript => {
  const extensions = [".ts", ".tsx"];

  // treat as externals not relative and not absolute paths
  const external = id => !id.startsWith(".") && !id.startsWith("/");

  return [
    {
      external,
      input: `src/index.ts`,
      output: {
        file: `build/index.esm.js`,
        format: "esm"
      },
      plugins: [nodeResolve({ extensions }), typescriptPlugin({ typescript })]
    },
    {
      external,
      input: `src/index.ts`,
      output: {
        file: `build/index.js`,
        format: "cjs"
      },
      plugins: [nodeResolve({ extensions }), typescriptPlugin({ typescript })]
    }
  ];
};
