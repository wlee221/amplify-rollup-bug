import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    file: "public/bundle.js",
    format: "umd", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
    json(),
    commonjs({
      include: "node_modules/**",
    }), // converts date-fns to ES modules
    resolve({
      browser: true,
      preferBuiltins: true,
    }), // tells Rollup how to find date-fns in node_modules

    production && terser(), // minify, but only in production
  ],
};
