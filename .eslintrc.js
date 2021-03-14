module.exports = {
    "env": {
        "browser": true,  //  my project is meant to run in the browser
        "es2021": true,
        "node": true  //  my project has some nodejs files
    },
    "extends": [
        "eslint:recommended",  //  the recommended eslint rules
        "plugin:react/recommended",  //  react recommended eslint rules
        "plugin:@typescript-eslint/recommended"  //  typescript recommended eslint rules
    ],
    "parser": "@typescript-eslint/parser",  //  tells eslint how to parse typescript files
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true  //  I believe this setting tells eslint how to parse JSX
        },
        "ecmaVersion": 12,
        "sourceType": "module"  //  I'm using import/export for modules
    },
    "plugins": [
        "react",  //  using react eslint rules
        "@typescript-eslint"  //  using typescript eslint rules
    ],
    "rules": {
    }
};
