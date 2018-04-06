module.exports = (api) => {
  const options = {
    extensions: ['.js', '.vue'],
    env: {
      node: true,
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      'vue/require-default-prop': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  };

  options.parserOptions = {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  };

  if (!api.hasPlugin('typescript')) {
    options.parserOptions.parser = require.resolve('babel-eslint');
  } else {
    // typescript parser added by @vue/eslint-config-typescript
    options.extensions.push('.ts');
  }

  return options;
};
