import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import cleaner from 'rollup-plugin-cleaner';
import progress from 'rollup-plugin-progress';
import htmlTemplate from './html-template';

const PRODUCTION = !process.env.ROLLUP_WATCH;
const DEVELOPMENT = !PRODUCTION;

const DIST = 'public';

export default {
  input: './src/index.js',
  output: {
    dir: DIST,
    entryFileNames: '[name].[hash].js',
  },
  plugins: [
    svelte({compilerOptions: {dev: DEVELOPMENT, hydratable: true}}),
    postcss({extract: true}),
    html({template: htmlTemplate}),
    resolve({browser: true, dedupe: ['svelte']}),
    commonjs(),
    cleaner({targets: [DIST]}),
    progress(),

    DEVELOPMENT && serve(DIST),
    DEVELOPMENT && livereload(),

    PRODUCTION && terser(),
  ],
};
