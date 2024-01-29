## Source examples/ast-shape-for-property-nodes.egg

```js copy
➜  egg-oop-parser-solution git:(master) cat examples/ast-shape-for-property-nodes.egg 
[[1,2]][0,1]
```

## JSON examples/ast-shape-for-property-nodes.json

```js copy
{
  "type": "property",
  "operator": {
    "type": "apply",
    "operator": {
      "type": "word",
      "length": 5,
      "name": "array"
    },
    "args": [
      {
        "type": "apply",
        "operator": {
          "type": "word",
          "line": 1,
          "col": 3,
          "length": 5,
          "name": "array"
        },
        "args": [
          {
            "type": "value",
            "value": 1,
            "line": 1,
            "col": 3,
            "length": 1
          },
          {
            "type": "value",
            "value": 2,
            "line": 1,
            "col": 5,
            "length": 1
          }
        ]
      }
    ]
  },
  "args": [
    {
      "type": "value",
      "value": 0,
      "line": 1,
      "col": 9,
      "length": 1
    },
    {
      "type": "value",
      "value": 1,
      "line": 1,
      "col": 11,
      "length": 1
    }
  ]
}
```
