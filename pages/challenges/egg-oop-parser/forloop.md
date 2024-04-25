# The *Begin End Something* Language Design Pattern
The "Begin End Something" Language Design Pattern

1. Add a couple of tokens to the language to signal the beginning and the end of the **new specialized category of expressions**:  for instance add `[` to begin array literals and `]` to end array literals
   * Introduce the new tokens in the lexer (be carefull with conflicts, specially with "expansive" tokens. Don't trample on existing "reserved words")
   * Modify the grammar adding the new rule(s) for the new kind of expression
2. Build an AST for the the new category by adding a function `buildCategory` to your `build-ast.js` library.
   * The function `buildCategory` returns in fact a specialized case of an already existent kind of AST
   * Remember to export the new function and import the new function in your grammar file

Following these instructions it is trivial to extend Egg with a family of constructs as 

* `(` ... `)` as a synonym of `do( ...)`: See an example in the branch `doendo` of the solution repo

  ```ruby
  ➜  egg-oop-parser-solution git:(doendo) ✗ cat examples/do-endo.egg 
  (
    def(a,4),
    print(a)
  )
  ➜  egg-oop-parser-solution git:(doendo) ✗ bin/egg examples/do-endo
  4
  ```
* `loop` ... `end loop` or `While` ... `end While` as a synonym of `while(...)`. Do not use `while` ... `end while` for the delimiter tokens or you will trample with the already existing word `while`
*  etc.
