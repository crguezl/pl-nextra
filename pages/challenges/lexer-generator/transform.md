## Transforming tokens

Add to your lexical generator a new functionality: When the regexp has a `transform` method, such method `newToken = regexp.transform(token)` will be called and the returned token `newToken` will be in the final streams of tokens instead of the raw `token`.

The example below illustrates how the new functionality can be used to manage keywords when the token for `ID` matches:

```js 
➜  lexer-generator-solution git:(transform-challenge) cat examples/transform-challenge.js 
"use strict";

const {buildLexer} = require("../src/main.js");

const SPACE = /(?<SPACE>\s+)/; SPACE.skip = true;
const COMMENT = /(?<COMMENT>\/\/.*)/; COMMENT.skip = true;
const NUMBER = /(?<NUMBER>\d+)/; NUMBER.value = v => Number(v);
const ID = /(?<ID>\b([a-z_]\w*)\b)/;
ID.transform = token => {
  if ([ 'true', 'false', 'let', 'const' ].includes(token.value))
      token.type = 'RESERVEDWORD';
  return token;
};
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const PUNCTUATOR = /(?<PUNCTUATOR>[-+*\/=;])/;

const myTokens = [
  SPACE, COMMENT, 
  NUMBER, 
  ID, STRING, PUNCTUATOR];

const { lexer } = buildLexer(myTokens);

const str = 'const varName \n// An example of comment\n=\n 3;\nlet z = "value"';

const result = lexer(str);

console.log(result);
```

When executed for the input 

```js
'const varName \n// An example of comment\n=\n 3;\nlet z = "value"'
```

has to produce the token `RESERVEDWORD` instead of `ID` for `const` and `let`: 

```js
➜  lexer-generator-solution git:(transform-challenge) ✗ node examples/transform-challenge.js
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
]
```