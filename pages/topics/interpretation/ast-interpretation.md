---
prev: /temas/interpretation/repl-interpretation.md
next: /temas/interpretation/assignment-interpretation.md
---
# Interpretación de los Nodos del AST

## Introducción 

En el fichero `src/ast.js`  de la práctica [egg-interpreter](/practicas/egg-interpreter/) encontrará las clases `Value`, `Word` y  `Apply` para los distintos tipos de nodos del AST. todos los tipos de nodo  disponen de un método `evaluate(env)` que evalúa/interpreta el nodo en el contexto de la memoria asociativa local que se pasa en el parámetro `env`. 

El fichero `ast.js` exporta las tres clases:

```js
module.exports = { Value, Word, Apply };
```

## La Clase Value 

Por ejemplo el código para los nodos `Value` puede ser algo así:

```js
class Value {
  constructor(token) {
    this.type = token.type;
    this.value = token.value;
  }
  evaluate() {
    return this.value;
  }
  getIndex() {
    return this.value;
  }
}
``` 

Evaluar/interpretar un node `Value` es simplemente retornar su atributo `value`.

## La Clase Word 

Este es un extracto de la clase `Word`:

```js
class Word {
  constructor(token) {
    this.type = token.type || 'word';
    this.name = token.name;
  }
  
  evaluate(env) {
    if (this.name in env) {
      return env[this.name];
    } else {
      throw new ReferenceError(`Undefined variable: ${this.name}`);
    }
  }

  getIndex() {
    return this.name;
  }

  leftEvaluate(env) {
    /* ... */
  }
}
```
Evaluar un nodo `Word` es también (aparentemente) sencillo. 

El operador `in` devuelve `true` si la propiedad especificada `this.name` está en el objeto `env`  especificado o su **prototipo**. Si hay una entrada `this.name` en la memoria actual, devolvemos el valor almacenado: `env[this.name]`

* Los objetos `env` son objetos JS que son tratados como hashes y  funcionan como memoria asociativa en nuestro intérprete. 
* El objeto `env` representa el  ámbito actual
* Las funciones en Egg disponen de su propio ámbito para guardar en él los parámetros y las variables locales. Por tanto en un instante de la ejecución del programa pueden existir múltiples ámbitos `env`
* En cada instante de la ejecución los objetos `env` se estructuran en una lista enlazada
* Cada ámbito/memoria `env` está anidado  en un ámbito `parentEnv` que es su **prototipo**
* En JS, los objetos pueden tener un objeto prototipo, del cual heredan métodos y propiedades. Un objeto prototipo del objeto puede tener a su vez otro objeto prototipo y así sucesivamente: Esta es la **cadena de prototipos**.
*  Podemos acceder al prototipo de un objeto mediante `parentEnv = Object.getPrototypeOf(env)` (Véase [getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf))

También podemos acceder al prototipo de un objeto mediante la propiedad `__proto__` del mismo:

  ```js
   > (4).__proto__
  ```
  
En JS los objetos heredan las propiedades de su prototipo y los prototipos se estructuran en una jerarquía que eventualmente acaba en la clase Object:

![](/images/prototype-chain.jpeg)

Así pues este código tan simple

```js
    if (this.name in env) {
      return env[this.name];
    }
```

supone un recorrido de la lista enlazada de prototipos de los ámbitos `env` en búsqueda de la propiedad almacenada en `this.name`.

## La Clase Apply

```js
const { specialForms } = require("./registry.js");

/* ... */

class Apply {
  constructor(tree) {
    this.type = tree.type;
    this.operator = tree.operator;
    this.args = tree.args;
  }

  evaluate(env) {
    if (this.operator.type == 'word' && this.operator.name in specialForms) {
      return specialForms[this.operator.name](this.args, env);
    }

    try { 
      let op = this.operator.evaluate(env);
      let argsProcessed = this.args.map((arg) => arg.evaluate(env));

      if ((typeof op === "function")) {
        return op(...argsProcessed);
      }

    }
    catch (err) {
      throw new TypeError('Applying not a function or method ' + err);
    }
  }
```

The interpretation of `Apply` nodes is more involved. 
We divided into two types of interpretation.

### Specials nodes 

If they are a special form, like is the case if `this.operator.name` is for example `if`, `while`, `fun`, etc.
we pass the AST forest inside `this.args`, along with the current scope `env`, to a **spec**ific interpreter function **specialForms[this.operator.name]** that handles the current 
operation `this.operator.name`

```js
    if (this.operator.type == 'word' && this.operator.name in specialForms) {
      return specialForms[this.operator.name](this.args, env);
    }
```

Notice that in such case is the handler function `specialForms[while]` the one that is in charge to evaluate and interpret the current AST includen its children. For instance, the interpretation of an `apply` node with operator type `while` will be: 

```js
specialForms['while'] = function(args, env) {
  if (args.length != 2) {
    throw new SyntaxError('Bad number of args to while');
  }

  while(args[0].evaluate(env) !== false) {
    args[1].evaluate(env);
  }
  return false;
};
```

that will correctly interpret an Egg program like:

```js
➜  egg-interpreter-solution git:(master) ✗ cat examples/while.egg 
do(
    def(i,1),
    while(<(i,4),
      do(
          print(*(i,i)),
          def(i, +(i,1))
      )
    )
)                                                                                                                     
➜  egg-interpreter-solution git:(master) ✗ bin/egg.js examples/while.egg 
1
4
9
```

### "Normal" Calls 

If it is a *normal call*, we evaluate the operator, 

```js
let op = this.operator.evaluate(env);
``` 

Let me repeat again the **question**: 

**Is it true that `this.operator` is always a node of type `word`?**

Then we evaluate the AST forest  in `this.args`:

```js
let argsProcessed = this.args.map((arg) => arg.evaluate(env));
```

last, we check that `op` contains a JavaScript function and if so, we call it with the already processed arguments 

```js
if (typeof op === "function") {
  return op(...argsProcessed);
}
```

We will use plain JavaScript function values to represent Egg’s function values.
We will come back to this later, when we study the special interpreter/evaluator called `fun`.

## Interpreting +(2,3)

We will use JavaScript function values to inject primitives in our interpreter to add functionality. for instance JS functions with names `print`, `+`, `*`, etc. are injected in the top level `topEnv` scope  

```js
topEnv['+'] = (a, b) => a + b;
```

For example a program like `+(2,3)` will be translated by your parser onto an AST like 

```js
apply(operator: word{name: '+'}, args: [ value{value: 2}, value{value:3}])
``` 

that when the `apply` is interpreted `this.operator.type` is `'word'` but `this.operator.name` is `+` which isn't  in `specialForms` skipping lines 2-4. 

```js{7-13}
  evaluate(env) { // ... inside the Apply class
    if (this.operator.type == 'word' && this.operator.name in specialForms) {
      return specialForms[this.operator.name](this.args, env);
    }

    try { 
      let op = this.operator.evaluate(env);
      let argsProcessed = this.args.map((arg) => arg.evaluate(env));

      if ((typeof op === "function")) {
        return op(...argsProcessed);
      }

    }
    catch (err) {
      throw new TypeError('Applying not a function or method ' + err);
    }
  }
```

Line 7 `op = this.operator.evaluate(env)` will leave in `op` the entry  of `topEnv["+"]` 
which was accordingly initialized:

```js
// Code from the file src/eggvm.js ULL-ESIT-PL-2122/private-egg branch private2122
[ '+',  '-', '*', '/', '**', ].forEach(op => {
  topEnv[op] = new Function('...s', `return s.reduce((a,b) => a ${op} b);`);
});
```

Since `this.args` contains the array `[value{value: 2}, value{value:3}]` the map will leave in  `argsProcessed` the array `[2, 3]` and so line 11 `return op(...argsProcessed);` is interpreted as  the call `topEnv['+'](...[2,3])`


