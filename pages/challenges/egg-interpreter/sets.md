# Sets in Egg

Add a function `Set` to the Egg interpreter allowing the creation of Set-like objects.
Extend also Egg with functions `SetAdd`, `SetHas`, `SetDelete` and `Set2Array` so that the 
following Egg program 
works:

```js
➜  egg-interpreter-solution git:(Sets-challenge) ✗ cat examples/Sets-challenge-1.egg 
do(
  def(m, Set("x", "y")),
  print(SetHas(m, "x")), # true
  print(SetHas(m, "z"),  # false
  SetAdd(m, 4),
  print(Set2Array(m)) # [ "x", "y", 4 ]
)
```

May be this references can help:

* [JS Sets](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)
* [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)