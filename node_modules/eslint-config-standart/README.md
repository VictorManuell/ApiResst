# eslint-config-standart shareable config

Linting rules that make your code look like _art_ that _stand_ s on it's own

## Installation

    npm install eslint-config-standart

## What is This?

Eslint rules based on [eslint-config-standard](https://github.com/feross/eslint-config-standard) rules with some
exceptions, most importantly:

- comma-first allowed
- any rules conflicting with formatting code in a tabular manner were removed

Used by [standart](https://github.com/thlorenz/standart)

## Usage

Shareable configs are designed to work with the `extends` feature of `.eslintrc` files.  You can learn more about
[Shareable Configs](http://eslint.org/docs/developer-guide/shareable-configs) on the official ESLint website.

To use the JavaScript Standart Style shareable config, first run this:

```bash
npm install eslint-config-standart eslint-plugin-standard eslint-plugin-promise
```

Then, add this to your .eslintrc file:

```
{
  "extends": "standart"
}
```

*Note: We omitted the `eslint-config-` prefix since it is automatically assumed by ESLint.*

You can override settings from the shareable config by adding them directly into your `.eslintrc` file.

## License

MIT
