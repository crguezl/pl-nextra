# Complex numbers

Add a function `C` to the egg interpreter allowing the creation of complex number objects. Include the sum and product operations so that the following Egg program works:

```ruby
do(
  def(x, C(1,2)), # 1+2i
  def(y, C(3,4)), # 3+4i
  print(+(x,y)),  # 4+6i
  print(*(x,y))   # -5+10i
)
```