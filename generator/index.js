/* eslint
  no-param-reassign: ["error", {
    "props": true,
    "ignorePropertyModificationsFor": ["files"]
  }],
  no-shadow: "off"
*/

const lint = require('../lint');
const stringifyJS = require('javascript-stringify');
const micromatch = require('micromatch');
const fs = require('fs');
const path = require('path');

function getDirectoryEntries(directory) {
  try {
    return fs.readdirSync(directory);
  } catch (e) {
    return [];
  }
}

module.exports = (api, { lintOn = [] }) => {
  if (typeof lintOn === 'string') {
    lintOn = lintOn.split(','); // eslint-disable-line no-param-reassign
  }

  const pkg = {
    scripts: {
      lint: 'vue-cli-service lint',
    },
    devDependencies: {},
  };

  if (!lintOn.includes('save')) {
    pkg.vue = {
      lintOnSave: false, // eslint-loader configured in runtime plugin
    };
  }

  if (lintOn.includes('commit')) {
    Object.assign(pkg.devDependencies, {
      'lint-staged': '^6.0.0',
    });
    pkg.gitHooks = {
      'pre-commit': 'lint-staged',
    };
    pkg['lint-staged'] = {
      '*.js': ['vue-cli-service lint', 'git add'],
      '*.vue': ['vue-cli-service lint', 'git add'],
    };
  }

  api.render('./template');
  api.extendPackage(pkg);

  const hasMocha = api.hasPlugin('unit-mocha');
  const hasJest = api.hasPlugin('unit-jest');

  if (hasMocha || hasJest) {
    const testPath = 'tests/unit';
    if (!hasESLintConfig(path.resolve(api.resolve('.'), testPath))) {
      const config = {
        env: {},
        rules: {
          'import/no-extraneous-dependencies': 'off',
        },
      };
      if (hasMocha) {
        Object.assign(config.env, { mocha: true });
      } else if (hasJest) {
        Object.assign(config.env, { jest: true });
      }
      api.render((files) => {
        files[`${testPath}/.eslintrc.js`] = `module.exports = ${stringifyJS(config, null, 2)};`;
      });
    }
  }

  if (api.hasPlugin('e2e-cypress')) {
    const e2ePath = 'tests/e2e';
    if (!hasESLintConfig(path.resolve(api.resolve('.'), e2ePath))) {
      const config = {
        env: {
          mocha: true,
        },
        globals: {
          cy: false,
          Cypress: false,
          expect: false,
          assert: false,
        },
      };
      api.render((files) => {
        files[`${e2ePath}/.eslintrc.js`] = `module.exports = ${stringifyJS(config, null, 2)};`;
      });
    }
  }

  // lint & fix after create to ensure files adhere to chosen config
  api.onCreateComplete(() => { lint({ silent: true }, api); });
};
