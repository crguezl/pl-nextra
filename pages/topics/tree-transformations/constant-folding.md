---
sidebar: false
---
## Constant Folding

The following code uses estraverse to implement a simplified version of the AST tree transformation known as [Constant Folding](https://en.wikipedia.org/wiki/Constant_folding). **Constant folding** is the process of recognizing and evaluating constant expressions at compile time rather than computing them at runtime. 

```js
// See https://github.com/babel/minify/tree/master/packages/babel-plugin-minify-constant-folding
const fs = require("fs");
const deb = require("../src/deb.js");
const escodegen = require("escodegen");
const espree = require("espree");
const estraverse = require("estraverse");

const input = `
var f = 3+null;
var e = 4 | 3;
var d = 3+"c";
var b = 9 +1;
var a = 2+3*5+b;
`;

function replaceByLiteral(n) {
  n.type = "Literal";

  n.value = eval(`${n.left.raw} ${n.operator} ${n.right.raw}`);
  n.raw = String(n.value);

  delete n.left;
  delete n.right;
}

const t = espree.parse(input, { ecmaVersion: 6, loc: false });
estraverse.traverse(t, {
  leave: function (n, p) {
    if (
      n.type == "BinaryExpression" && 
        n.left.type == "Literal" && n.right.type == "Literal"
    ) { replaceByLiteral(n); }
  },
});
deb(t);
let c = escodegen.generate(t);
console.error(c);
```

Execution:

```js
➜  espree-logging-casiano-rodriguez-leon-alumno5 git:(train) ✗ node src/cf.js >salida.json                              
var f = 3;
var e = 7;
var d = '3c';
var b = 10;
var a = 17 + b;
```

* Vea los contenidos del árbol [salida.json](./cf-salida)

