//  defining .eslintrc as a JS file instead of a JSON file allows for comments (https://robertcooper.me/post/using-eslint-and-prettier-in-a-typescript-project)

module.exports = {
  env: {
    browser: true, //  my project is meant to run in the browser
    es2021: true,
    node: true, //  my project has some nodejs files
  },

  extends: [
    'eslint:recommended', //  the recommended eslint rules
    'plugin:react/recommended', //  react recommended eslint rules
    'plugin:@typescript-eslint/recommended', //  typescript recommended eslint rules
    'plugin:prettier/recommended', //  disables rules that interfere with prettier (with eslint-config-prettier) and adds the prettier rules.  See https://github.com/prettier/eslint-plugin-prettier#recommended-configuration for reference
  ],
  parser: '@typescript-eslint/parser', //  tells eslint how to parse typescript files
  parserOptions: {
    ecmaFeatures: {
      jsx: true, //  allows for the parsing of JSX
    },
    ecmaVersion: 'latest',
    sourceType: 'module', //  I'm using import/export for modules
  },
  plugins: [
    'react', //  using react eslint rules
    '@typescript-eslint', //  Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs

    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', //  rule added to override "delete CR" prettier error https://stackoverflow.com/a/63654585.  This might relate to being on Windows?
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', //  Tells eslint-plugin-react to automatically detect the version of React to use.  adding this setting to prevent this error https://stackoverflow.com/a/61002263
    },
  },
}
