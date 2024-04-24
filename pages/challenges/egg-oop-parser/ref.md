# ref

Add a function `ref` to the egg interpreter allowing the creation of reference objects, so that the following Egg program works:

```ruby
do(
  def(x, 3),
  def(y, ref(x)),
  set(y, 7),
  print(x) # 7
)
```

