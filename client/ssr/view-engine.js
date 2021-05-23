require('svelte/register');

const GlobalConfig = require('./global-config');

module.exports = function viewEngine(filePath, options, next) {
  const Base = require(GlobalConfig.pagesPath + '/base.svelte').default;
  const {html: baseHTML, head: baseHEAD, css: baseCSS} = Base.render(options);

  let resultedHEAD = baseHEAD + `<style>${baseCSS.code}</style>`;

  const Component = require(filePath).default;
  let {html: componentHTML, head: componentHEAD, css: componentCSS} = Component.render(options);

  if (componentHEAD) resultedHEAD += componentHEAD;
  if (componentCSS.code) resultedHEAD += `<style>${componentCSS.code}</style>`;

  const res = baseHTML.replace('%head%', resultedHEAD).replace('%html%', componentHTML);

  next(null, res);
};
