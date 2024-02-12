---
title: Documenting  JavaScript Programs
---



## JSDoc

JSDoc is an API documentation generator for JavaScript, similar to Javadoc. You add documentation comments directly to your source code, right alongside the code itself. The JSDoc tool will scan your source code and generate an HTML documentation website for you.

* [@use JSDoc](https://jsdoc.app/)
- [jsdoc npm package](https://www.npmjs.com/package/jsdoc), 
* [JSDoc format: Wikipedia](https://en.wikipedia.org/wiki/JSDoc)


* [An introduction to JSDoc](https://2ality.com/2011/08/jsdoc-intro.html)
* [Book *Speaking JavaScript: An In-Depth Guide for Programmers* by Dr. Axel Rauschmayer: Chapter 29. JSDoc: Generating API Documentation](https://speakingjs.com/es5/ch29.html)


* JSDoc grammars:
  * PegJS grammar [jsdoctypeparser/jsdoctypeparser/peg_src/jsdoctype.pegjs](https://github.com/jsdoctypeparser/jsdoctypeparser/blob/master/peg_src/jsdoctype.pegjs)
  * PegJS [hegemonic/catharsis/lib/parser.pegjs](https://github.com/hegemonic/catharsis/blob/main/lib/parser.pegjs) or Google Closure Compiler and JSDoc type expressions.

### jsdoc-to-markdown

[jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown) generates markdown API documentation from [jsdoc](https://usejsdoc.org) annotated source code. Useful for injecting API docs into project README files.

1\. Document your code using valid jsdoc comments.

```js
/**
 * A quite wonderful function.
 * @param {object} - Privacy gown
 * @param {object} - Security
 * @returns {survival}
 */
function protection (cloak, dagger) {}
```

2\. Run a command.

```sh
$ jsdoc2md example.js
```

3\. Get markdown output.

```markdown

## protection(cloak, dagger) ⇒ <code>survival</code>
A quite wonderful function.

**Kind**: global function

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| cloak  | <code>object</code> | Privacy gown |
| dagger | <code>object</code> | Security     |

```


See also

* [API documentation](https://github.com/jsdoc2md/jsdoc-to-markdown/blob/master/docs/API.md)
* The [wiki](https://github.com/jsdoc2md/jsdoc-to-markdown/wiki) for example output, FAQs, tutorials, plugins, use with gulp/grunt etc.

## Vuepress Autodoc Plugin

See <https://bprinty.github.io/vuepress-plugin-autodoc/#overview>

## Docco

- [docco](https://jashkenas.github.io/docco/)

## How to Make Man pages

* [Creating Man Pages in Markdown with Ronn](https://spin.atomicobject.com/2015/05/06/man-pages-in-markdown-ronn/)
* [rtomayko/ronn](https://github.com/rtomayko/ronn)
* [How to add man pages to your npm package](https://docs.npmjs.com/files/package.json#man)

## The module documentation.js

!!!include(temas/introduccion-a-javascript/documentation-guide.md)!!!

### References about Documentación.js

- Véase [documentation.js](https://documentation.js.org/), 
* [documentation.js: User's Guide](https://github.com/documentationjs/documentation#user-guide)
* [documentation.js: Getting Started](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md)

### Example: ULL-ESIT-DSI-1617/scapegoat

- [https://github.com/ULL-ESIT-DSI-1617/scapegoat](https://github.com/ULL-ESIT-DSI-1617/scapegoat)
- [https://ull-esit-dsi-1617.github.io/scapegoat/](https://ull-esit-dsi-1617.github.io/scapegoat/)
