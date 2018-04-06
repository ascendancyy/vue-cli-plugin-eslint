const micromatch = require('micromatch');
const fs = require('fs');

function getDirectoryEntries(directory) {
  try {
    return fs.readdirSync(directory);
  } catch (e) {
    return [];
  }
}

exports.hasESLintConfig = function hasESLintConfig(directory) {
  return micromatch.some(
    getDirectoryEntries(directory),
    ['.eslintrc', '.eslintrc.{js,json,yaml,yml}'],
    { dot: true },
  );
};
