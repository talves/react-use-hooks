[![Netlify Status](https://api.netlify.com/api/v1/badges/004761f3-6c0f-449b-8da1-e18b325b51f7/deploy-status)](https://app.netlify.com/sites/react-use-hooks/deploys)

# Welcome to your new [Toast][toast] site!

## Get this template

```bash
npx create-toast talves/toast-template my-toast-site
```

## scripts

### gulp

This template is using Gulp for development workflow as an option.

The default command uses `browser-sync` and watches css and source paths for rebuild

```shell
gulp
```

Command include (default order):

```shell
gulp css
gulp toast
gulp watchAll
```

### npm run postinstall

The postinstall script will run whenever you install the dependencies for a project. It handles converting any legacy 3rd party commonjs dependencies into browser-runnable ESM. The resulting ESM files are placed in `./public/web_modules/*` and can be cached if you wish (as long as you re-run postinstall when you install new dependencies).

### npm run build

```shell
npm run build
```

The build command runs the CSS build (Tailwind) and the site build (Toast).

### npm run build:css

The CSS build compiles (and purges) Tailwind via PostCSS.

```shell
npm run build:css
```

`postcss-cli` hasn't enabled node v12+ ESM yet, so we have to put our config in a special folder. This folder is `legacy-commonjs` and the only reason it is special is that it has a `package.json` with a single field: `"type": "commonjs"`, which tells node that the files in that folder are all CommonJS files (that is, they use `require()` and not `import`).

### npm run build:site

The site build command runs a full Toast build and outputs the results in `public/`.

```shell
npm run build:site
```

[toast]: https://toast.dev
