---
prev: /temas/tree-transformations/jscodeshift.md
next: /temas/tree-transformations/jscodeshift-api.md
---
# How to write the transformation module

The transform is simply a module that exports a function of the form:

```js
module.exports = function(fileInfo, api, options) {
  // transform `fileInfo.source` here
  // ...
  // return changed source
  return source;
};
```
Here is an example of transformation module:

```js
✗ cat hello-jscodeshift.js 
/**
 * This replaces every occurrence of variable "foo".
 */
module.exports = function (fileInfo, api, options) {
  return api
    .jscodeshift(fileInfo.source)
    .findVariableDeclarators("foo")
    .renameTo("bar")
    .toSource();
};
```

As of v0.6.1, this module can also be written in TypeScript.

## The Arguments of the Exported Function

### Argument `fileInfo`

Holds information about the currently processed file.

Property    | Description
------------|------------
`path`      | File path
`source`    | File content

### Argument `api`

This object exposes the `jscodeshift` library and helper functions from the
runner.

Property     | Description
-------------|------------
`jscodeshift`| A reference to the jscodeshift library
`stats`      | A function to collect statistics during `--dry` runs
`report`     | Prints the passed string to stdout

`jscodeshift` is a reference to the wrapper around recast and provides a
jQuery-like API to navigate and transform the AST. 

`stats` is a function that only works when the `--dry` options is set. It accepts
a string, and will simply count how often it was called with that value.

At the end, the CLI will report those values. This can be useful while
developing the transform, e.g. to find out how often a certain construct
appears in the source(s).

`report` allows you do print arbitrary strings to stdout. This can be
useful when other tools consume the output of jscodeshift. The reason to not
directly use `process.stdout` in transform code is to avoid mangled output when
many files are processed.

### Argument `options`

Contains all options that have been passed to runner. This allows you to pass
additional options to the transform. For example, if the CLI is called with

```
$ jscodeshift -t myTransforms fileA fileB --foo=bar
```

`options` would contain `{foo: 'bar'}`.

## Return value

The return value of the function determines the status of the transformation:

- If a string is returned and it is different from passed source, the
  transform is considered to be **successful**.
- If a string is returned but it's the same as the source, the transform
  is considered to be **unsuccessful**.
- If nothing is returned, the file is not supposed to be transformed (which is
  ok).

The CLI provides a summary of the transformation at the end. You can get more
detailed information by setting the `-v` option to `1` or `2`.

You can collect even more stats via the `stats` function as explained above.

## Parser

The transform can let jscodeshift know with which parser to parse the source
files (and features like templates).

To do that, the transform module can export `parser`, which can either be one
of the strings `"babel"`, `"babylon"`, `"flow"`, `"ts"`, or `"tsx"`,
or it can be a parser object that is compatible with recast.

For example:

```js
module.exports.parser = 'flow'; // use the flow parser
// or
module.exports.parser = {
  parse: function(source) {
    // return estree compatible AST
  },
};
```

## Example output

```text
$ jscodeshift -t myTransform.js src
Processing 10 files...
Spawning 2 workers with 5 files each...
All workers done.
Results: 0 errors 2 unmodified 3 skipped 5 ok
```


!!!include(includes/jscodeshift-links.md)!!!


## References

See the section [references about AST transformations](tree-transformations-references) 