import path from 'path';
import Svelte from 'svelte/compiler';

const svgRegexp = /(<svg.*?)(>.*)/s;

const head = (array) => array[0];
const tail = (array) => array[array.length - 1];

function buildComponentName(relativePath) {
  const file = tail(relativePath.split('/'));
  const filename = head(file.split('.'));
  const pascalCasedName = filename
    .split('-')
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join('');

  return pascalCasedName;
}

export default function svg(options = {}) {
  return {
    name: 'svg',

    transform(source, id) {
      if (path.extname(id) !== '.svg') {
        return null;
      }

      const parts = svgRegexp.exec(source);
      // start - <svg fill="#000" width="28"
      // body  - ><path></svg>
      const [, start, body] = parts;

      // to enable passing any props to svg
      const svg = `${start} {...$$props}${body}`;

      const {
        js: {code, map},
      } = Svelte.compile(svg, {
        filename: id,
        name: buildComponentName(id),
        format: 'esm',
        hydratable: true,
        dev: options.dev,
      });

      return {code, map};
    },
  };
}
