import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import css from 'rollup-plugin-css-only'
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import { dotenv } from "dotenv";

dotenv.config();

// const production = !process.env.ROLLUP_WATCH;
const production = true;

export default {
	input: "src/main.js",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "docs/bundle.js"
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			css: css => {
				css.write("docs/components.css");
			}
		}),
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({ browser: true }),
		commonjs(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload("docs"),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
