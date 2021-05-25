import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import svelte from 'rollup-plugin-svelte';
import postcss from 'rollup-plugin-postcss';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import progress from 'rollup-plugin-progress';
import iifePage from './rollup-plugins/iife-page';
import htmlTemplate from './rollup-plugins/html-template';

const PRODUCTION = !process.env.ROLLUP_WATCH;
const DEVELOPMENT = !PRODUCTION;

const DIST = 'public';
const ASSETS = './assets';

const pagesPath = path.join('pages');
const pages = fs.readdirSync(pagesPath).map((filename) => path.join(pagesPath, filename));

rimraf.sync(DIST);

export default pages.map((page) => ({
  input: page,
  output: {
    dir: DIST,
    entryFileNames: DEVELOPMENT ? `[name].js` : '[name].[hash].js',
  },
  plugins: [
    iifePage(),
    svelte({compilerOptions: {dev: DEVELOPMENT, hydratable: true}}),
    postcss({extract: true}),
    html({template: htmlTemplate}),
    resolve({browser: true, dedupe: ['svelte']}),
    copy({targets: [{src: ASSETS, dest: DIST}]}),
    commonjs(),
    progress(),

    DEVELOPMENT && livereload(),

    PRODUCTION && terser(),
  ],
}));
