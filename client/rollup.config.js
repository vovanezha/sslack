import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import cleaner from 'rollup-plugin-cleaner';
import progress from 'rollup-plugin-progress';

const PRODUCTION = !process.env.ROLLUP_WATCH;
const DEVELOPMENT = !PRODUCTION;

const DIST = 'public'

export default {
  input: './src/index.js',
  output: {
    dir: DIST,
    entryFileNames: '[name].[hash].js'
  },
  plugins: [
    svelte({ dev: DEVELOPMENT }),
    postcss({ extract: true }),
    html({
      title: 'SSlack',
      meta: [
        { name:'viewport', content: 'width=device-width,initial-scale=1' },
        { charset: 'utf-8' }
      ],
      publicPath: '/',
    }),
    resolve({ browser: true, dedupe: ['svelte'], }),
    commonjs(),
    cleaner({targets: [DIST]}),
    progress(),

    DEVELOPMENT && serve(DIST),
    DEVELOPMENT && livereload(),

    PRODUCTION && terser(),
  ]
}