const fs = require('fs');
const path = require('path');
const Svelte = require('svelte/compiler');

function capitalise(name) {
  return name[0].toUpperCase() + name.slice(1);
}

function registerExtension(extension) {
  require.extensions[extension] = function (module, filename) {
    const name = path
      .parse(filename)
      .name.replace(/^\d/, '_$&')
      .replace(/[^\w$]/g, '');

    const source = fs.readFileSync(filename, 'utf-8');

    const svgRegexp = /(<svg.*?)(>.*)/s;
    const parts = svgRegexp.exec(source);
    const [, start, body] = parts;
    const svg = `${start} {...$$props}${body}`;

    const {js} = Svelte.compile(svg, {
      filename,
      name: capitalise(name),
      generate: 'ssr',
      format: 'cjs',
      hydratable: true,
    });

    return module._compile(js.code, filename);
  };
}

registerExtension('.svg');
