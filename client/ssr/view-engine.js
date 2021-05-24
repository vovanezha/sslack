require('svelte/register');

const fs = require('fs');
const path = require('path');

module.exports = function viewEngine(filePath, options, next) {
  const baseHtml = fs.readFileSync(path.resolve(__dirname, '../public', 'index.html'));

  const Component = require(filePath).default;
  let {html, head, css} = Component.render(options);

  if (!head.includes('<title>')) head += `<title>SSlack</title>`;
  if (css.code) head += `<style>${css.code}</style>`;

  const res = baseHtml
    .toString()
    .replace('<!-- head -->', head)
    .replace('<!-- body -->', html);

  next(null, res);
};
