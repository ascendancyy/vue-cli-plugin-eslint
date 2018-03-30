/* eslint
  no-param-reassign: ["error", {
    "props": true,
    "ignorePropertyModificationsFor": ["args"]
  }],
  no-console: "off"
*/

const path = require('path');
const chalk = require('chalk');
const { CLIEngine } = require('eslint');

const optionsForApi = require('./eslintOptions');


// helpers ==========================
function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (
    c ?
      c.toUpperCase() :
      ''
  ));
}

function normalizeConfig(args) {
  const config = {};
  Object.keys(args).forEach((key) => {
    if (key !== '_') {
      config[camelize(key)] = args[key];
    }
  });
  return config;
}

function format(label, msg) {
  let lines = msg.split('\n');
  lines = lines.map((line, idx) => (
    idx === 0 ?
      `${label} ${line}` :
      line.padStart(chalk.reset(label).length)
  ));

  return lines.join('\n');
}
// ==================================

module.exports = function lint(args = {}, api) {
  const cwd = api.resolve('.');
  const options = optionsForApi(api);

  const files = args._ && args._.length ? args._ : ['src', 'tests', '*.js'];
  if (args['no-fix']) {
    args.fix = false;
    delete args['no-fix'];
  }
  const config = Object.assign({}, options, {
    fix: true,
    cwd,
  }, normalizeConfig(args));
  const engine = new CLIEngine(config);
  const report = engine.executeOnFiles(files);
  const formatter = engine.getFormatter(args.format || 'codeframe');

  if (config.fix) {
    CLIEngine.outputFixes(report);
  }

  if (!report.errorCount) {
    if (!args.silent) {
      const hasFixed = report.results.some(f => f.output);
      if (hasFixed) {
        console.log('The following files have been auto-fixed:');
        console.log();
        report.results.forEach((f) => {
          if (f.output) {
            console.log(chalk`  {blue ${path.relative(cwd, f.filePath)}}`);
          }
        });
        console.log();
      }
      if (report.warningCount) {
        console.log(formatter(report.results));
      } else {
        console.log(format(
          chalk`{bgGreen.black  DONE }`,
          hasFixed ? 'All lint errors auto-fixed.' : 'No lint errors found!',
        ));
      }
    }
  } else {
    console.log(formatter(report.results));
    process.exit(1);
  }
};
