# Maps in Egg

Add a function `Map` to the Egg interpreter allowing the creation of Map-like objects.
Extend also the `topEnv` JS function `element` so that the 
following Egg program 
works:

```js
➜  egg-interpreter-solution git:(Maps-challenge) ✗ cat examples/Maps-challenge-1.egg 
do(
  def(m, Map("x",2, "y",5)),
  def(x, element(m, "x")),
  print(x), # 2
  def(y, element(m, "y")),
  print(y) # 5
)
```

Notice that the `element` function has to work with maps