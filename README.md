# @ascendancyy/vue-cli-plugin-eslint

> ESLint plugin for vue-cli

## Injected commands

- **`vue-cli-service lint`**

  ```
  Usage: vue-cli-service lint [options] [...files]

  Options:

    --format [formatter] specify formatter (default: codeframe)
    --no-fix             do not fix errors
  ```

  Lints and fixes files. If no specific files are given, it lints all files in `src` and `test`.

  Other [ESLint CLI options](https://eslint.org/docs/user-guide/command-line-interface#options) are also supported.

## Configuration (.eslintrc.*)

Lint-on-save during development with `eslint-loader` can be enabled with the `lintOnSave` option in `vue.config.js`:

``` js
module.exports = {
  // ...
  lintOnSave: true,
}
```

## Installing in an already created project

``` sh
npm install -D @ascendancyy/vue-cli-plugin-eslint
vue invoke @ascendancyy/vue-cli-plugin-eslint
```

> There is also a shorthand to invoke the plugin  
> `vue invoke @ascendancyy/eslint`  

## Injected webpack-chain rules

- `config.rule('eslint')`
- `config.rule('eslint').use('eslint-loader')`
