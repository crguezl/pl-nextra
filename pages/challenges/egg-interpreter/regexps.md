# RegExps in Egg

Using your egg-parser and egg-interpreter repo assignments, add a function `RegExp` to the Egg interpreter allowing the creation of Regular Expression objects.
Add also a function `REtest` so that the 
following Egg program 
works:

```js
➜  egg-interpreter-solution git:(RegExps-challenge) ✗ cat examples/RegExps-challenge-1.egg 
do(
  def(r, RegExp("[a-b].[a-b]")),
  print(REtest(r, "acb")) # true
  print(REtest(r, "ace")) # false
)
```