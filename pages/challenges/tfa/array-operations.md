# Array Operations

Extend the Egg language so that the vector sum and scalar product operations can be done on arrays of the same size, and the following Egg program works:

```ruby
do(
  def(x, arr(1,2,3)),
  def(y, arr(4,5,6)),
  print(+(x,y)), # [5,7,9]
  print(*(x,y))  # [4,10,18]
)
```

