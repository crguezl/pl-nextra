---
title: "Ejercicio: Gramática de la versión Inicial de Egg"
---

En este ejercicio te propongo un proceso inverso.
Partiendo del [código](https://github.com/ULL-ESIT-PL-1617/egg/tree/inicial)
que está en la rama `inicial` de este [repo](https://github.com/ULL-ESIT-PL-1617/egg/),
sabiendo que el algoritmo de análisis es un PDR,
intenta describir formalmente la gramática
que acepta.

Este es el código inicial implicado:

```js
function parseExpression(program) {
  program = skipSpace(program);
  var match, expr;

  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
  } else if (match = /^[^\s(),"]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
  } else {
    throw new SyntaxError(`Unexpect syntax: ${program}`);
  }

  return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
  return string.slice(/^(\s|#.*)*/.exec(string)[0].length);
}

function parseApply(expr, program) {
  program = skipSpace(program);

  if (program[0] != '(') {
    return {expr: expr, rest: program};
  }

  program = skipSpace(program.slice(1));
  expr = {type: 'apply', operator: expr, args: []};

  while (program[0] != ')') {
    var arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);

    if (program[0] == ',') {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ')') {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }

  return parseApply(expr, program.slice(1));
}
```

## ¿Que resultados dan estas ejecuciones?

Ejecútalo con las entradas que te propongo abajo.
Para cada una de las ejecuciones ten en cuenta estos puntos:

* Antes de hacer la ejecución  decide si la entrada es sintácticamente correcta,
* Si es semánticamente correcta
* Cual será la salida
* Una vez que se ha ejecutado:
  *  Si da error mira en que función ocurre. ¿Es un error sintáctico o semántico? ¿Es lo que esperabas?
  * Si no se produce error y crees que debería producirse ¿Que código es el que tienes que modificar?

Entradas:

* `$ node egg.js 'print(+)'`
* `$ node egg.js 'print(4,)'`
* `$ node egg.js '8()'`
* `$ node egg.js '"hello"(2,3)'`
* `$ node egg.js '+()'`
* `$ node egg.js '+(2,)'`

## Gramática

* [Solucion](solucion-ejercicio-gramar-egg-inicial)

# Siguiente: Los Árboles de Análisis Abstracto

* [Siguiente: Los Árboles de Análisis Abstracto](ast-description)
  