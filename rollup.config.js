import typescript from "@rollup/plugin-typescript";
import clean from "@rollup-extras/plugin-clean";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [clean("dist"), typescript({ exclude: ["**/*.test.ts"] }), terser()],
};
