module.exports = () => {
  const options = {
    extensions: ['.js', '.vue'],
    env: {
      node: true,
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      'vue/order-in-components': 'error',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'error',
      'vue/require-v-for-key': 'error',
      'vue/max-attributes-per-line': [2, {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      }],
    },
  };

  options.parserOptions = {
    parser: require.resolve('babel-eslint'),
    sourceType: 'module',
    allowImportExportEverywhere: true,
  };

  return options;
};
