---
prev: "/topics/tree-transformations/jscodeshift-recast.md"
next: "/topics/tree-transformations/jscodeshift-recast.md"
---

# Understanding the AST Types API

## Writing an ast-types builder

Consider the following code we are going to process with `recast`:

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

and for that we are going to use recast/ast-types builders:

```js
const B = recast.types.builders;
```

Since we want to convert the function `add` declaration in a function expression, we build this AST:

```js
ast.program.body[0] = B.variableDeclaration("const", [
  B.variableDeclarator(add.id, B.functionExpression(
    null, // Anonymize the function expression.
    add.params,
    add.body
  ))
]);
```

Now the question is: **How to be sure about the API of the builders?** 
How to build the call to a builder?

I found the module [ast-types](https://github.com/benjamn/ast-types) and especially the file [def/core.ts](https://github.com/benjamn/ast-types/blob/master/src/def/core.ts)) module helps a lot 
to understand the `ast` API. 

For instance, the following is the definition of [VariableDeclaration](https://github.com/benjamn/ast-types/blob/master/src/def/core.ts#L195-L199):

```js
def("VariableDeclaration")
    .bases("Declaration")
    .build("kind", "declarations")
    .field("kind", or("var", "let", "const"))
    .field("declarations", [def("VariableDeclarator")]);
```

tell us that a variable declaration has two fields `kind` and `declarations` which is an array of `VariableDeclarator`:

```js
ast.program.body[0] = B.variableDeclaration("const", [ B.variableDeclarator( ... )) ]);
```

and this is the definition of [VariableDeclarator](https://github.com/benjamn/ast-types/blob/master/src/def/core.ts#L201-L205):

```js
 def("VariableDeclarator")
    .bases("Node")
    .build("id", "init")
    .field("id", def("Pattern"))
    .field("init", or(def("Expression"), null), defaults["null"]);
```

that it has the fields `id` and `init`:

```js
B.variableDeclarator(add.id, B.functionExpression( ... )
```

Expression is a sort of *abstract* class:

```js 
  def("Expression").bases("Node");

  def("FunctionExpression")
    .bases("Function", "Expression")
    .build("id", "params", "body");

  def("ThisExpression").bases("Expression").build();

  def("ArrayExpression")
    .bases("Expression")
    .build("elements")
    .field("elements", [or(def("Expression"), null)]);

  /* etc. */
```

That tell us that the [FunctionExpression](https://github.com/benjamn/ast-types/blob/master/src/def/core.ts#L191-L193) is a `Expression` and a kind of function and that to build a `FunctionExpression` node we have to specify 
the `"id", "params"` and `"body"`.

Here is the description of `Function` nodes:

```js
def("Function")
    .bases("Node")
    .field("id", or(def("Identifier"), null), defaults["null"])
    .field("params", [def("Pattern")])
    .field("body", def("BlockStatement"))
    .field("generator", Boolean, defaults["false"])
    .field("async", Boolean, defaults["false"]);
```

and that is why we build the `FunctionExpression` this way:

```js
B.functionExpression(null, add.params, add.body )
```

Where `add` is the node containing the original function:

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

## Rasengar AST-builder

A good way to build an ast-types tree is to use the Rasengar tool 

[![/images/rasengar-ast-builder.png](/images/rasengar-ast-builder.png)](https://rajasegar.github.io/ast-builder/)

On the left panel we write the code:

```js 
const add = function(b, a) {
    return a * b;
  };
```

and the panel below appears the build expression, so that we can use it:

```js
> recast = require("recast") 
> j = recast.types.builders // Now we paste the contents of the panel
> ast = j.variableDeclaration("const", [j.variableDeclarator(
...   j.identifier("add"),
...   j.functionExpression(null, [j.identifier("b"), j.identifier("a")], j.blockStatement([
...     j.returnStatement(j.binaryExpression("*", j.identifier("a"), j.identifier("b")))
...   ]))
... )]);
{
  type: 'VariableDeclaration',
  kind: 'const',
  declarations: [ { type: 'VariableDeclarator',
      id: [Object], init: [Object], loc: null, comments: null
  }],
  loc: null, comments: null
}
> recast.print(ast)
PrintResult {
  code: 'const add = function(b, a) {\n    return a * b;\n};'
}
```

## References

* [def/core.ts](https://github.com/benjamn/ast-types/blob/master/src/def/core.ts)
* [ast-types](https://github.com/benjamn/ast-types) 
* [Rasengar AST-builder](https://rajasegar.github.io/ast-builder/)
* [More references about tree transformations](/topics/tree-transformations/tree-transformations-references.html#jscodeshift)