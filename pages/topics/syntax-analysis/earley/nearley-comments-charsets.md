### More syntax: tips and tricks

#### Comments

Comments are marked with '#'. Everything from `#` to the end of a line is
ignored:

```
expression -> number "+" number # sum of two numbers
```

#### Charsets

You can use valid RegExp charsets in a rule (unless you're using a
[tokenizer](tokenizers)):

    not_a_letter -> [^a-zA-Z]

The `.` character can be used to represent any character.

#### Case-insensitive string literals

You can create case-insensitive string literals by adding an `i` after the
string literal:

    cow -> "cow"i # matches CoW, COW, and so on.

Note that if you are using a lexer, your lexer should use the `i` flag in its
regexes instead. That is, if you are using a lexer, you should *not* use the
`i` suffix in nearley.
