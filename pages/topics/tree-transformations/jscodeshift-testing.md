---
prev: /topics/tree-transformations/jscodeshift-api.md
next: /topics/tree-transformations/jscodeshift.md
---
# Unit Testing jscodeshift Transformations

jscodeshift comes with a simple utility to allow easy unit testing with [Jest](https://facebook.github.io/jest/), without having to write a lot of boilerplate code. This utility makes some assumptions in order to reduce the amount of configuration required:

 - The test is located in a subdirectory under the directory the transform itself is located in (eg. `__tests__`)
 - Test fixtures are located in a `__testfixtures__` directory

This results in a directory structure like this:

```
/MyTransform.js
/__tests__/MyTransform-test.js
/__testfixtures__/MyTransform.input.js
/__testfixtures__/MyTransform.output.js
```

A simple example of unit tests is bundled in the [sample directory][sample].

The [testUtils module][testutil] exposes a number of useful helpers for unit testing.

## `defineTest`

Defines a Jest/Jasmine test for a jscodeshift transform which depends on fixtures

```js
jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'MyTransform');
```

An alternate fixture filename can be provided as the fourth argument to `defineTest`.
This also means that multiple test fixtures can be provided:

```js
defineTest(__dirname, 'MyTransform', null, 'FirstFixture');
defineTest(__dirname, 'MyTransform', null, 'SecondFixture');
```

This will run two tests:
- `__testfixtures__/FirstFixture.input.js`
- `__testfixtures__/SecondFixture.input.js`

See the example in folder [crguezl/hello-jscodeshift/prefix-functions](https://github.com/crguezl/hello-jscodeshift/tree/master/prefix-functions) in the `master` branch


## `defineInlineTest`

Defines a Jest/Jasmine test suite for a jscodeshift transform which accepts inline values

This is a more flexible alternative to `defineTest`, as this allows to also provide options to your transform

```js
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
const transform = require('../myTransform');
const transformOptions = {};
defineInlineTest(transform, transformOptions, 'input', 'expected output', 'test name (optional)');
```

## `defineSnapshotTest`

Similar to `defineInlineTest` but instead of requiring an output value, it uses Jest's `toMatchSnapshot()`

```js
const defineSnapshotTest = require('jscodeshift/dist/testUtils').defineSnapshotTest;
const transform = require('../myTransform');
const transformOptions = {};
defineSnapshotTest(transform, transformOptions, 'input', 'test name (optional)');
```

For more information on snapshots, check out [Jest's docs](https://jestjs.io/docs/en/snapshot-testing)

## `defineSnapshotTestFromFixture`

Similar to `defineSnapshotTest` but will load the file using same file-directory defaults as `defineTest`

```js
const defineSnapshotTestDefault = require('jscodeshift/dist/testUtils').defineSnapshotTestDefault;
const transform = require('../myTransform');
const transformOptions = {};
defineSnapshotTestFromFixture(__dirname, transform, transformOptions, 'FirstFixture', 'test name (optional)');
```

## `applyTransform`

Executes your transform using the options and the input given and returns the result.
This function is used internally by the other helpers, but it can prove useful in other cases.

```js
const applyTransform = require('jscodeshift/dist/testUtils').applyTransform;
const transform = require('../myTransform');
const transformOptions = {};
const output = applyTransform(transform, transformOptions, 'input');
```

## ES modules

If you're authoring your transforms and tests using ES modules, make sure to import the transform's parser (if specified) in your tests:

```js
// MyTransform.js
export const parser = 'flow'
export default function MyTransform(fileInfo, api) {
  // ...
}
```
```js
// __tests__/MyTransform-test.js
import { defineInlineTest } from 'jscodeshift/dist/testUtils
import * as transform from '../MyTransform

console.log(transform.parser) // 'flow'

defineInlineTest(transform, /* ... */)
```

## References

See the section [references about AST transformations](tree-transformations-references) 

The tutorial [Writing Javascript Codemods and Understanding AST Easily](https://katilius.dev/writing-js-codemods/)
in Arminas Katilius Personal Blog, makes special emphasis in testing with jscodeshift.


[sample]: https://github.com/facebook/jscodeshift/tree/main/sample
[testutil]: https://github.com/facebook/jscodeshift/blob/main/src/testUtils.js

!!!include(includes/jscodeshift-links.md)!!!
