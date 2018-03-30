const CodeframeFormatter = require('eslint/lib/formatters/codeframe');

const lint = require('./lint');
const optionsForApi = require('./eslintOptions');

module.exports = (api, { lintOnSave }) => {
  if (lintOnSave) {
    const options = optionsForApi(api);
    api.chainWebpack((webpackConfig) => {
      /* eslint-disable indent */
      webpackConfig.module
        .rule('eslint')
          .test(/\.(vue|(j|t)sx?)$/)
          .pre()
          .include
            .add(api.resolve('src'))
            .add(api.resolve('test'))
            .end()
          .use('eslint-loader')
            .loader('eslint-loader')
            .options(Object.assign(options, {
              emitWarning: lintOnSave !== 'error',
              formatter: CodeframeFormatter,
            }));
      /* eslint-enable indent */
    });
  }

  api.registerCommand('lint', {
    description: 'lint and fix source files',
    usage: 'vue-cli-service lint [options] [...files]',
    options: {
      '--format [formatter]': 'specify formatter (default: codeframe)',
      '--no-fix': 'do not fix errors',
    },
    details: 'For more options, see https://eslint.org/docs/user-guide/command-line-interface#options',
  }, (args) => {
    lint(args, api);
  });
};
