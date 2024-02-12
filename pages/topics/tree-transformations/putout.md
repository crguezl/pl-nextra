# putout 

🐊**Putout** is a pluggable and configurable code transformer based on **Babel** with built-in **ESLint**. It is an alternative to [JSCodeShift](jscodeshift)

It has [a lot of transformations](https://github.com/coderaiser/putout#-built-in-transformations) that will keep your codebase in a clean state, removing any code smell and making code readable according to best practices.

The main target is **JavaScript**, but it also understand these other languages:

- JSX;
- TypeScript;
- Flow;
- Yaml;
- Markdown;
- JSON;
- Ignore;

The name `putout` strikes me, but it is well explained in the `putout` README file:

> **Perfection is finally attained not when there is no longer anything to add,
> but when there is no longer anything to take away.**
>
> **(c) Antoine de Saint Exupéry**

and so the idea is "to put out everything from `putout` until there is no longer anything to put out*".

or as Blaise Pascal would say if he were alive today:

> **I’m sorry I wrote you such a long program. I didn’t have time to write a shorter one** 
 
But why a cocodrile ![putout](https://raw.githubusercontent.com/coderaiser/putout/50a3316178815535349308d0d5bd3188e6f07f2a/images/putout-logo.svg)
as logo?



## putout Help

```
➜  putout-hello git:(master) npx putout -h 
Usage: putout [options] [path]
Options: 
   -h, --help                  display this help and exit
   -v, --version               output version information and exit
   -f, --format [formatter]    use a specific output format, the default is: 'progress-bar' localy and 'dump' on CI
   -s, --staged                add staged files when in git repository
   --fix                       apply fixes of errors to code
   --fix-count [count = 10]    count of fixes rounds
   --rulesdir                  use additional rules from directory
   --transform [replacer]      apply Replacer, for example 'var __a = __b -> const __a = __b', read about Replacer https://git.io/JqcMn
   --plugins [plugins]         a comma-separated list of plugins to use
   --enable [rule]             enable the rule and save it to '.putout.json' walking up parent directories
   --disable [rule]            disable the rule and save it to '.putout.json' walking up parent directories
   --enable-all                enable all found rules and save them to '.putout.json' walking up parent directories
   --disable-all               disable all found rules (set baseline) and save them to '.putout.json' walking up parent directories
   --match [pattern]           read .putout.json and convert 'rules' to 'match' according to 'pattern'
   --flow                      enable flow
   --fresh                     generate a fresh cache
   --no-config                 avoid reading '.putout.json'
   --no-ci                     disable the CI detection
   --no-cache                  disable the cache
```

## Installation and Versions

Be sure to have one of the latest versions of node before installing it:

```
➜  putout-hello node --version
v18.0.0
➜  putout-hello git:(master) npm i putout -D
➜  putout-hello git:(master) npx putout --version
v25.14.3
```

## Transforming a program 

Consider the input program:

```
➜  src git:(main) ✗ cat putout-hello/index.js 
```

```js
const unused = 5;

module.exports = function() {
    return promise();
};

async function promise(a) {
    return Promise.reject(Error('x'));
```


## Fixing a program with --fix

Let us activate all the rules:

```
➜  putout-hello git:(master) ✗ npx putout --enable-all .
``` 

Then `npx putout inputs/index.js` will produce something similar to the following diagnostics:

``` 
➜  putout-hello git:(master) ✗ npx putout inputs/index.js 
/Users/casianorodriguezleon/campus-virtual/2122/learning/compiler-learning/putout-learning/putout-hello/inputs/index.js
 1:6   error   'unused' is defined but never used                       remove-unused-variables          
 7:23  error   'a' is defined but never used                            remove-unused-variables          
 3:0   error   ESM should be used insted of Commonjs                    convert-commonjs-to-esm/exports  
 3:0   error   Arrow functions should be used                           convert-to-arrow-function        
 1:0   error   'use strict' directive should be on top of CommonJS      strict-mode/add                  
 8:4   error   Reject is useless in async functions, use throw instead  promises/convert-reject-to-throw 
 4:11  error   Call async functions using 'await'                       promises/add-missing-await       
 7:0   error   Avoid useless async                                      promises/remove-useless-async    

✖ 8 errors in 1 files
  fixable with the `--fix` option
```

If we add the `--fix` option, the program is transformed onto:

``` 
➜  putout-hello git:(master) ✗ npx putout --fix inputs/index.js
/Users/casianorodriguezleon/campus-virtual/2122/learning/compiler-learning/putout-learning/putout-hello/inputs/index.js
 3:0  error   CommonJS should be used insted of ESM  convert-esm-to-commonjs         
 0:0  error   ESM should be used insted of Commonjs  convert-commonjs-to-esm/exports 
 0:0  error   ESM should be used insted of Commonjs  convert-commonjs-to-esm/exports 
✖ 3 errors in 1 files
  fixable with the `--fix` option
``` 

```js
➜  putout-hello git:(master) ✗ cat inputs/index.js 
'use strict';

module.exports = async () => await promise();

function promise() {
    return Promise.reject(Error('x'));
}
```

Let us restore the original version:

```
➜  putout-hello git:(master) ✗ git restore inputs/index.js 
```


## Disable/enable rules

When you need to change [configuration](#-configuration) file use **Ruler** instead of editing the file manually.

There are three command line options related with disabling and enabling rules:

*  `--disable [rule]`
   *  disable the rule and save it to `.putout.json` walking up parent directories
*  `--enable-all`
   *  enable all found rules and save them to `.putout.json` walking up parent directories
* `--disable-all`
  *  disable all found rules (set baseline) and save them to `.putout.json` walking up parent directories

Here is an example:

```
➜  putout-hello git:(master) ✗ npx putout --disable-all inputs/index.js 
/Users/casianorodriguezleon/campus-virtual/2122/learning/compiler-learning/putout-learning/putout-hello/inputs/index.js
 1:6   error   'unused' is defined but never used                       remove-unused-variables          
 7:23  error   'a' is defined but never used                            remove-unused-variables          
 3:0   error   CommonJS should be used insted of ESM                    convert-esm-to-commonjs          
 8:4   error   Reject is useless in async functions, use throw instead  promises/convert-reject-to-throw 
 4:11  error   Call async functions using 'await'                       promises/add-missing-await       
 7:0   error   Avoid useless async                                      promises/remove-useless-async    

✖ 6 errors in 1 files
  fixable with the `--fix` option
``` 

You have to provide always a file or a folder when using a ruler toggler option:

```
➜  putout-hello git:(master) ✗ npx putout --disable-all     
🐊 `path` is missing for ruler toggler (`--enable-all`, `--disable-all`)
```

## The configuration file .putout.json

The configuration file has been modified by the previous command:

```json
➜  putout-hello git:(master) ✗ cat .putout.json 
{
    "rules": {
        "remove-unused-variables": "off",
        "convert-to-arrow-function": "off",
        "strict-mode/add": "off",
        "promises/convert-reject-to-throw": "off",
        "promises/add-missing-await": "off",
        "promises/remove-useless-async": "off"
    }
}
```

Disabling a rule seems to works like that: 

Wherever the folder `putout`  is visiting, if there is a file there, whose name matches one of the deactivated keys inside the  `"rules"` section, that transformation file will be ignored.  

For example, even if I have in one of the folders `putout`  is searching for transformations a file with name `"xxxx-remove-unused-variables-yyy.js"` it will be ignored since it matches the first entry.


Using this `.putout.json` file  you can overwrite any of the [default options](https://github.com/coderaiser/putout/blob/master/packages/putout/putout.json)


## Modifying the configuration file 

```
npx putout index.js --enable convert-commonjs-to-esm
```

```{12}
➜  putout-hello git:(master) ✗ git -P diff .putout.json
diff --git a/.putout.json b/.putout.json
index c8b3105..27d6b38 100644
--- a/.putout.json
+++ b/.putout.json
@@ -5,6 +5,7 @@
         "strict-mode/add": "off",
         "promises/convert-reject-to-throw": "off",
         "promises/add-missing-await": "off",
-        "promises/remove-useless-async": "off"
+        "promises/remove-useless-async": "off",
+        "convert-commonjs-to-esm": "on"
     }
 }
\ No newline at end of file
```

## Converting CommonJS module to ESM module

Assuming the previous `.putout.son` file where `"convert-commonjs-to-esm": "on"`, if I run `putout --fixed`, it doesn't fix the program:

```
➜  putout-hello git:(master) ✗ npx putout --fix index.js
/Users/casianorodriguezleon/campus-virtual/2122/learning/compiler-learning/putout-learning/putout-hello/index.js
 3:0  error   CommonJS should be used insted of ESM  convert-esm-to-commonjs         
 0:0  error   ESM should be used insted of Commonjs  convert-commonjs-to-esm/exports 
 0:0  error   ESM should be used insted of Commonjs  convert-commonjs-to-esm/exports 

✖ 3 errors in 1 files
  fixable with the `--fix` option
```

I have to edit the `package.json` and modify the `type`:

```{11}
➜  putout-hello git:(master) ✗ code package.json 
➜  putout-hello git:(master) ✗ git -P diff package.json
diff --git a/package.json b/package.json
index 743967d..91cba11 100644
--- a/package.json
+++ b/package.json
@@ -3,6 +3,7 @@
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
+  "type": "module",
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
   },
```

If I run `putout` again, it fixes the program:

```
➜  putout-hello git:(master) ✗ npx putout --fix index.js
```

Here is the result:

```js
➜  putout-hello git:(master) ✗ cat index.js
const unused = 5;

export default function() {
    return promise();
};

async function promise(a) {
    return Promise.reject(Error('x'));
}
```

If you  have `.cjs` or `.mjs` files, they will be converted automatically to `CommonJS` and `ESM` accordingly.

### Converting a whole folder 

In case of `src` directory, it will look like:

```sh
putout src --disable-all && putout src --enable convert-commonjs-to-esm && putout src --fix
```

This command will

1. **disable all rules** that **Putout** can find right now and 
2. **enable** a single rule. 

## Fixing a program with putout from a program: The API

Putout supports dynamic loading of plugins from `node_modules`. 

Let's consider the example of using the [remove-unused-variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables/README.md#readme) plugin:


```js
➜  putout-hello git:(master) ✗ cat use-putout.js 
import putout from 'putout';
const source = `
    const hello = 'world';
    const hi = 'there';
    
    console.log(hello);
`;

let result = putout(source, {
    plugins: [
        'remove-unused-variables',
    ],
});
console.log(result);
```

```js                                                                                           
➜  putout-hello git:(master) ✗ node use-putout.js   
{
  code: "\n    const hello = 'world';\n\n    console.log(hello);\n",
  places: []
}
```

As you see, `places` is empty, but the code is changed: there is no `hi` variable.

## Not Fixing the program: The API

From the beginning, Putout developed with ability to split the main process into two concepts: 

* `find` (find places that could be fixed) and 
* `fix` (apply the fixes to the files)
  
It is therefore easy to find sections that could be fixed.

In the following example unused variables are found but 
without making changes to the source file:


```js
➜  putout-hello git:(master) cat use-putout-no-fix.js 
#!/usr/bin/env node
import putout from 'putout';
const source = `
    const hello = 'world';
    const hi = 'there';
    
    console.log(hello);
`;

let result = putout(source, {
    fix: false,
    plugins: [
        'remove-unused-variables',
    ],
});

console.log(JSON.stringify(result, null, 2));
```

```js
➜  putout-hello git:(master) ./use-putout-no-fix.js
{
  "code": "\n    const hello = 'world';\n    const hi = 'there';\n    \n    console.log(hello);\n",
  "places": [
    {
      "rule": "remove-unused-variables",
      "message": "'hi' is defined but never used",
      "position": {
        "line": 3,
        "column": 10
      }
    }
  ]
}
```

## Built-in Transformations

```js
➜  putout-hello git:(master) ✗ cat debugger-example.js
let a = 4;
debugger;
console.log(a);
➜  putout-hello git:(master) ✗ npx putout --disable remove-console                                               
➜  putout-hello git:(master) ✗ npx putout --transform 'debugger' --fix debugger-example.js 
➜  putout-hello git:(master) ✗ cat debugger-example.js                                    
let a = 4;
console.log(a);% 
```

## User Transformations --rulesdir

When you have rules related to your project and you don't want to publish them (because it cannot be reused right now). Use [`rulesdir`](https://github.com/coderaiser/putout/tree/master/rules):

```sh
putout --rulesdir ./rules
```

This way you can keep rules specific for your project and run them on each lint.

If you want to exclude file from loading, add prefix `not-rule-` and Putout will ignore it (in the same way as he does for `node_modules`).

Here is an example:

```
➜  putout-hello git:(master) ✗ npx putout --rulesdir ./transforms  --fix input-for-remove-debugger.js 
```

where the file `transforms/remove-debugger.js` has:

```js
// this is a message to show in putout cli
module.exports.report = () => 'Unexpected "debugger" statement';

// let's find all "debugger" statements and replace them with ""
module.exports.replace = () => ({
    debugger: '',
});
```

Of course the `package.json` has to have `type` to `commonjs`.

And the initial contents of `input-for-remove-debugger.js` are:

```js
console.log("hello");
debugger;
console.error("hello");
```

and the final contents are:

```js
➜  putout-hello git:(master) ✗ cat input-for-remove-debugger.js                                      
console.log("hello");
console.error("hello");
``` 

## User Transformations `~/.putout`

Let us write this transformation:

```js
➜  putout-hello git:(master) ✗ cat my-transform.js 
// Copy this file to ~/.putout
module.exports.report = () => `Repeated expressions in sums are transformed onto multiplication.`;

module.exports.replace = () => ({
    '__b + __b': '2 * __b'
});
```

`putout` supports `codemodes` in a way similar to plugins. 

Just create a directory `~/.putout` and put your plugins there:

```
➜  putout-hello git:(master) ✗ mkdir ~/.putout
➜  putout-hello git:(master) ✗ cp my-transform.js ~/.putout
➜  putout-hello git:(master) ✗ ls -ltr ~/.putout 
total 8
-rw-r--r--  1 casianorodriguezleon  staff  142 21 abr 13:40 my-transform.js
``` 

Now we run the transformation:

```
➜  putout-hello git:(master) ✗ npx putout --fix input-for-my-transform.js
```

Where the initial contents of the file `input-for-my-transform.j` are:

```js
➜  putout-hello git:(master) ✗ cat input-for-my-transform.js 
let a = 4;
function f(x) {
  let y = x + x;
  let z = y + y * 3; // Will it work?
  return y + z;
}
```

transforming the file `input-for-my-transform.js` onto:

```js
➜  putout-hello git:(master) ✗ cat input-for-my-transform.js 
let a = 4;
function f(x) {
  let y = 2 * x;
  let z = y + y * 3; // Will it work?
  return y + z;
}
2 * f(a);
```

## PutoutScript: a Language to Describe AST transformations

The expressions used in transformers like:

```js
module.exports.replace = () => ({
    'let __a = __b': 'const __b = __a'
});
``` 

are examples of the *PutoutScript* language. [PutoutScript](putout-script) is a JavaScript compatible language which adds additional meaning to `Identifiers` in AST-template. 

Variables look like `__a`, `__b` are an example of [Template Variables](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#template-variables). 

**They begin with a `__` and can only contain one character**.

Template variables are an abstraction to match code when you don’t know the value or contents ahead of time, *similar to capture groups in regular expressions*.

Template variables can be used to track values across a specific code scope. 

This includes 

- variables, 
- functions, 
- arguments, 
- classes, 
- object methods, 
- imports 

and more.


[PutoutScript](putout-script) is supported by all types of [Putout plugins](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#supported-plugin-types).

Take a look at [rule syntax](https://github.com/coderaiser/putout/tree/master/packages/compare#supported-template-variables) for more information.

In the command line, patterns are specified with a flag `--transform`.

## Plugin Types: Replacer

The simplest **Putout** plugin type, consists of a module that exports two functions:

- `report` - reports an error message to `putout` cli;
- `replace` - replace `key` template into `value` template;



Here is an example:

```
➜  putout-hello git:(master) cat transforms/replace-check-property.js 
```
```js
module.exports.report = () => 'use optional chaining';
module.exports.replace = () => ({
    '__a && __a.__b': '__a?.__b',
});
```

This plugin will find and suggest to replace all occurrences of code: `object && object.property` into `object?.property`.

Given the input:

```                                                                                                       
➜  putout-hello git:(master) cat input-for-replace-check-property.js 
```

```js
let a = {x : 1}

if (a && a.x) {
    console.log(a.x);
}
```

when executed:

```                                                                                                        
➜  putout-hello git:(master) npx putout --rulesdir ./transforms  --fix input-for-replace-check-property.js
```

produces:

```
➜  putout-hello git:(master) ✗ cat input-for-replace-check-property.js
```

```js
let a = {x : 1}

if (a?.x) {
    console.log(a.x);
}
```

## Plugin Types: Includer

The Putout plugin system is simple, and very similar to the eslint plugins , as well as the babel plugins.

Instead of one function, the Putout plugin should export 3. 

It should be a module exporting two functions:

- `report` - returns error message to `putout` cli;
- `fix` - fixes paths using `places` array received using `find` function;

and one or more of this:

- `filter` - filter path, should return `true`, or `false` (don't use with `traverse`);
- `include` - returns array of templates, or node names to include;
- `exclude` - returns array of templates, or node names to exclude;

Here is an example:

```
➜  putout-hello git:(master) ✗ cat plugin-type-includer/remove-chazam.js 
```

```js
module.exports.report = () => 'remove debugger statements';
module.exports.include = () => [ 'debugger', ];
module.exports.fix = (path) => { path.remove(path); };
```
Observe that the file has name `remove-chazam.js` 

and that:

```js
➜  putout-hello git:(master) ✗ grep remove-d .putout.json
        "remove-debugger": "off",
```

Here is an execution. We see it is applied:

```js
➜  putout-hello git:(master) ✗ cat input-for-remove-debugger.js 
console.log("hello");
debugger;
console.error("hello");                                                                                  
➜  putout-hello git:(master) ✗ npx putout --rulesdir plugin-type-includer  --fix input-for-remove-debugger.js
➜  putout-hello git:(master) ✗ cat input-for-remove-debugger.js
console.log("hello");
console.error("hello");
```

Here is a similar example using `fix`:

```js 
➜  putout-hello git:(master) ✗ cat fix-example/remove-chazam.js 
module.exports.report = () =>'Unexpected "debugger" statement';

module.exports.find = (ast, {traverse}) => {
    const places = [];
    traverse(ast, {
        DebuggerStatement(path) {
            places.push(path);
        }
    });
    return places;
};

module.exports.fix = (path) => {
    path.remove();
};
```

```js
➜  putout-hello git:(master) ✗ cat input-for-remove-debugger.js                                     
console.log("hello");
debugger;
console.error("hello");                                                                                   
➜  putout-hello git:(master) ✗ npx putout --rulesdir fix-example  --fix input-for-remove-debugger.js
➜  putout-hello git:(master) ✗ cat input-for-remove-debugger.js                                     
console.log("hello");
console.error("hello");
```

## A Plugin to remove unreachable code

```js 
➜  putout-hello git:(master) ✗ cat rem-unr/rem-unrech-vod.js 
'use strict';

const {types} = require('putout');
const {isFunctionDeclaration} = types;

module.exports.report = () => `Unreachable code`;

module.exports.fix = ({siblings}) => {
    for (const sibling of siblings) {
        sibling.remove();
    }
};

module.exports.traverse = ({push}) => ({
    'ReturnStatement|ThrowStatement'(path) {
        const siblings = path.getAllNextSiblings();
        
        if (!siblings.length)
            return;
        
        if (siblings.find(isFunctionDeclaration))
            return;
        
        push({
            path: siblings[0],
            siblings,
        });
    },
});
```

See [Get Sibling Paths](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#get-sibling-paths) at [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#babel-plugin-handbook)


```js
➜  putout-hello git:(master) ✗ cat input-remove-unreachable-code.js 
function tutu() {
    const a = 4;
    const b = 5;
    return a + b;
    const c = 6;
    const d = 7;
}
➜  putout-hello git:(master) ✗ npx putout --rulesdir rem-unr  --fix input-remove-unreachable-code.js
➜  putout-hello git:(master) ✗ cat input-remove-unreachable-code.js                                 
function tutu() {
    const a = 4;
    const b = 5;
    return a + b;
}
```

```
➜  putout-hello git:(master) ✗ grep unreach .putout.json 
        "remove-unreachable-code": "off"
```

## Plugins

See section [Plugins](putout-plugins)

## Architecture

See section [Architecture](architecture)

## Built-in Transformations

See section [Built-in Transformations](/temas/tree-transformations/putout-builtin-transformations)

## References

* [Repo crguezl/learning-putout](https://github.com/crguezl/learning-putout) with the examples of this lesson
* [Putout Editor](https://putout.cloudcmd.io/) Editor with the same AST-explorer UI to test transformations
* [Practical application of transformation of AST-trees on the example of Putout](https://sudonull.com/post/786-Practical-application-of-transformation-of-AST-trees-on-the-example-of-Putout) SUDONULL tutorial
* [🦎 PutoutScript](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript)
* [Revealing the magic of AST by writing babel plugins](https://dev.to/viveknayyar/revealing-the-magic-of-ast-by-writing-babel-plugins-1h01). Vivek Nayyar. Posted on Mar 5, 2021. Updated on Mar 6, 2021
* Read [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
* To understand how things works from the inside take a look at [Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler).

