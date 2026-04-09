'use strict';

const build = require('@microsoft/sp-build-web');
const { FILE_LOADER_EXTENSIONS: copyStaticAssetExtensions } = require('@microsoft/sp-build-core-tasks/lib/webpack/ConfigureWebpackTask');
const { FILE_LOADER_EXTENSIONS: webpackFileExtensions, _FILE_LOADER_RULE_TEST: webpackFileLoaderRuleTest } = require('@microsoft/spfx-heft-plugins');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

if (!copyStaticAssetExtensions.includes('avif')) {
  copyStaticAssetExtensions.push('avif');
}

if (!webpackFileExtensions.includes('avif')) {
  webpackFileExtensions.push('avif');
}

const avifRule = /\.avif((\?|#).+)?$/;
if (!webpackFileLoaderRuleTest.or.some(rule => String(rule) === String(avifRule))) {
  webpackFileLoaderRuleTest.or.push(avifRule);
}

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));
