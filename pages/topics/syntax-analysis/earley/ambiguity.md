---
title: "Ambiguity in Nearley.JS"
published: true
video: "zsy84y6S-Ww"
drive: "https://drive.google.com/file/d/18kRZAQyZemvkSctO32tJ-542Vc5zstNQ/view?usp=sharing"
summary:  "Let's continue with Nearley.JS"  
---

# {{ $frontmatter.title }}

## ambiguous.ne

```
➜  ambiguous git:(main) ✗ cat ambiguous.ne
```

```js
@{%
const { makeLexer } = require("moo-ignore");
const tokens = require('./tokens.js')
 
let lexer = makeLexer(tokens);
lexer.ignore("ws", "comment");
%}

@lexer lexer

main ->  e       {% id %}

e -> e %plus e   {% ([f,_,s]) => { return f+s; } %}
   | e %minus e  {% ([f,_,s]) => { return f-s; } %}
   | e %mul e    {% ([f,_,s]) => { return f*s; } %}
   | e %div e    {% ([f,_,s]) => { return f/s; } %}
   | %number     {% id %}
```

### Execution 

```
➜  ambiguous git:(main) ✗ ./use-ambiguous.js '4/2/2'
[ 1, 4 ]
➜  ambiguous git:(main) ✗ ./use-ambiguous.js '4*2*2'
[ 16, 16 ]
```

### tokens.js

```js
➜  ambiguous git:(main) ✗ cat tokens.js 
const ws = /\s+/; /* whitespace */
const comment = /\/\*.*?\*\//;
const number = /\d+/;
const minus = "-";
const plus = "+";
const mul = "*";
const div = "/";

const tokens = {
  ws: {match: ws, lineBreaks: true },
  comment,
  number: {match: number, value: s => parseInt(s)},
  minus,
  plus,
  mul,
  div
};

module.exports = tokens;
```

### use-ambiguous.js

```js
➜  ambiguous git:(main) ✗ cat use-ambiguous.js 
#!/usr/bin/env node

const nearley = require("nearley");
const grammar = require("./ambiguous.js");

const tests = (process.argv.length > 2)? process.argv.slice(2): [
        "3\n - /* comment */ 2\n-\n1" ,
        "2-2/2"
    ];

try {
    for (let expression of tests) { 
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed(expression);
        
        console.log(parser.results); // parser.results is an array of possible parsings
    }   
} catch(e) {
    console.error("Found an error: "+e.message);
}
```

## Removing Ambiguity

```
➜  calculator git:(main) ✗ cat arithmetic.ne 
```
```js
# This is a nice little grammar to familiarize yourself
# with the nearley syntax.

# `main` is the nonterminal that nearley tries to parse, so
# we define it first.
# The _'s are defined as whitespace below. This is a mini-
# -idiom.

main -> null | _ AS _ {% function(d) {return d[1]; } %}

# Addition and subtraction
AS -> AS _ "+" _ MD {% function(d) {return d[0]+d[4]; } %}
    | AS _ "-" _ MD {% function(d) {return d[0]-d[4]; } %}
    | MD            {% id %}

# PEMDAS!
# We define each level of precedence as a nonterminal.

# Parentheses
P -> "(" _ AS _ ")" {% function(d) {return d[2]; } %}
    | N             {% id %}

# Factorial 
F ->  P "!"          {% function(d) {
                          const fac = n => (n===0)?1:n*fac(n-1);
                          return fac(d[0]); 
                        } 
                     %}
    | P              {% id %} 

# Exponents
E -> F _ "^" _ E    {% function(d) {return Math.pow(d[0], d[4]); } %}
    | F             {% id %}

# Multiplication and division
MD -> MD _ "*" _ E  {% function(d) {return d[0]*d[4]; } %}
    | MD _ "/" _ E  {% function(d) {return d[0]/d[4]; } %}
    | E             {% id %}


# A number or a function of a number
N -> float          {% id %}
    | "sin" _ P     {% function(d) {return Math.sin(d[2]); } %}
    | "cos" _ P     {% function(d) {return Math.cos(d[2]); } %}
    | "tan" _ P     {% function(d) {return Math.tan(d[2]); } %}
    
    | "asin" _ P    {% function(d) {return Math.asin(d[2]); } %}
    | "acos" _ P    {% function(d) {return Math.acos(d[2]); } %}
    | "atan" _ P    {% function(d) {return Math.atan(d[2]); } %}

    | "pi"          {% function(d) {return Math.PI; } %}
    | "e"           {% function(d) {return Math.E; } %}
    | "sqrt" _ P    {% function(d) {return Math.sqrt(d[2]); } %}
    | "ln" _ P      {% function(d) {return Math.log(d[2]); }  %}

# I use `float` to basically mean a number with a decimal point in it
float ->
      int "." int   {% function(d) {return parseFloat(d[0] + d[1] + d[2])} %}
        | int           {% function(d) {return parseInt(d[0])} %}

int -> [0-9]:+        {% function(d) {return d[0].join(""); } %}

# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.
_ -> [\s]:*     {% function(d) {return null; } %}
```

### Ejecución:

```
➜  calculator git:(main) ✗ npm test                  

> calculator@1.0.0 test
> npm run compile && export NODE_PATH=$NODE_PATH:`npm root -g` && node calculator.js


> calculator@1.0.0 compile
> nearleyc arithmetic.ne -o grammar.js

> 2+3*4
14
> sin(pi/2)
1
> sinpi
1.2246467991473532e-16
> 
```

## References

* See the examples at <https://github.com/ULL-ESIT-PL/learning-nearley/tree/develop/examples>
* [Examples](https://github.com/ULL-ESIT-PL/learning-nearley/tree/develop/examples)
* [Esquemas de Traducción y Definiciones Dirigidas por la Sintaxis](https://crguezl.github.io/pl-html/node58.html)
* [Compiler Theory:Syntax-Directed Translation](https://www.csd.uwo.ca/~mmorenom/CS447/Lectures/Translation.html/Translation.html) by Marc Moreno Maza
* [Nearley.js](/temas/syntax-analysis/earley/nearley)
* [The Earley Algorithm](/temas/syntax-analysis/earley/algorithm)