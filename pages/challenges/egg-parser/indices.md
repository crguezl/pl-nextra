---
practica: egg-parser 
prev: #do.md
next: #while-end-while.md
---

# Adding Indices to get the elements of an Array

Add indices to the Egg language so that a program like this works:

```js 
➜  prefix-lang git:(indices) ✗ cat examples/array-indices.egg 
do(
  def(x, arr(arr(1,4),5,7)),
  print(x[0]),    # [1,4]
  print(x[0][1])  # 4
)
```

When the former program is compiled and executed with the egg virtual machine produces:

```
➜  prefix-lang git:(indices) ✗ bin/eggc.js examples/array-indices.egg
➜  prefix-lang git:(indices) ✗ npx evm examples/array-indices.json   
[ 1, 4 ]
4
```
The trick to follow is to translate `x[0]` to produce the same AST than the code 
`element(x, 0)`  and to translate  `x[0][1]` to produce the same AST as 
`element(element(x,0),1)`.

Here is the AST for `element(element(x,0),1)`:

```json
{
  "type": "apply",
  "operator": {
    "type": "word",
    "name": "element"
  },
  "args": [
    {
      "type": "apply",
      "operator": {
        "type": "word",
        "name": "element"
      },
      "args": [
        {
          "type": "word",
          "name": "x"
        },
        {
          "type": "value",
          "value": 0,
          "raw": "0"
        }
      ]
    },
    {
      "type": "value",
      "value": 1,
      "raw": "1"
    }
  ]
}
```

To simplify the task, assume that the square brackets are no longer part of the legal characters of the `WORD` token definition. This is the definition of `WORD` is similar to this:

```
WORD : /[^\s(),"\[\]]+/
```

Use the format `element(x, 3)` to access an element of an array and stop using the `[](x,3)` synonym that appears in some versions of Egg.