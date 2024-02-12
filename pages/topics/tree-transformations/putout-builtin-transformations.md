
## 🏨 Built-in transformations

### JavaScript

<details><summary>remove <code>unused variables</code></summary>

```diff
  function show() {
-     const message = 'hello';
      console.log('hello world');
  }
```

</details>

<details><summary>remove duplicates from <code>logical expressions</code></summary>

```diff
-a && b && a
+a && b
```

</details>

<details><summary>remove unused <code>for-of variables</code></summary>

```diff
-for (const {a, b} of c) {
+for (const {a} of c) {
    console.log(a);
}
```

</details>

<details><summary>remove <code>unreferenced variables</code></summary>

```diff
-let a;
- a = 1;
let b;
b = 2;
console.log(b);
```

</details>

<details><summary>remove duplicate <code>keys</code></summary>

```diff
const a = {
-   x: 'hello',
-   ...y,
    x: 'world',
    ...y,
}
```

</details>

<details><summary>remove duplicate <code>case</code></summary>

```diff
switch (x) {
    case 5:
        console.log('hello');
        break;
-   case 5:
-       console.log('zz');
-       break;
}
```

</details>

<details><summary>remove unused <code>private fields</code></summary>

```diff
  class Hello {
    #a = 5;
-   #b = 3;
    get() {
        return this.#a;
    };
}
```

</details>

<details><summary>remove unused <code>expressions</code></summary>

```diff
  function show(error) {
-     showError;
  }
```

</details>

<details><summary>remove useless <code>variables</code></summary>

```diff
-   function hi(a) {
-       const b = a;
    };
+   function hi(b) {
    };
```

</details>

<details><summary>remove useless <code>new</code>(<a href=https://262.ecma-international.org/12.0/#sec-error-constructor>why</a>)</summary>

```diff
-new Error('something when wrong');
+Error('something when wrong');
```

</details>

<details><summary>remove useless <code>constructor</code>(<a href=https://google.github.io/styleguide/tsguide.html#primitive-types-wrapper-classes>why</a>)</summary>

```diff
-const s = String('hello');
+const s = 'hello';
```

</details>

<details><summary>remove useless <code>map</code></summary>

```diff
-const [str] = lines.map((line) => `hello ${line}`);
+const [line] = lines;
+const str = `hello ${line}`;
```

</details>

<details><summary>remove useless <code>continue</code></summary>

```diff
-for (sign = decpt, i = 0; (sign /= 10) != 0; i++)
-    continue;
+for (sign = decpt, i = 0; (sign /= 10) != 0; i++);
```

</details>

<details><summary>remove useless <code>operand</code></summary>

```diff
-a = a + b;
+a += b;
```

</details>

<details><summary>remove useless <code>return</code></summary>

```diff
-module.exports.traverse = ({push}) => {
-    return {
-        ObjectExpression(path) {
-        }
-    }
-};
+module.exports.traverse = ({push}) => ({
+    ObjectExpression(path) {
+    }
+});
```

</details>

<details><summary>remove useless <code>array constructor</code></summary>

```diff
-const a = Array(1, 2, 3);
+const a = [1, 2, 3];
```

</details>

<details><summary>remove useless <code>conditions</code></summary>

```diff
-if (zone?.tooltipCallback) {
-    zone.tooltipCallback(e);
-}
+zone?.tooltipCallback(e);
```

</details>

<details><summary>remove useless <code>type conversion</code></summary>

```diff
-const a = Boolean(b.includes(c));
+const a = b.includes(c);

--if (!!a)
++if (a)
    console.log('hi');

```

</details>

<details><summary>remove useless <code>functions</code></summary>

```diff
-const f = (...a) => fn(...a);
-array.filter((a) => a);

+const f = fn;
+array.filter(Boolean);
```

</details>

<details><summary>remove useless <code>typeof</code></summary>

```diff
- typeof typeof 'hello';
+ typeof 'hello';
```

</details>

<details><summary>declare undefined variables</summary>

```diff
const fs = import 'fs/promises';
const {stub} = import 'supertape';

+const {assign} = Object;

const readFile = stub();

assign(fs, {
    readFile,
});
```

</details>

<details><summary>remove useless <code>arguments</code></summary>

```diff
onIfStatement({
    push,
-   generate,
-   abc,
})

function onIfStatement({push}) {
}
```

</details>

<details><summary>remove useless <code>template expressions</code></summary>

```diff
-let y = `${"hello"} + ${"world"}`;
+let y = `hello + world`;
```

</details>

<details><summary>remove useless <code>for-of</code></summary>

```diff
-for (const a of ['hello']) {
-    console.log(a);
-}
+console.log('hello');
```

</details>

<details><summary>remove useless <code><a href=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries>array.entries()</a></code></summary>

```diff
-for (const [, element] of array.entries()) {
-}
+for (const element of array) {
+}
```

</details>

<details><summary>reuse duplicate<code>init</code></summary>

```diff
const putout = require('putout');
-const {operator} = require('putout');
+const {operator} = putout;
```

</details>

<details><summary>convert <code>assignment</code> to <code>arrow function</code></summary>

```diff
-const createRegExp = (a) = RegExp(a, 'g');
+const createRegExp = (a) => RegExp(a, 'g');
```

</details>

<details><summary>convert <code>assignment</code> to <code>comparison</code></summary>

```diff
-if (a = 5) {
+if (a === 5) {
}
```

</details>

<details><summary>convert <code>quotes</code> to <code>backticks</code></summary>

```diff
-const a = 'hello \'world\'';
+const a = `hello 'world'`;
```

</details>

<details><summary>convert <code>typeof</code> to <code>is type</code></summary>

```diff
+const isFn = (a) => typeof a === 'function';
+
+if (isFn(fn))
-if (typeof fn === 'function')
    fn();
```

</details>

<details><summary>convert <code>bitwise</code> to <code>logical</code></summary>

```diff
-a | !b
+a || !b
```

</details>

<details><summary>convert <code>equal</code> to <code>strict equal</code></summary>

```diff
-if (a == b) {
+if (a === b) {
}
```

</details>

<details><summary>convert <code>indexOf</code> to <code>includes</code></summary>

```diff
-if (~array.indexOf(element)) {
+if (array.includes(element)) {
}
```

</details>

<details><summary>remove useless <code>escape</code></summary>

```diff
-const t = 'hello \"world\"';
-const s1 = `hello \"world\"`;
-const s = `hello \'world\'`;
+const t = 'hello "world"';
+const s1 = `hello "world"`;
+const s = `hello 'world'`;
```

</details>

<details><summary>remove useless <code>Array.from</code></summary>

```diff
-for (const x of Array.from(y)) {}
+for (const x of y) {}
```

</details>

<details><summary>remove useless <code>spread</code></summary>

```diff
-for (const x of [...y]) {}
+for (const x of y) {}
```

</details>

<details><summary>remove <code>debugger</code> statement</summary>

```diff
- debugger;
```

</details>
<details><summary>remove <code>iife</code></summary>

```diff
-(function() {
-    console.log('hello world');
-}());
+console.log('hello world');
```

</details>

<details><summary>remove <code>boolean</code> from <code>assertions</code></summary>

```diff
-if (a === true)
+if (a)
    alert();
```

</details>

<details><summary>remove <code>boolean</code> from <code>logical expressions</code></summary>

```diff
-const t = true && false;
+const t = false;
```

</details>

<details><summary>remove nested blocks</summary>

```diff
for (const x of Object.keys(a)) {
-   {
-       console.log(x);
-   }
+   console.log(x);
}
```

</details>

<details><summary>remove unreachable code</summary>

```diff
function hi() {
    return 5;
-   console.log('hello');
}
```

</details>

<details><summary>split variable declarations</summary>

```diff
-let a, b;
+let a;
+let b;
```

</details>

<details><summary>split nested destructuring</summary>

```diff
-const {a: {b}} = c;
+const {a} = c;
+const {b} = a;
```

</details>

<details><summary>simplify <code>assignment</code></summary>

```diff
-const {a} = {a: 5};
-const [b] = [5];
+const a = 5;
+const b = 5;
```

</details>

<details><summary>simplify <code>logical expressions</code></summary>

```diff
-!(options && !options.bidirectional);
+!options || options.bidirectional;
```

</details>

<details><summary>simplify <code>ternary</code></summary>

```diff
-module.exports = fs.copyFileSync ? fs.copyFileSync : copyFileSync;
+module.exports = fs.copyFileSync || copyFileSync;
```

</details>

<details><summary>remove <code>console.log</code> calls</summary>

```diff
-console.log('hello');
```

</details>

<details><summary>remove empty block statements</summary>

```diff
-if (x > 0) {
-}
```

</details>

<details><summary>remove empty patterns</summary>

```diff
-const {} = process;
```

</details>

<details><summary>remove <code>strict mode</code> directive from esm</summary>

```diff
-'use strict';
-
import * from fs;
```

</details>

<details><summary>Add <code>strict mode</code> directive in <code>commonjs</code> if absent</summary>

```diff
+'use strict';
+
const fs = require('fs');
```

</details>

<details><summary>remove <code>constant conditions</code></summary>

```diff
function hi(a) {
-   if (2 < 3) {
-       console.log('hello');
-       console.log('world');
-   }
+   console.log('hello');
+   console.log('world');
};

function world(a) {
-   if (false) {
-       console.log('hello');
-       console.log('world');
-   }
};
```

</details>

<details><summary>convert <code>esm</code> to <code>commonjs</code> (disabled)</summary>

```diff
-import hello from 'world';
+const hello = require('world');
```

</details>
<details><summary>convert <code>commonjs</code> to <code>esm</code> (disabled)</summary>

```diff
-const hello = require('world');
+import hello from 'world';
```

</details>

<details><summary>convert <code>replace</code> to <code>replaceAll</code> (<a href=https://github.com/tc39/proposal-string-replaceall>stage-4</a>)</summary>

```diff
-'hello'.replace(/hello/g, 'world');
+'hello'.replaceAll('hello', 'world');
```

</details>

<details><summary>apply destructuring</summary>

```diff
-const hello = world.hello;
-const a = b[0];
+const {hello} = world;
+const [a] = b;
```

</details>

<details><summary>apply <code>await import</code></summary>

```diff
-const {readFile} = import('fs/promises');
+const {readFile} = await import('fs/promises');
```

</details>

<details><summary>apply <code>if condition</code></summary>

```diff
-if (2 > 3);
+if (2 > 3)
    alert();
```

</details>

<details><summary>apply <code><a href=https://web.mit.edu/jwalden/www/isArray.html>isArray</a></code></summary>

```diff
-x instanceof Array;
+Array.isArray(x);
```

</details>

<details><summary>apply <code>Array.at</code>(<a href=https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md#2021-07-29-version-1660-current-bethgriggs>not bundled</a>)</summary>

```diff
-const latest = (a) => a[a.length - 1];
+const latest = (a) => a.at(-1);
```

</details>

<details><summary>apply numeric separators(<a href=https://github.com/tc39/proposal-numeric-separator>proposal-numeric-separator</a>)</summary>

```diff
-const a = 100000000;
+const a = 100_000_000;
```

</details>

<details><summary>apply optional chaining (<a href=https://github.com/tc39/proposal-optional-chaining>proposal-optional-chaining</a>)</summary>

```diff
-const result = hello && hello.world;
+const result = hello?.world;
```

</details>

<details><summary>apply nullish coalescing (<a href=https://github.com/tc39/proposal-nullish-coalescing>proposal-nullish-coalescing</a>, not bundled)</summary>

```diff
-result = typeof result  === 'undefined' ? 'hello': result;
result = result ?? 'hello';
```

</details>

<details><summary>convert <code>throw</code> statement into expression (<a href=https://github.com/tc39/proposal-throw-expressions>proposal-throw-expressions</a>, not bundled)</summary>

```diff
-const fn = (a) => {throw Error(a);}
+const fn = (a) => throw Error(a);
```

</details>

<details><summary>merge destructuring properties</summary>

```diff
-const {one} = require('numbers'):
-const {two} = require('numbers');
+ const {
+   one,
+   two
+} = require('numbers');
```

</details>

<details><summary>merge duplicate imports</summary>

```diff
-import {m as b} from 'y';
-import {z} from 'y';
-import x from 'y';
+import x, {m as b, z} from 'y';
```

</details>

<details><summary>merge <code>if</code> statements</summary>

```diff
-if (a > b)
-    if (b < c)
-        console.log('hi');
+if (a > b && b < c)
+    console.log('hi');
```

</details>

<details><summary>convert <code>Math.pow</code> to <code>exponentiation operator</code></summary>

```diff
-Math.pow(2, 4);
+2 ** 4;
```

</details>

<details><summary>convert <code>anonymous</code> to <code>arrow function</code></summary>

```diff
-module.exports = function(a, b) {
+module.exports = (a, b) => {
}
```

</details>

<details><summary>convert <code>for</code> to <code>for-of</code></summary>

```diff
-for (let i = 0; i < items.length; i++) {
+for (const item of items) {
-   const item = items[i];
    log(item);
}
```

</details>

<details><summary>convert <code>forEach</code> to <code>for-of</code></summary>

```diff
-Object.keys(json).forEach((name) => {
+for (const name of Object.keys(json)) {
    manage(name, json[name]);
-});
+}
```

</details>

<details><summary>convert <code>for-in</code> to <code>for-of</code></summary>

```diff
-for (const name in object) {
-   if (object.hasOwnProperty(name)) {
+for (const name of Object.keys(object)) {
    console.log(a);
-   }
}
```

</details>

<details><summary>convert <code>map</code> to <code>for-of</code></summary>

```diff
-names.map((name) => {
+for (const name of names) {
    alert(`hello ${name}`);
+}
-});
```

</details>

<details><summary>convert <code>array copy</code> to <code>slice</code></summary>

```diff
-const places = [
-    ...items,
-];
+const places = items.slice();
```

</details>

<details><summary>extract sequence expressions</summary>

```diff
-module.exports.x = 1,
-module.exports.y = 2;
+module.exports.x = 1;
+module.exports.y = 2;
```

</details>

<details><summary>extract object properties into variable</summary>

```diff
-const {replace} = putout.operator;
-const {isIdentifier} = putout.types;
+const {operator, types} = putout;
+const {replace} = operator;
+const {isIdentifier} = types;
```

</details>

<details><summary>convert <code>apply</code> to <code>spread</code></summary>

```diff
-console.log.apply(console, arguments);
+console.log(...arguments);
```

</details>

<details><summary>convert <code>concat</code> to <code>flat</code></summary>

```diff
-[].concat(...array);
+array.flat();
```

</details>

<details><summary>convert <code>arguments</code> to <code>rest</code></summary>

```diff
-function hello() {
-    console.log(arguments);
+function hello(...args) {
+    console.log(args);
}
```

</details>

<details><summary>convert <code>Object.assign</code> to <code>merge spread</code></summary>

```diff
function merge(a) {
-   return Object.assign({}, a, {
-       hello: 'world'
-   });
+   return {
+       ...a,
+       hello: 'world'
+   };
};
```

</details>

<details><summary>convert <code>comparison</code> to <code>boolean</code></summary>

```diff
-   const a = b === b;
+   const a = true;
```

</details>

### Promises

<details><summary>remove useless <code>await</code></summary>

```diff
-   await await Promise.resolve('hello');
+   await Promise.resolve('hello');
```

</details>

<details><summary>remove useless <code>async</code></summary>

```diff
-const show = async () => {
+const show = () => {
    console.log('hello');
};
```

</details>

<details><summary>add missing <code>await</code></summary>

```diff
-runCli();
+await runCli();

async function runCli() {
}
```

</details>

<details><summary>add <code>await</code> to <code>return promise()</code> statements (<a href=https://v8.dev/blog/fast-async>because it's faster, produces call stack and more readable</a>)</summary>

```diff
async run () {
-   return promise();
+   return await promise();
}
```

</details>

<details><summary>apply top-level-await (<a href=https://github.com/tc39/proposal-top-level-await>proposal-top-level-await</a>, enabled for ESM)</summary>

```diff
import fs from 'fs';

-(async () => {
-    const data = await fs.promises.readFile('hello.txt');
-})();
+const data = await fs.promises.readFile('hello.txt');
```

</details>

<details><summary>remove useless <code>Promise.resolve</code></summary>

```diff
async () => {
-    return Promise.resolve('x');
+    return 'x';
}
```

</details>

<details><summary>convert <code>Promise.reject</code> to <code>throw</code></summary>

```diff
async () => {
-    return Promise.reject('x');
+    throw 'x';
}
```

</details>

### Node.js

<details><summary>convert <code>fs.promises</code> to <code>fs/promises</code> for <a href=https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_fs_promises_api>node.js</a></summary>

```diff
-const {readFile} = require('fs').promises;
+const {readFile} = require('fs/promises');
```

</details>

<details><summary>convert <code>top-level return</code> into <code>process.exit()</code>(because EcmaScript Modules doesn't support top level return)</summary>

```diff
-   return;
+   process.exit();
```

</details>

<details><summary>remove <code>process.exit</code> call</summary>

```diff
-process.exit();
```

</details>

### Tape

<details><summary>replace <code>test.only</code> with <code>test</code> calls</summary>

```diff
-test.only('some test here', (t) => {
+test('some test here', (t) => {
    t.end();
});
```

</details>

<details><summary>replace <code>test.skip</code> with <code>test</code> calls</summary>

```diff
-test.skip('some test here', (t) => {
+test('some test here', (t) => {
    t.end();
});
```

</details>

### TypeScript

<details><summary>remove duplicates from <code>union</code></summary>

```diff
-type x = boolean[] | A | string | A | string[] | boolean[];
+type x = boolean[] | A | string | string[];
```

</details>

<details><summary>convert <code>generic</code> to <code>shorthand</code>(<a href=https://stackoverflow.com/a/36843084/4536327>why</a>)</summary>

```diff
interface A {
-    x: Array<X>;
+    x: X[];
}
```

</details>

<details><summary>remove useless <code>types</code> from <code>constants</code></summary>

```diff
-const x: any = 5;
+const x = 5;
```

</details>

<details><summary>remove useless <code><a href=https://www.typescriptlang.org/docs/handbook/2/mapped-types.html>mapped types</a></code></summary>

```diff
-type SuperType = {
-   [Key in keyof Type]: Type[Key]
-}
+type SuperType = Type;
```

</details>

<details><summary>remove useless <code><a href=https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers>mapping modifiers</a></code></summary>

```diff
type SuperType = {
-   +readonly[Key in keyof Type]+?: Type[Key];
+   readonly[Key in keyof Type]?: Type[Key];
}
```

</details>

<details><summary>remove useless <code>types</code></summary>

```diff
type oldType = number;
-type newType = oldType;
-const x: newType = 5;
+const x: oldType = 5;
```

</details>

<details><summary>remove duplicate <code>interface</code> keys</summary>

```diff
interface Hello {
-   'hello': any;
    'hello': string;
}
```

</details>

<details><summary>remove unused <code>types</code></summary>

```diff
type n = number;
-type s = string;
const x: n = 5;
```

</details>

<details><summary>apply <code>as</code> type assertion (according to <a href=https://basarat.gitbook.io/typescript/type-system/type-assertion#as-foo-vs.-less-than-foo-greater-than>best practices</a>)</summary>

```diff
-const boundaryElement = <HTMLElement>e.target;
+const boundaryElement1 = e.target as HTMLElement;
```

</details>

<details><summary>apply <a href=https://www.typescriptlang.org/docs/handbook/utility-types.html>utility types</a></summary>

```diff
-type SuperType = {
-    [Key in keyof Type]?: Type[Key];
-}
+type SuperType = Partial<Type>;
```

</details>
