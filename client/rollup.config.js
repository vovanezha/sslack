import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import svelte from 'rollup-plugin-svelte';
import postcss from 'rollup-plugin-postcss';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import progress from 'rollup-plugin-progress';
import iifePage from './iife-page';
import htmlTemplate from './html-template';

const PRODUCTION = !process.env.ROLLUP_WATCH;
const DEVELOPMENT = !PRODUCTION;

const DIST = 'public';

const pagesPath = path.join('pages');
const pages = fs.readdirSync(pagesPath).map((filename) => path.join(pagesPath, filename));

rimraf.sync(DIST);

export default pages.map((page) => ({
  input: page,
  output: {
    dir: DIST,
    entryFileNames: `[name].[hash].js`,
  },
  plugins: [
    iifePage(),
    svelte({compilerOptions: {dev: DEVELOPMENT, hydratable: true}}),
    postcss({extract: true}),
    html({template: htmlTemplate}),
    resolve({browser: true, dedupe: ['svelte']}),
    commonjs(),
    progress(),

    DEVELOPMENT && serve(DIST),
    DEVELOPMENT && livereload(),

    PRODUCTION && terser(),
  ],
}));
