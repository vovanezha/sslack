require('svelte/register');

const fs = require('fs');
const GlobalConfig = require('./global-config');

function getFileNameByExtension(filePath, ext) {
  const pageName = filePath.match(/\w+\.svelte/)[0].replace('.svelte', '');
  const pattern = new RegExp(pageName + '\\.\\w*' + `\\.${ext}`);

  const scriptFileName = fs
    .readdirSync(GlobalConfig.paths.static)
    .find((fileName) => pattern.test(fileName));

  return scriptFileName;
}

module.exports = function viewEngine(filePath, options, next) {
  const baseHtml = fs.readFileSync(GlobalConfig.paths.static + '/index.html');

  const scriptFileName = getFileNameByExtension(filePath, 'js');
  const stylesFileName = getFileNameByExtension(filePath, 'css');

  const Component = require(filePath).default;
  let {html, head} = Component.render(options);

  if (!head.includes('<title>')) {
    head += `<title>SSlack</title>`;
  }
  if (stylesFileName) {
    head += `<link href="${GlobalConfig.staticFilesPrefix}/${stylesFileName}" rel="stylesheet">`;
  }
  if (scriptFileName) {
    head += `<script defer type="module" src="${GlobalConfig.staticFilesPrefix}/${scriptFileName}"></script>`;
  }

  const res = baseHtml.toString().replace('<!-- head -->', head).replace('<!-- body -->', html);

  next(null, res);
};
