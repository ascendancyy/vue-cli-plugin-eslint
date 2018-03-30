// these prompts are used if the plugin is late-installed into an existing
// project and invoked by `vue invoke`.

const chalk = require('chalk');
const { execSync } = require('child_process');

let git;
function hasGit() {
  if (git != null) {
    return git;
  }
  try {
    execSync('git --version', { stdio: 'ignore' });
    git = true;
  } catch (e) {
    git = false;
  }
  return git;
}

module.exports = [
  {
    name: 'lintOn',
    type: 'checkbox',
    message: 'Pick additional lint features:',
    choices: [
      {
        name: 'Lint on save',
        value: 'save',
      },
      {
        name: `Lint and fix on commit ${hasGit() ? '' : chalk`{red  (requires Git)}`}`,
        value: 'commit',
      },
    ],
  },
];
