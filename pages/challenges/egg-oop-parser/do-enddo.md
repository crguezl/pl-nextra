# begin ... end as a synonym of do( ...)

The "Begin End Something" Language Design Pattern works as follows:

1. Add a couple of tokens to the language to signal the beginning and the end of the **new specialized category of expressions**:  for instance add `[` to begin array literals and `]` to end array literals
   * Introduce the new tokens in the lexer (be carefull with conflicts, specially with "expansive" tokens. Don't trample on existing "reserved words")
   * Modify the grammar adding the new rule(s) for the new kind of expression
2. Build an AST for the the new category by adding a function `buildCategory` to your `build-ast.js` library.
   * The function `buildCategory` returns in fact a specialized case of an already existent kind of AST
   * Remember to export the new function and import the new function in your grammar file

Following these instructions extend Egg with a construct `begin` ... `end` that works as a synonym of `do( ...)`:

```ruby
➜  egg-oop-parser-solution git:(doendo) ✗ cat examples/do-endo.egg 
begin
  def(a,4),
  print(a)
end
➜  egg-oop-parser-solution git:(doendo) ✗ bin/egg examples/do-endo
4
```
