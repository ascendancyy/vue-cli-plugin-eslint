module.exports = () => {
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
    parser: require.resolve('babel-eslint'),
    sourceType: 'module',
    allowImportExportEverywhere: true,
  };

  return options;
};
