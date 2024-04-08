---
sidebar: false
next: /temas/interpretation/ast-interpretation.md
prev: /temas/interpretation/assignment-interpretation.md
---
# Function Interpretation

Functions in Egg get their own local scope. The function produced by the `fun` form 
creates this local scope and **adds the argument bindings** to it. 
It then **evaluates** the function body in this scope and returns the result.

```js
specialForms['->'] =specialForms['fun'] = function(args, env) {
  if (!args.length) {
    throw new SyntaxError('Functions need a body.')
  }

  function name(expr) {
    if (expr.type != 'word') {
      throw new SyntaxError('Arg names must be words');
    }
    return expr.name;
  }

  let argNames = args.slice(0, args.length - 1).map(name);
  let body = args[args.length - 1];

  return function(...args) {
    if (args.length > argNames.length) {
      throw new TypeError(`Wrong number of arguments. Called with ${args.length} arguments and declared ${argNames.length} parameters`);
    }

    let localEnv = Object.create(env);
    for (let i = 0; i < args.length; i++) {
      localEnv[argNames[i]] = args[i];
    }

    return body.evaluate(localEnv);
  };
};
```