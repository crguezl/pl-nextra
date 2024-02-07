---
---

Ejemplo de pruebas con Jest:

```
➜  lexer-generator-solution git:(master) ✗ pwd -P
/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/lexer-generator/lexer-generator-solution
➜  lexer-generator-solution git:(master) ✗ ls test
build-lexer.test.js          test-grammar-2-args.ne       test-grammar-error-tokens.ne test-grammar.ne
egg                          test-grammar-combined.ne     test-grammar.js
```

```
➜  lexer-generator-solution git:(master) ✗ cat test/build-lexer.test.js 
```

```js
// If you want debugging output run it this way:
// DEBUG=1 npm test
// @ts-check
/**
 * @author Casiano Rodriguez Leon <aluXXX@ull.edu.es>
 * @since 28/03/2122
 * This file imports the buildLexer function and tests it
 */

'use strict';

const { buildLexer } = require('../src/main.js');

describe('buildLexer', () => {
  const SPACE = /(?<SPACE>\s+|\/\/.*)/; SPACE.skip = true;
  const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
  const ID = /(?<ID>\b([a-z_]\w*)\b)/;
  const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
  const OP = /(?<OP>[+*\/=-])/;

  const myTokens = [
    SPACE,
    RESERVEDWORD,
    ID,
    STRING,
    OP,
  ];

  const { lexer } = buildLexer(myTokens);

  test('Assignment to string', () => {
    const str = 'const varName = "value"';
    const result = lexer(str);
    const expected = [
      {
        type: 'RESERVEDWORD',
        value: 'const',
        col: 1,
        line: 1,
        length: 5,
      },
      {
        type: 'ID',
        value: 'varName',
        col: 7,
        line: 1,
        length: 7,
      },
      {
        type: 'OP',
        value: '=',
        col: 15,
        line: 1,
        length: 1,
      },
      {
        type: 'STRING',
        value: '"value"',
        col: 17,
        line: 1,
        length: 7,
      },
    ];
    expect(result).toEqual(expected);
  });

  test('Assingment spanning two lines', () => {
    const str = 'let x = a + \nb';
    const result = lexer(str);
    const expected = [
      {
        type: 'RESERVEDWORD',
        value: 'let',
        col: 1,
        line: 1,
        length: 3,
      },
      {
        type: 'ID',
        value: 'x',
        col: 5,
        line: 1,
        length: 1,
      },
      {
        type: 'OP',
        value: '=',
        col: 7,
        line: 1,
        length: 1,
      },
      {
        type: 'ID',
        value: 'a',
        col: 9,
        line: 1,
        length: 1,
      },
      {
        type: 'OP',
        value: '+',
        col: 11,
        line: 1,
        length: 1,
      },
      {
        type: 'ID',
        value: 'b',
        col: 1,
        line: 2,
        length: 1,
      },
    ];
    expect(result).toEqual(expected);
  });

  test('Input with errors', () => {
    const str = ' // Input with errors\nlet x = 42*c\nconst a = b';
    const result = lexer(str);
    const expected = [
      {
        type: 'RESERVEDWORD',
        value: 'let',
        col: 1,
        line: 2,
        length: 3,
      },
      {
        type: 'ID',
        value: 'x',
        col: 5,
        line: 2,
        length: 1,
      },
      {
        type: 'OP',
        value: '=',
        col: 7,
        line: 2,
        length: 1,
      },
      {
        type: 'ERROR',
        value: '42*c',
        col: 9,
        line: 2,
        length: 4,
      },
      {
        type: 'RESERVEDWORD',
        value: 'const',
        col: 1,
        line: 3,
        length: 5,
      },
      {
        type: 'ID',
        value: 'a',
        col: 7,
        line: 3,
        length: 1,
      },
      {
        type: 'OP',
        value: '=',
        col: 9,
        line: 3,
        length: 1,
      },
      {
        type: 'ID',
        value: 'b',
        col: 11,
        line: 3,
        length: 1,
      },
    ];
    expect(result).toEqual(expected);
  });

  test('Input with errors that aren\'t at the end of the line', () => {
    const str = 'let 2x = "hello"';
    const result = lexer(str);
    const expected = [
      {
        type: 'RESERVEDWORD',
        value: 'let',
        col: 1,
        line: 1,
        length: 3,
      },
      {
        type: 'ERROR',
        value:  "2x = \"hello\"",
        col: 5,
        line: 1,
        length: 12,
      }
    ];
    expect(result).toEqual(expected);
  });

  test('Shouldn\'t be possible to use unnamed Regexps', () => {
    const OP = /([+*\/=-])/;

    expect(() => buildLexer([OP]).lexer).toThrowError(/named/);
  });

  test('Shouldn\'t be possible to use Regexps named more than once', () => {
    const OP = /(?<OP>(?<OP2>[+*\/=-]))/;

    expect(() => buildLexer([OP]).lexer).toThrowError(/named/);
  });

  test('Should be possible to use Regexps with look behinds', () => {
    const OP = /(?<OP>a(?<=b))/;

    expect(() => buildLexer([OP]).lexer).not.toThrowError(/named/);
  });
});

describe('buildLexer with unicode', () => {
  const SPACE = /(?<SPACE>\s+|\/\/.*)/; SPACE.skip = true;
  const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
  const ID = /(?<ID>\b([a-z_]\w*)\b)/;
  const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
  const OP = /(?<OP>[+*💠\/=-])/;

  const myTokens = [
    SPACE,
    RESERVEDWORD,
    ID,
    STRING,
    OP,
  ];

  const { lexer } = buildLexer(myTokens);

  test('Use of emoji operation', () => {
    const str = 'const varName = "value" 💠 "a"';
    const result = lexer(str);
    const expected = [
      {
        type: 'RESERVEDWORD',
        value: 'const',
        col: 1,
        line: 1,
        length: 5,
      },
      {
        type: 'ID',
        value: 'varName',
        col: 7,
        line: 1,
        length: 7,
      },
      {
        type: 'OP',
        value: '=',
        col: 15,
        line: 1,
        length: 1,
      },
      {
        type: 'STRING',
        value: '"value"',
        col: 17,
        line: 1,
        length: 7,
      },
      {
        type: 'OP',
        value: '💠',
        col: 25,
        line: 1,
        length: 2,
      },
      {
        type: 'STRING',
        value: '"a"',
        col: 28,
        line: 1,
        length: 3,
      },
    ];
    expect(result).toEqual(expected);
  });
});
```
