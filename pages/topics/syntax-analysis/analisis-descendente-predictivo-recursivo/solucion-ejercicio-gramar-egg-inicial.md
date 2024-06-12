# Egg Initial Syntax

```
expression: (STRING | NUMBER | WORD) apply 

apply: /* vacio */
     | '(' (expression ',')* expression? ')' apply
```

# Token definitions

```
WHITES = /^(\s|#.*)*/
STRING = /^"([^"]*)"/
NUMBER = /^\d+\b/
WORD   = /^[^\s(),"]+/
```

# Ejecuciones

```
[~/.../PLgrado/eloquentjsegg(inicial)]$ node egg.js 'print(+)'
[Function: anonymous]
[~/.../PLgrado/eloquentjsegg(inicial)]$ node egg.js 'print(4,)'
4
[~/.../PLgrado/eloquentjsegg(inicial)]$ node egg.js '8()'
/Users/casiano/local/src/javascript/PLgrado/eloquentjsegg/egg.js:76
TypeError: Applying a non-function
    at evaluate (/Users/casiano/local/src/javascript/PLgrado/eloquentjsegg/egg.js:76:15)

[~/.../PLgrado/eloquentjsegg(inicial)]$ node egg.js '"hello"(2,3)'
TypeError: Applying a non-function
    at evaluate (/Users/casiano/local/src/javascript/PLgrado/eloquentjsegg/egg.js:76:15)

[~/.../PLgrado/eloquentjsegg(inicial)]$ node egg.js '+()'
[~/.../PLgrado/eloquentjsegg(inicial)]$ node egg.js '+(2,)'
[~/.../PLgrado/eloquentjsegg(inicial)]$ node egg.js 'print(+())'
NaN
[~/.../PLgrado/eloquentjsegg(inicial)]$ node egg.js 'print(+(2,))'
NaN
```