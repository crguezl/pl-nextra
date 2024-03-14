---
prev: /practicas/lexer-generator.md
next: hello-unicode-js.md
---
## examples/hello.js

Here is the full code of the example of usage for the lab "lexical analyzer generator":

```js
➜  lexer-generator-solution git:(main) cat examples/hello.js
"use strict";

const {buildLexer} = require("../src/main.js");

const SPACE = /(?<SPACE>\s+)/; SPACE.skip = true;
const COMMENT = /(?<COMMENT>\/\/.*)/; COMMENT.skip = true;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const NUMBER = /(?<NUMBER>\d+)/; NUMBER.value = v => Number(v);
const ID = /(?<ID>\b([a-z_]\w*)\b)/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const PUNCTUATOR = /(?<PUNCTUATOR>[-+*\/=;])/;

const myTokens = [SPACE, COMMENT, NUMBER, RESERVEDWORD, ID, STRING, PUNCTUATOR];

const { validTokens, lexer } = buildLexer(myTokens);

console.log(validTokens);

const str = 'const varName \n// An example of comment\n=\n 3;\nlet z = "value"';
//const str = 'const varName = {};';

const result = lexer(str);

console.log(result);
```

Execution:

```js
➜  lexer-generator-solution git:(main) node  examples/hello.js
Map(8) {
  'SPACE' => /(?<SPACE>\s+)/ { skip: true },
  'COMMENT' => /(?<COMMENT>\/\/.*)/ { skip: true },
  'NUMBER' => /(?<NUMBER>\d+)/ { value: [Function (anonymous)] },
  'RESERVEDWORD' => /(?<RESERVEDWORD>\b(const|let)\b)/,
  'ID' => /(?<ID>\b([a-z_]\w*)\b)/,
  'STRING' => /(?<STRING>"([^\\"]|\\.")*")/,
  'PUNCTUATOR' => /(?<PUNCTUATOR>[-+*\/=;])/,
  'ERROR' => /(?<ERROR>(.|\n)+)/
}
[
  { type: 'RESERVEDWORD', value: 'const', line: 1, col: 1, length: 5 },
  { type: 'ID', value: 'varName', line: 1, col: 7, length: 7 },
  { type: 'PUNCTUATOR', value: '=', line: 3, col: 1, length: 1 },
  { type: 'NUMBER', value: 3, line: 4, col: 2, length: 1 },
  { type: 'PUNCTUATOR', value: ';', line: 4, col: 3, length: 1 },
  { type: 'RESERVEDWORD', value: 'let', line: 5, col: 1, length: 3 },
  { type: 'ID', value: 'z', line: 5, col: 5, length: 1 },
  { type: 'PUNCTUATOR', value: '=', line: 5, col: 7, length: 1 },
  { type: 'STRING', value: '"value"', line: 5, col: 9, length: 7 }