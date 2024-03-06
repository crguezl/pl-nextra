### Importing other grammars


You can include the content of other grammar files:

```
@include "../misc/primitives.ne" # path relative to file being compiled
sum -> number "+" number # uses "number" from the included file
```

There are some common nonterminals like "integer" and "double-quoted string"
that ship with nearley to help you prototype grammars efficiently. You can
include them using the `@builtin` directive:

```
@builtin "number.ne"
main -> int:+
```

(Note that we mean "efficient" in the sense that you can get them set up very
quickly. The builtins are _inefficient_ in the sense that they make your parser
slower. For a "real" project, you would want to switch to a lexer and implement
these primitives yourself!)

See the [`builtin/`](https://github.com/kach/nearley/tree/master/builtin) directory on Github for more details. Contributions are
welcome!

Note that including a file imports *all* of the nonterminals defined in it, as
well as any JS, macros, and configuration options defined there.
