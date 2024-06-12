# Egg Proposed Syntax
```
expression: STRING
          | NUMBER
          | WORD apply 

apply: /* vacio */
     | '(' (expression ',')* expression? ')' apply
```

# Token definitions

```
WHITES = /(\s|[#;].*|\/\*(.|\n)*?\*\/)*/;
STRING = /"((?:[^"\\]|\\.)*)"/;
NUMBER = /([-+]?\d*\.?\d+([eE][-+]?\d+)?)/;
WORD   = /([^\s(),"]+)/;
```
