---
prev: /temas/tree-transformations/jscodeshift-recast.md
next: /temas/tree-transformations/jscodeshift-transformation-module.md
---

# jscodeshift 

## Codemods and Code Refactoring

[Codemod](https://github.com/facebookarchive/codemod) was a tool/library developed by FaceBook to assist with **large-scale codebase refactors** that can be partially automated but still required human oversight and occasional intervention. It is now deprecated and archived. 

::: tip Definition: Code refactoring
[Code refactoring](https://en.wikipedia.org/wiki/Code_refactoring) is the process of restructuring existing computer code—changing the factoring—without changing its external behavior.
:::

**Example:** 

Let's say you're deprecating your use of the `<font>` tag.  From the command line, you might make progress by running:

    codemod -m -d /home/jrosenstein/www --extensions php,html \
        '<font *color="?(.*?)"?>(.*?)</font>' \
        '<span style="color: \1;">\2</span>'

For each match of the regex, you were shown a colored diff, and asked if you want to accept the change (the replacement of the `<font>` tag with a `<span>` tag), reject it, or edit the line in question in your `$EDITOR` of choice.

::: tip Codemod Definition
**Codemods are scripts used to rewrite other codes**. Think of them as a find and replace functionality that can read and write code. You can use them to 
1. update source code to fit a team’s coding conventions, 
2. make widespread changes when an API is modified, or 
3. auto-fix existing code when your public package makes a breaking change
:::

## Introduction to JSCodeShift

jscodeshift is a toolkit for running *codemods* over multiple JavaScript or
TypeScript files.
It provides:

- A runner, which executes the provided transform for each file passed to it.
  It also outputs a summary of how many files have (not) been transformed.
- A wrapper around [recast][], providing a different API.  Recast is an
  AST-to-AST transform tool and also tries to preserve the style of original code
  as much as possible.



<a href="https://github.com/facebook/jscodeshift" target="_blank">JSCodeshift</a> is a toolkit for running [codemods](jscodeshift#codemods) over multiple JavaScript or
TypeScript files. The interface that jscodeshift provides is a wrapper around [recast](#recast) and [ast-types][] packages. 

![jscodeshift and recast relation image](/images/jscodeshift-recast-phases.png)

The jscodeshift toolkit allows you to pump a bunch of source files through a transform and replace them with what comes out the other end. 

Inside the transform, you 

1. parse the source into an abstract syntax tree (AST), 
2. poke around to make your changes, 
3. then regenerate the source from the altered AST.

The interface that jscodeshift provides is a wrapper around [recast](https://github.com/benjamn/recast) and [ast-types][] packages. [recast](https://github.com/benjamn/recast) handles the conversion from source to AST and back while [ast-types][] handles the low-level interaction with the AST nodes.


```
jscodeshift -t some-transform.js input-file.js -d -p
```

This will run `input-file.js` through the transform `some-transform.js` and 
print the results without altering the file.


We can install it globally:

```
$ npm install -g jscodeshift
```

For example, the following transformation in file [hello-jscodeshift.js](https://github.com/crguezl/hello-jscodeshift/blob/master/hello-jscodeshift.js):

```js
module.exports = function(fileInfo, api, options) {
    return api.jscodeshift(fileInfo.source)
      .findVariableDeclarators('foo')
      .renameTo('bar')
      .toSource();
  }
```

Changes all the apearances of variable `foo` to `bar`. See the following execution:

```
➜  hello-jscodeshift git:(master) ✗ cat foo.js 
var foo = 4;%                                                                                                                   
➜  hello-jscodeshift git:(master) ✗ jscodeshift -t hello-jscodeshift.js foo.js 
Processing 1 files... 
Spawning 1 workers...
Sending 1 files to free worker...
All done. 
Results: 
0 errors
0 unmodified
0 skipped
1 ok
Time elapsed: 0.947seconds 
➜  hello-jscodeshift git:(master) ✗ cat foo.js 
var bar = 4;
```

## Install

Get jscodeshift from [npm][]:

```
$ npm install -g jscodeshift
```

This will install the runner as `jscodeshift`.

## Usage from the Command Line 

The CLI provides the following options:

```
$ jscodeshift --help

Usage: jscodeshift [OPTION]... PATH...
  or:  jscodeshift [OPTION]... -t TRANSFORM_PATH PATH...
  or:  jscodeshift [OPTION]... -t URL PATH...
  or:  jscodeshift [OPTION]... --stdin < file_list.txt

Apply transform logic in TRANSFORM_PATH (recursively) to every PATH.
If --stdin is set, each line of the standard input is used as a path.

Options:
"..." behind an option means that it can be supplied multiple times.
All options are also passed to the transformer, which means you can supply custom options that are not listed here.

      --(no-)babel              apply babeljs to the transform file
                                (default: true)
  -c, --cpus=N                  start at most N child processes to process source files
                                (default: max(all - 1, 1))
  -d, --(no-)dry                dry run (no changes are made to files)
                                (default: false)
      --extensions=EXT          transform files with these file extensions (comma separated list)
                                (default: js)
  -h, --help                    print this help and exit
      --ignore-config=FILE ...  ignore files if they match patterns sourced from a configuration file (e.g. a .gitignore)
      --ignore-pattern=GLOB ...  ignore files that match a provided glob expression
      --parser=babel|babylon|flow|ts|tsx  the parser to use for parsing the source files
                                          (default: babel)
      --parser-config=FILE      path to a JSON file containing a custom parser configuration for flow or babylon
  -p, --(no-)print              print transformed files to stdout, useful for development
                                (default: false)
      --(no-)run-in-band        run serially in the current process
                                (default: false)
  -s, --(no-)silent             do not write to stdout or stderr
                                (default: false)
      --(no-)stdin              read file/directory list from stdin
                                (default: false)
  -t, --transform=FILE          path to the transform file. Can be either a local path or url
                                (default: ./transform.js)
  -v, --verbose=0|1|2           show more information about the transform process
                                (default: 0)
      --version                 print version and exit
      --fail-on-error           return a 1 exit code when errors were found during execution of codemods
```

The next section explains the structure of the transform module.

## Usage from JS Source

Here is an example:

```js
➜  hello-jscodeshift git:(master) ✗ cat use-jscodeshift.js 
const path = require('path');
const { run: jscodeshift } = require("jscodeshift/src/Runner");

const transformPath = path.join(__dirname, "hello-jscodeshift.js");
const paths = ["foo.js", "foo2.js"];
const options = {
  dry: true, // dry run (no changes are made to files)
  print: true, // print transformed files to stdout, useful for development
  verbose: 2, // show more information about the transform process (up to 2)
};

async function run() {
  const res = await jscodeshift(transformPath, paths, options);
  console.log(res);
}

run();
```
Here is the result of executing it with input files [foo.js](https://github.com/crguezl/hello-jscodeshift/blob/master/foo.js) and [foo2.js](https://github.com/crguezl/hello-jscodeshift/blob/master/foo2.js):

```
➜  hello-jscodeshift git:(master) node use-jscodeshift.js 
Processing 2 files... 
Running in dry mode, no files will be written! 
hello world!
var bar = 4;
console.log(bar*bar /* square foo */);
console.log("more foo");
 OKK foo2.js
hello world!
var bar = 4;
console.log(bar+bar /* twice foo */);
console.log("foo");
 OKK foo.js
All done. 
Results: 
0 errors
0 unmodified
0 skipped
2 ok
Time elapsed: 0.628seconds 
{
  stats: {},
  timeElapsed: '0.628',
  error: 0,
  ok: 2,
  nochange: 0,
  skip: 0
}
```


## How to write the transformation module

See section [How to write the transformation module](jscodeshift-transformation-module)

## The jscodeshift API

See section [The jscodeshift API](jscodeshift-api)


[npm]: https://www.npmjs.com/
[Mozilla Parser API]: https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
[recast]: https://github.com/benjamn/recast
[ast-types]: https://github.com/benjamn/ast-types
[ast-explorer]: http://astexplorer.net/


## References

See the section [references about AST transformations](tree-transformations-references) 