const PRODUCTION = !process.env.ROLLUP_WATCH;
const publicPath = PRODUCTION ? '/static/' : '';

export default async function defaultTemplate({files}) {
  const scripts = (files.js || [])
    .map(({fileName}) => `<script defer type="module" src="${publicPath}${fileName}"></script>`)
    .join('\n');

  const links = (files.css || [])
    .map(({fileName}) => `<link href="${publicPath}${fileName}" rel="stylesheet">`)
    .join('\n');

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta charset="utf-8">

    ${links}
    ${scripts}

    <!-- head -->

  </head>
  <body>
    <!-- body -->
    <main id="app"></main>
  </body>
</html>`;
}
