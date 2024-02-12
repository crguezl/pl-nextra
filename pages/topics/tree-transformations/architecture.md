---
sidebar: true
---
# Architecture

**Putout** consists of a couple simple parts, here is a workflow representation:

![putout](https://raw.githubusercontent.com/coderaiser/putout/master/images/putout.png)

And here is a CLI scheme:

![putout](https://raw.githubusercontent.com/coderaiser/putout/master/images/putout-cli.png)


### 🌲 The Tree of Syntax

On the bottom level of 🐊**Putout** layes down **Syntax Tree**. This is data structure that makes possible to do [crazy transformations in a simplest possible way](https://dev.to/viveknayyar/revealing-the-magic-of-ast-by-writing-babel-plugins-1h01). It used mostly in compilers development.

You can read about it in [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md). To understand how things works from the inside take a look at [Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler).

> **Preoccupied with a single leaf, you won't see the tree.
> Preoccupied with a single tree, you'll miss the entire forest.
> When you look at a tree, se it for its leafs, its branches, its trunk and the roots, then and only then will you see the tree.**
>
> **(c) Takuan Soho, "The Unfettered Mind: Writings of the Zen Master to the Sword Master"**

Consider next piece of code:

```js
hello = 'world';
```

It looks this way in [**ESTree**](https://github.com/estree/estree) **JavaScript** syntax format:

```json
{
    "type": "AssignmentExpression",
    "operator": "=",
    "left": {
        "type": "Identifier",
        "name": "hello"
    },
    "right": {
        "type": "StringLiteral",
        "value": "world"
    }
}
```

🐊**Putout** based on [**Babel AST**](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md#readme). It has a couple differences from **ESTree** which are perfectly handled by [`estree-to-babel`](https://github.com/coderaiser/estree-to-babel) especially when 🐊**Putout** running as [a plugin for **ESLint**](#-integration-with-eslint).

### 🌴 Laws of the Jungle

- 🐅 `engines` chilling with `engines`, and chasing `plugins`, `processors`, `operators`;
- 🦌 `plugins` chilling with `plugins` and `operators` via `require('putout').operator`;
- 🦒 `processors` chilling with `processors`;
- 🐃 `operators` chilling with `operators`;

### 💚 Engines

**Engines** is the heart of 🐊**Putout**: **Parser**, **Loader** and **Runner** are running for every processed file. **Processor** runs all the processors.

| Package | Version |
|--------|-------|
| [`@putout/engine-parser`](/packages/engine-parser#readme) | [![npm](https://img.shields.io/npm/v/@putout/engine-parser.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/engine-parser) |
| [`@putout/engine-loader`](/packages/engine-loader#readme) | [![npm](https://img.shields.io/npm/v/@putout/engine-loader.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/engine-loader) |
| [`@putout/engine-runner`](/packages/engine-runner#readme) | [![npm](https://img.shields.io/npm/v/@putout/engine-runner.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/engine-runner) |
| [`@putout/engine-processor`](/packages/engine-processor#readme) | [![npm](https://img.shields.io/npm/v/@putout/engine-processor.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/engine-processor) |

### 🧪 Processors

With help of [processors](https://github.com/coderaiser/putout/blob/master/packages/engine-processor#readme) 🐊**Putout** can be extended to read any file format and parse **JavaScript** from there.

Here is a list of built-int processors:

| Package | Version |
|--------|-------|
| [`@putout/processor-javascript`](/packages/processor-javascript#readme) | [![npm](https://img.shields.io/npm/v/@putout/processor-javascript.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-javascript) |
| [`@putout/processor-json`](/packages/processor-json#readme) | [![npm](https://img.shields.io/npm/v/@putout/processor-json.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-json) |
| [`@putout/processor-markdown`](/packages/processor-markdown#readme) | [![npm](https://img.shields.io/npm/v/@putout/processor-markdown.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-markdown) |
| [`@putout/processor-ignore`](/packages/processor-ignore#readme) | [![npm](https://img.shields.io/npm/v/@putout/processor-ignore.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-ignore) |
| [`@putout/processor-yaml`](/packages/processor-yaml#readme) | [![npm](https://img.shields.io/npm/v/@putout/processor-yaml.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-yaml) |
| [`@putout/processor-css`](/packages/processor-css#readme) | [![npm](https://img.shields.io/npm/v/@putout/processor-css.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-css) |

You can disable any of them with:

```json
{
    "processors": [
        ["markdown", "off"]
    ]
}
```

And not bundled processors:

| Package | Version |
|--------|-------|
| [`@putout/processor-typescript`](/packages/processor-typescript#readme) | [![npm](https://img.shields.io/npm/v/@putout/processor-typescript.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-typescript#readme) |
| [`@putout/processor-html`](/packages/processor-html#readme) | [![npm](https://img.shields.io/npm/v/@putout/processor-html.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-html#readme) |

To enable it use:

```json
{
    "processors": [
        ["typescript", "on"]
    ]
}
```

Processors can be tested using [@putout/test/processors](https://github.com/coderaiser/putout/tree/master/packages/test#processors-api).
