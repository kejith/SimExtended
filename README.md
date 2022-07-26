# This is a project help you build userscript with webpack

Just [use this git repo as a template](https://github.com/Trim21/webpack-userscript-template/generate).

[中文说明](./readme.cn.md)

## dev

1. Allow Tampermonkey's access to local file URIs [tampermonkey/faq](https://tampermonkey.net/faq.php?ext=dhdg#Q204)
2. install deps with `npm i` or `npm ci`.
3. `npm run dev` to start your development.
4. open `webpack-userscript-template/dist/index.dev.user.js` in your Chrome and install it with your userscript manager.

this userscript's meta contains `// @require file://path/to/dist/index.debug.user.js`,
which take [src/index.ts](./src/index.ts) as entry point.

Everytime you change your metadata config,
you'll have to restart webpack watch server and install new UserScript in your browser again,
because Tampermonkey don't read it from dist everytime.

5. edit [src/index.ts](./src/index.ts), you can even import css or less files. You can use scss if you like.
6. go wo <https://www.example.com/> and open console, you'll see it's working.

livereload is default enabled, use [this Chrome extension](https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei)

You will also see a `index.debug.user.js` file in `dist` directory,
this is a development usage file with `eval-source-map` for better browser error message.

## Cross Site Request

you can call `GM.xmlHttpRequest`,

if you prefer `fetch` API, you can use <https://github.com/Trim21/gm-fetch>

If you are using axios, you can use <https://github.com/Trim21/axios-userscript-adapter>

(these libraries are both included already)

## TypeScript

use typescript as normal, see [example](src/index.ts)

## dependencies

There are two ways to using a package on npm.

### UserScript way

like original UserScript way, you will need to add them to your [user script metadata's require section](./config/metadata.cjs#L13-L17) , and exclude them in [config/webpack.config.base.cjs](./config/webpack.config.base.cjs#L18-L20)

### Webpack way

just install a package and import it in your js file. webpack will pack them with in your final production js file.

## build

```bash
npm run build
```

`dist/index.prod.user.js` is the final script. you can manually copy it to greaskfork for deploy.

### minify

There is a [limit in greasyfork](https://greasyfork.org/en/help/code-rules), your code must not be obfuscated or minified.

## auto deploy

[github actions](./.github/workflows/deploy.yaml#L36) will deploy production userscript to gh-pages branch.

[example](https://github.com/Trim21/webpack-userscript-template/tree/gh-pages)

[deployed](https://trim21.github.io/webpack-userscript-template/)

You can auto use greasyfork's auto update function.
