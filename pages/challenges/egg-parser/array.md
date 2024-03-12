---
practica: egg-parser 
prev: #do.md
next: #while-end-while.md
---
# Brackets as Literal Array Builders

Extend the Egg grammar to support square brackets as a constructor for array literals:

```ruby {3}
➜ prefix-lang git:(array-challenge) cat examples/brackets-array.egg
do(
   def(x, [ [1,4], 5, 7]),
   print(element(x,0)), # [1,4]
   print(element(x,1)) # 5
)
```

When compiled it produces an AST that is interpreted correctly:

```js
➜ prefix-lang git:(array-challenge) bin/eggc.js examples/brackets-array.egg
➜ prefix-lang git:(array-challenge) npx evm examples/brackets-array.json
[ 1, 4 ]
5
```

The general idea is that an expression like `[ [1,4], 5, 7]` must produce the same AST as the 
already existing expression `array(array(1, 4), 5, 7)`.

To simplify the task, assume that the square brackets are no longer part of the legal characters of the `WORD` token definition. This is the definition of `WORD` is similar to this:

```js
WORD : /[^\s(),"\[\]]+/
```

Use the format `element(x, 3)` to access an element of an array and stop using the `[](x,3)` synonym that appears in some versions of Egg.