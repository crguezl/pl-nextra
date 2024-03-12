---
practica: egg-parser 
prev: #array.md
next: #while-end-while.md
---
# Curly Brackets for Blocks

Extend the Egg syntax so that `{ ... }` is synonymous with a `do` and produces exactly the same AST as a `do`.

A program like this:

```js
➜ prefix-lang git:(do-challenge) cat examples/curly-do.egg
{
   def(x, -4.5),
   print(+(x, 0.5))
}
```

should once compiled lead to an execution like this:

```
➜ prefix-lang git:(do-challenge) bin/eggc.js examples/curly-do.egg
➜ prefix-lang git:(do-challenge) npx evm examples/curly-do.json
-4
```

The idea is that the AST constructed for the `{ ... }` code is exactly the same AST that is constructed for the `do( ... )` code.

Remember that for consistency, we must make the keys no longer part of the legal characters of the WORD token definition.