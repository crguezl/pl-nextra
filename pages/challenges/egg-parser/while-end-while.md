---
practica: eg-parser 
prev: #array.md
next: #do.md
---
# Add syntax for "do ... end do" constructs

Add to the Egg grammar the opportunity to write the 
constructs as `do( ...)` `while( ... )`, `if( ... )` etc. using as alternative  syntax 
`do` ... `end do`, `while` ... `end while`, etc. 

So that a  program like this can work:

```js
➜  prefix-lang git:(while-end-while) cat examples/while-end.egg 
do
  def(x,1),
  while <(x,4),
    do
      set(x,+(x,1)),
      print(x)
    end do
  end while
end do
```

that is,  we allow something like a word like `while` followed by a 
comma separated list of expressions,followed by a new token  `%END`  followed by the same word that started the construct. 

Add a  `buildWordEnd` transformer inside the `build-ast.js` library to build the corresponding AST.

The idea to achieve this challenge is that for the code:

```js 
  while <(x,4),
    do
      set(x,+(x,1)),
      print(x)
    end do
  end while
```

the function `buildWordEnd` produces exactly the same AST as 

```js
  while(<(x,4),
    do(
      set(x,+(x,1)),
      print(x)
    )
  )
```
when executed we get:

```
➜  prefix-lang git:(while-end-while) bin/eggc.js examples/while-end.egg 
➜  prefix-lang git:(while-end-while) npx evm examples/while-end.json
2
3
4
```

