---
---
## Esprima/Espree Examples

En el [Repo ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk) encontrará el material de esta lección.
**Clone este repo**.

The examples in this repo use a couple of JavaScript compiler frameworks: [Esprima](https://esprima.org) and Espree.

[Espree](https://github.com/eslint/espree) started out as a fork of [Esprima](https://esprima.org) v1.2.2, the last stable published released of Esprima before work on ECMAScript 6 began. [Espree](https://github.com/eslint/espree) is now built on top of [Acorn](https://github.com/ternjs/acorn), which has a modular architecture that allows extension of core functionality. The goal of [Espree](https://github.com/eslint/espree) is to produce output that is similar to Esprima with a similar API so that it can be used in place of Esprima.

### REPL example

Una vez clonado el [repo ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk), instalamos las dependencias:

```
➜  esprima-pegjs-jsconfeu-talk git:(master) npm i
```

y arrancamos el bucle REPL de Node.JS:

```
➜  esprima-pegjs-jsconfeu-talk git:(master) node
Welcome to Node.js v14.4.0.
Type ".help" for more information.
```

Cargamos `espree`:

```js
> const espree = require('espree')
undefined
> espree.version
'7.3.1'
> espree.latestEcmaVersion
12
> espree.supportedEcmaVersions
[
  3,  5,  6,  7, 8,
  9, 10, 11, 12
]
```

Navegar en el árbol AST es complicado. El atributo [`espree.visitorKeys`](espree-visitorkeys) nos proporciona la lista de nodos y los nombres de  los atributos de sus hijos


Hagamos un análisis léxico:

```js
> espree.tokenize('answer = /* comment*/ 42', { range: true })
[
  Token {
    type: 'Identifier',
    value: 'answer',
    start: 0,
    end: 6,
    range: [ 0, 6 ]
  },
  Token {
    type: 'Punctuator',
    value: '=',
    start: 7,
    end: 8,
    range: [ 7, 8 ]
  },
  Token {
    type: 'Numeric',
    value: '42',
    start: 22,
    end: 24,
    range: [ 22, 24 ]
  }
]
```

Hagamos ahora un análisis sintáctico:

```js
> espree.parse('const answer = 42', { tokens: true })
Uncaught [SyntaxError: The keyword 'const' is reserved
] {
  index: 0,
  lineNumber: 1,
  column: 1
}
```

La versión ECMA de JS usada por defecto por `espree` es la 5 y esta no admite `const`

Especifiquemos la versión ECMA que queremos:

```js
> espree.parse('const answer = 42', 
              { ecmaVersion: espree.latestEcmaVersion, 
                tokens: true }
              )
Node {
  type: 'Program',
  start: 0,
  end: 17,
  body: [
    Node {
      type: 'VariableDeclaration',
      start: 0,
      end: 17,
      declarations: [Array],
      kind: 'const'
    }
  ],
  sourceType: 'script',
  tokens: [
    Token { type: 'Keyword', value: 'const', start: 0, end: 5 },
    Token { type: 'Identifier', value: 'answer', start: 6, end: 12 },
    Token { type: 'Punctuator', value: '=', start: 13, end: 14 },
    Token { type: 'Numeric', value: '42', start: 15, end: 17 }
  ]
}
```

Observe que el Árbol no aparece completo. El log que usa el bucle REPL de Node lo trunca en el hijo `declarations` (sólo nos muestra que es un array `[Array]` sin expandirlo) para que la salida no sea excesivamente larga.

Para que nos muestre el árbol vamos a usar el método `util.inspect` del módulo `util` 
que convierte un objeto en una string:

```js
> const util = require('util')
undefined
> console.log(
    util.inspect(
        espree.parse('const answer = 42',{ecmaVersion: 6}), 
        {depth: null}
    )
 )
Node {
  type: 'Program',
  start: 0,
  end: 17,
  body: [
    Node {
      type: 'VariableDeclaration',
      start: 0,
      end: 17,
      declarations: [
        Node {
          type: 'VariableDeclarator',
          start: 6,
          end: 17,
          id: Node {
            type: 'Identifier',
            start: 6,
            end: 12,
            name: 'answer'
          },
          init: Node {
            type: 'Literal',
            start: 15,
            end: 17,
            value: 42,
            raw: '42'
          }
        }
      ],
      kind: 'const'
    }
  ],
  sourceType: 'script'
}
undefined
```

Usando la herramienta web **[https://astexplorer.net](https://astexplorer.net)** podemos navegar el AST producido por varios compiladores JS:

* <a href="https://astexplorer.net/#/gist/b5826862c47dfb7dbb54cec15079b430/latest" target="_blank">AST de <code>answer = 42</code></a> en [https://astexplorer.net](https://astexplorer.net)

### Example: Searching for Specific Identifiers

The file [idgrep.js](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/idgrep.js) is a very simple example of using Esprima
to do static analysis on JavaScript code.

It provides a function `idgrep` that finds the appearances of identifiers matching a search string inside the input code.

Given an input like this:

```
➜  esprima-pegjs-jsconfeu-talk git:(master) cat hacky.js 
```
```js
// This is a hack!
const hacky = () => {
    let hack = 3;
    return 'hacky string';
}
```

if we search for `hack` it produces:

```
➜  esprima-pegjs-jsconfeu-talk git:(master) ./idgrep.js hacky.js
1:6: const hacky = () => {
2:8:     let hack = 3;
```

Observe how the appearances of `hack` inside the comment or the string aren't shown

## Práctica Espree Logging

* [Descripción de la Práctica Espree Logging]({{site.baseurl}}/practicas/esprima-logging)

## ASTExplorer

* <a href="https://astexplorer.net/" target="_blank">astexplorer.net demo</a>

## Master the Art of the AST

* [More Advanced examples from the talk *Master the Art of the AST*](/temas/tree-transformations/master-the-ast-lectures.html)


## Syntax Analysis: PEG.js Example

[altjs.js](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/altjs.js) is the code for the "AltJS language in 5 minutes" section
presented in the second half of the [talk Parsing, Compiling, and Static Metaprogramming](https://2013.jsconf.eu/speakers/patrick-dubroy-parsing-compiling-and-static-metaprogramming.html) by Patrick Dubroy

## References

* [Espree](https://github.com/eslint/espree)
  * [Options for parse and tokenize methods](https://github.com/eslint/espree#options)
* <a href="https://astexplorer.net/" target="_blank">astexplorer.net demo</a>
* [ECMA-262, 14th edition, June 2023. ECMAScript® 2023 Language Specification](https://262.ecma-international.org/14.0/?_gl=1*1002c62*_ga*NzU3ODg2OTIxLjE3MDYyNjc4ODY.*_ga_TDCK4DWEPP*MTcwNjI2Nzg4Ni4xLjEuMTcwNjI2NzkxMC4wLjAuMA..&_ga=2.196339244.1625083547.1706267887-757886921.1706267886)
* [idgrep.coffee](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/idgrep.coffee)
* [Compiler Explorer](https://godbolt.org/)