# react-use-hooks

React hooks on the @talves published scope. Some opinionated, some not.

## Using

- [microbundle][microbundle] (builds)
- [Changesets][changesets]
- [Prettier][prettier]
- [Lint staged][lint-staged] (once eslint, prettier configured)
- [GitHub Actions][actions] (used for publish of packages)

[microbundle]: https://github.com/developit/microbundle
[changesets]: https://github.com/atlassian/changesets
[prettier]: https://prettier.io/docs/en/install.html
[lint-staged]: https://github.com/okonet/lint-staged
[actions]: https://docs.github.com/en/actions

## Added NX to workflow

```sh
NX_BRANCH=nx yarn nx run site:build:all
```
