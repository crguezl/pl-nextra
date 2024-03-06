---
prev: jscodeshift-transformation-module.md
next: /topics/tree-transformations/jscodeshift.md
---
# The jscodeshift API

As already mentioned, jscodeshift also provides a wrapper around [recast][].
In order to properly use the jscodeshift API, one has to understand the basic
building blocks of recast (and ASTs) as well.

## Core Concepts

### AST nodes

An AST node is a plain JavaScript object with a specific set of fields, in
accordance with the [Mozilla Parser API][]. The primary way to identify nodes
is via their `type`.

For example, string literals are represented via `Literal` nodes, which
have the structure

```js
// "foo"
{
  type: 'Literal',
  value: 'foo',
  raw: '"foo"'
}
```

It's OK to not know the structure of every AST node type.
The [(esprima) AST explorer][ast-explorer] is an online tool to inspect the AST
for a given piece of JS code.

### Path objects

Recast itself relies heavily on [ast-types][] which defines methods to 
1. traverse the AST, 
2. access node fields and 
3. build new nodes. 
 
ast-types wraps every AST node into a *path object*. 
Paths contain meta-information and helper methods to
process AST nodes.

For example, the child-parent relationship between two nodes is not explicitly
defined. Given a plain AST node, it is not possible to traverse the tree *up*.
Given a *path object* however, the parent can be traversed to via `path.parent`.

For more information about the path object API, please have a look at
[ast-types][].

### Builders

To make creating AST nodes a bit simpler and "safer", ast-types defines a couple
of *builder methods*, which are also exposed on `jscodeshift`.

For example, the following creates an AST equivalent to `foo(bar)`:

```js
// inside a module transform
var j = jscodeshift;
// foo(bar);
var ast = j.callExpression(
  j.identifier('foo'),
  [j.identifier('bar')]
);
```

::: danger jscodeshift Lowercase vs Uppercase fields

If you access a `jscodeshift` field starting with lowercase like `j.callExpression, it will return a **build** instance.

If you access a `jscodeshift` field starting with uppercase, it will return a **predicate** which  is used to filter and check nodes.
:::

The signature of each builder function is best learned by having a look at the
[definition files](https://github.com/benjamn/ast-types/blob/master/def/).

## Collections and Traversal

In order to transform the AST, you have to traverse it and find the nodes that
need to be changed. jscodeshift is built around the idea of **[collections][]** of
**paths** and thus provides a different way of processing an AST than recast or
ast-types.

1. [Collections][] contain [nodepaths][], 
2. [nodepaths][] contain nodes, and 
3. nodes are what the AST is made of.

[![](/images/nodes-nodepaths-collections.png)](https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation#intro)

*A collection has methods to process the nodes inside a collection, often
resulting in a new collection* 

This results in a fluent interface, which can
make the transform more readable.

[Collections][] are "typed" which means that the type of a collection is the
"lowest" type all AST nodes in the collection have in common. That means you
cannot call a method for a `FunctionExpression` collection on an `Identifier`
collection.

Here is an example of how one would find/traverse all `Identifier` nodes with
jscodeshift:

```js
// jscodeshift
jscodeshift(src)
  .find(jscodeshift.Identifier)
  .forEach(function(path) {
    // do something with path
  });
```

The [`jscodeshift(src).find` method](https://crguezl.github.io/jscodeshift-api-docs/collections_Node.js.html#line32) has two parameters `type` and `filter`. 

The `type` parameter is a `predicateType` object:

```js
{
    "name": "Name of the node",
    "kind": "PredicateType",
    "predicate": function(value, deep) { ... }
}
```

The `filter` parameter is optional and is a function or a Node. Not used in the former example.
Here is an example of transformation using a filter:

```js
export default (fileInfo, api) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);
    const callExpressions = root.find(j.CallExpression, 
        { // filter 
            callee: {
                type: 'MemberExpression',
                object: { type: 'Identifier', name: 'console' },
            },
        }
    );
    callExpressions.remove();
    return root.toSource();
}
```

::: danger jscodeshift Lowercase vs Uppercase fields

If you access a `jscodeshift` field starting with lowercase like `j.callExpression, it will return a **build** instance.

If you access a `jscodeshift` field starting with uppercase, it will return a **predicate** which  is used to filter and check nodes.
:::

The call `root.find(j.CallExpression` returns a collection of [nodepaths][] containing just the nodes that are `CallExpressions`. Without the second `filter` option, The  `find`  would not just find the console `CallExpressions`, it would find every `CallExpression` in the source. To force greater specificity, we provide a second argument to `.find`: An object of additional parameters, specifying that we want the `callee`  to be a `MemberExpression`  and the object to be an `Identifier` with `name` equal to `console`. 

See the full example in the folder `remove-calls-to-console` of the repo [crguezl/hello-jscodeshift](https://github.com/crguezl/hello-jscodeshift/tree/master/remove-calls-to-console)

See the code of the class `Collection` in file [Collection.js](https://github.com/facebook/jscodeshift/blob/main/src/Collection.js) and the API docs in [Class: Collection](https://crguezl.github.io/jscodeshift-api-docs/Collection.html) docs. 

See its [extensions](https://github.com/facebook/jscodeshift/blob/main/src/collections).

## Extensibility

jscodeshift provides [an API to extend collections](https://crguezl.github.io/jscodeshift-api-docs/global.html#registerMethods). By moving common operators
into helper functions (which can be stored separately in other modules), a
transform can be made more readable.

There are two types of extensions: 
1. generic extensions and 
2. type-specific extensions. 
 
**Generic extensions** are applicable to all [collections][]. As such,
they typically don't access specific node data, but rather traverse the AST from
the nodes in the collection. 

**Type-specific** extensions work only on specific
node types and are not callable on differently typed [collections][].

### jscodeshift.registerMethods Examples

Adding a method to all `Identifiers`

```js{7}
jscodeshift.registerMethods({
  logNames: function() {
    return this.forEach(function(path) {
      console.log(path.node.name);
    });
  }
}, jscodeshift.Identifier);
```

Inside the `logNames` function `this` refers to the current Collection.

Here is another example adding a method to all `[collections][]`

```js
jscodeshift.registerMethods({
  findIdentifiers: function() {
    return this.find(jscodeshift.Identifier);
  }
});
``` 

Then we can use them this way:

```js
jscodeshift(ast).findIdentifiers().logNames();
jscodeshift(ast).logNames(); // error, unless `ast` only consists of Identifier nodes
```

See an [example](register-method-examples)


## Passing options to [recast]

You may want to change some of the output settings (like setting `'` instead of `"`).
This can be done by passing config options to [recast].

```js
.toSource({quote: 'single'}); // sets strings to use single quotes in transformed code.
```

You can also pass options to recast's `parse` method by passing an object to
jscodeshift as second argument:

```js
jscodeshift(source, {...})
```

More on config options [here](https://github.com/benjamn/recast/blob/52a7ec3eaaa37e78436841ed8afc948033a86252/lib/options.js#L61)


## Unit Testing

Véase la sección [Unit Testing](jscodeshift-testing)

## Examples from  *Write Code to Rewrite Your Code: jscodeshift* tutorial


Read the tutorial at <a href="https://www.toptal.com/javascript/write-code-to-rewrite-your-code" target="_blank">Write Code to Rewrite Your Code: jscodeshift</a> Examples: removing console.log, replacing imported method calls, from positional parameters to parameter object 

### Remove calls to console

Here you have the code of the example [remove calls to console](https://github.com/crguezl/hello-jscodeshift/tree/master/remove-calls-to-console).

**Exercise** 

Write a transformation `remove-console-logs.js` that only removes `console.logs` but not `console.warn` and others

### Replacing imported method calls

Here is the code of the example [Replacing imported method calls](https://github.com/crguezl/hello-jscodeshift/tree/master/replacing-imported-method-calls)

### From positional parameters to parameter object

Code for the example [From positional parameters to parameter object](https://github.com/crguezl/hello-jscodeshift/tree/master/signature-change)

## Example inserting console.log at the beginning of a function

See the code at the folder [crguezl/hello-jscodeshift/prefix-functions](https://github.com/crguezl/hello-jscodeshift/tree/master/prefix-functions) in the `master` branch


## Trailing Commas

- [crguezl/learning-jscodeshift/transforms/trailing-commas.js](https://github.com/crguezl/learning-jscodeshift/blob/master/transforms/trailing-commas.js),
forked from [js-codemod](https://github.com/cpojer/js-codemod/) - Codemod scripts to transform code to next generation JS.

## Example FunctionExpression to an ArrowFunctionExpression

- [FunctionExpression to an ArrowFunctionExpression when safe to do so](https://github.com/crguezl/hello-jscodeshift/tree/master/function-expression-to-arrow-expression)

## Other Examples

- [react-codemod](https://github.com/reactjs/react-codemod) - React codemod scripts to update React APIs.
- [js-transforms](https://github.com/jhgg/js-transforms) - Some documented codemod experiments to help you learn.

## JsCodeShift Documentation 

See [jscodeshift wiki: documentation](https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation)
and [crguezl/jscodeshift-api-docs](https://crguezl.github.io/jscodeshift-api-docs/index.html) deployment


## Recipes

- [Retain leading comment(s) in file when replacing/removing first statement](recipes/retain-first-comment)

!!!include(includes/jscodeshift-links.md)!!!

## References

See the section [references about AST transformations](tree-transformations-references) 