---
prev: /practicas/lexer-generator.md
next: hello-js.md
---
## hello-unicode.js

Here is an example of usage of the generated lexical analyzer. Although the 
user does not specify the option `/u` in her regexps the generated lexer is unicode "aware":

```js
"use strict";

const {buildLexer} = require("../src/main.js");

const SPACE = /(?<SPACE>\p{White_Space}+)/; SPACE.skip = true;
const COMMENT = /(?<COMMENT>\/\/.*)/; COMMENT.skip = true;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const NUMBER = /(?<NUMBER>\p{N}+)/; 
const ID = /(?<ID>\p{L}(\p{L}|\p{N})*)/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const PUNCTUATOR = /(?<PUNCTUATOR>[-+*\/=;])/;
const myTokens = [SPACE, COMMENT, NUMBER, RESERVEDWORD, ID, STRING, PUNCTUATOR];

const { validTokens, lexer } = buildLexer(myTokens);

console.log(validTokens);

const str = "const αβ६६७ \u205F = ६६७ + Ⅻ"; // ६६७ + Ⅻ"; // \u205F medium mathematical space
const result = lexer(str);
console.log(result);
```

Execution:

```js
➜  lexer-generator-solution git:(main) node examples/hello-unicode.js 
Map(8) {
  'SPACE' => /(?<SPACE>\p{White_Space}+)/ { skip: true },
  'COMMENT' => /(?<COMMENT>\/\/.*)/ { skip: true },
  'NUMBER' => /(?<NUMBER>\p{N}+)/,
  'RESERVEDWORD' => /(?<RESERVEDWORD>\b(const|let)\b)/,
  'ID' => /(?<ID>\p{L}(\p{L}|\p{N})*)/,
  'STRING' => /(?<STRING>"([^\\"]|\\.")*")/,
  'PUNCTUATOR' => /(?<PUNCTUATOR>[-+*\/=;])/,
  'ERROR' => /(?<ERROR>(.|\n)+)/
}
[
  { type: 'RESERVEDWORD', value: 'const', line: 1, col: 1, length: 5 },
  { type: 'ID', value: 'αβ६६७', line: 1, col: 7, length: 5 },
  { type: 'PUNCTUATOR', value: '=', line: 1, col: 15, length: 1 },
  { type: 'NUMBER', value: '६६७', line: 1, col: 17, length: 3 },
  { type: 'PUNCTUATOR', value: '+', line: 1, col: 21, length: 1 },
  { type: 'NUMBER', value: 'Ⅻ', line: 1, col: 23, length: 1 }
]
```