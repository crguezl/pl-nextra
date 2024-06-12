---
title: Introducción al Análisis Sintáctico
---

## Introducción A los Analizadores Sintácticos

Después de la fase de análisis léxico la siguiente fase en la construcción del analizador es la fase de
análisis sintáctico. Esta toma como entrada el flujo de terminales y
construye como salida el [árbol de análisis sintáctico abstracto](ast-description).

Existen diferentes métodos de análisis sintáctico. La mayoría caen en
una de dos categorías: 

1. ascendentes y 
2. descendentes. 
 
Los ascendentes
construyen el árbol desde las hojas hacia la raíz. 

Los descendentes lo
hacen en modo inverso. 

El que describiremos para el lenguaje Egg es un descendente: se denomina **método de análisis predictivo descendente recursivo**.

# Códigos para la Construcción de los ASTs de Egg con un algoritmo PDR

## Código de parse 

```js
function parse(p) {
  setProgram(p);
  lex();
  let result = parseExpression();
   if (lookahead !== null)
    throw new SyntaxError(`Unexpected input after reached the end of parsing ${lineno}: ${program.slice(0,10)}`);

  return result;
}
```

## Código de parseExpression

```js
function parseExpression() {
  let expr;

  if (lookahead.type == "STRING") {
    expr = {type: "value", value: lookahead.value};
    lex();
    return expr;
  } else if (lookahead.type == "NUMBER") {
    expr = {type: "value", value: lookahead.value};
    lex();
    return expr;
  } else if (lookahead.type == "WORD") {
    expr = {type: "word", name: lookahead.value};
    lex();
    return parseApply(expr);
  } else {
    throw new SyntaxError(`Unexpected syntax line ${lineno}: ${program.slice(0,10)}`);
  }
}
```

## Código de parseApply

```js
function parseApply(tree) {
  if (!lookahead) return tree;   // apply: /* vacio */
  if (lookahead.type !== "LP") return tree; // apply: /* vacio */

  lex();

  tree = {type: 'apply', operator: tree, args: []};
  while (lookahead && lookahead.type !== "RP") {
    let arg = parseExpression();
    tree.args.push(arg);

    if (lookahead && lookahead.type == "COMMA") {
      lex();
    } else if (!lookahead || lookahead.type !== "RP") {
      throw new SyntaxError(`Expected ',' or ')'  at line ${lineno}: ... ${program.slice(0,20)}`);
    }
  }
  if (!lookahead)  throw new SyntaxError(`Expected ')'  at line ${lineno}: ... ${program.slice(0,20)}`);
  lex();

  return parseApply(tree);
}
```


