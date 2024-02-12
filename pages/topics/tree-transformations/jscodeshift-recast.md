---
prev: /temas/tree-transformations/ast-types.md
next: /temas/tree-transformations/jscodeshift.md
---
# Recast  

[Recast](https://github.com/benjamn/recast) is a library for parsing and modifying JavaScript code written on top of esprima and [ast-types][]. 
Recast provides methods for 

1. Parsing the AST [with different parsers](https://github.com/benjamn/recast#using-a-different-parser)
2. pretty printing ASTs
3. API to construct new ASTs without parsing any source code
4. tree transformation
5. [automatic source map generator](https://github.com/benjamn/recast#source-maps)

## Usage

Recast exposes two essential interfaces, one for parsing JavaScript code (`require("recast").parse`) and the other for reprinting modified syntax trees (`require("recast").print`).

See the example in [/crguezl/hello-jscodeshift/hello-recast.js](https://github.com/crguezl/hello-jscodeshift/blob/master/hello-recast.js)

This [code example](https://github.com/crguezl/hello-jscodeshift/blob/master/hello-recast.js) takes as input the code 

```js 
  function add(a, b) {
    return a - b;
  }
```

Here is the code:

```js
const recast = require("recast");
const code = `
  function add(a, b) {
    return a - b;
  }
`;
const ast = recast.parse(code);
const add = ast.program.body[0]; // The node of the add function declaration
```

### recast.types.namedTypes

The next statement asserts the the `add` node has type `FunctionDeclaration`:

```js
const n = recast.types.namedTypes;
n.FunctionDeclaration.assert(add); // we can also: n.FunctionDeclaration.check(add)
```

### recast.builders

If you choose to use `recast.builders` to construct new AST nodes, all builder
arguments will be dynamically type-checked against the Mozilla Parser API.

```js
const B = recast.types.builders;
```

Let's say we wanto to convert the function `add` declaration in a function expression.
To do that, we may want to build an auxiliary AST like this one:

```js
ast.program.body[0] = B.variableDeclaration("const", [
  B.variableDeclarator(add.id, B.functionExpression(
    null, // Anonymize the function expression.
    add.params,
    add.body
  ))
]);
```

### How to write a builder

::: tip How to write a builder
See section [How to write a builder](ast-types-standard-description) for an explanation of how the APi works.
:::

### Switching the parameters

Let us continue with our transformation and just for fun let us switch the two parameters:

```js
add.params.push(add.params.shift());

const output = recast.print(ast).code;

console.log(output);
```

The execution produces:

```js
$ node hello-recast.js 
input code:

  function add(a, b) {
    return a * b;
  }

output code:

  const add = function(b, a) {
    return a * b;
  };
```

## Incoming Sections

Continue now reading the sections

* [Facebook jscodeshift](jscodeshift)
* [API](jscodeshift-api)
* [Testing](jscodeshift-testing)
* [Transformation Module](jscodeshift-transformation-module)

## References

* [recast](https://github.com/benjamn/recast)
More on JSCodeshift in the article [Write Code to Rewrite Your Code: jscodeshift](https://www.toptal.com/javascript/write-code-to-rewrite-your-code) by Jeremy Greer

See [Tree  Transformations References](/temas/tree-transformations/tree-transformations-references)

!!!include(includes/jscodeshift-links.md)!!!
