## Mocking 

Mocking means creating a fake version of an external or internal service that can stand in for the real one, helping your tests run more quickly and more reliably. **When your implementation interacts with an object’s properties, rather than its function or behavior, a mock can be used**.

## Stubbing 

Stubbing, like mocking, means creating a stand-in, but **a stub only mocks the behavior, but not the entire object**. This is used when your implementation only interacts with a certain behavior of the object.


To give an example: You can stub a database by implementing a simple in-memory structure for storing records. The object under test can then read and write records to the database stub to allow it to execute the test. This could test some behaviour of the object not related to the database and the database stub would be included just to let the test run.

If you instead want to verify that the object under test writes some specific data to the database you will have to mock the database. Your test would then incorporate assertions about what was written to the database mock.

## Ejemplos

See the code at [ast/test/test.mjs](https://github.com/ULL-ESIT-PL/hello-jison/blob/master/ast/test/test.mjs#L32-L39) in the repo hello-jison for an example of stubbing the `console.log`.

Cuando vaya a escribir las pruebas de la práctica [Hello Compilers](/practicas/hello-compiler.html#descripcion-de-la-tarea) podemos intentar una aproximación como esta:

1. Tomamos un objeto como `c = { text: "2@1&3", result: 2 }` con el atributo `text` conteniendo la expresión de prueba y el atributo `result` el resultado esperado después de la traducción y evaluación del código 
2. Construimos primero el árbol con `t = p.parse(c.text)`
3. Generamos el JavaScript con `js = escodegen.generate(t)`
4. Evaluamos el JavaScript con `result = eval(js)`
5. Si nuestro traductor es correcto `result` debería ser igual `c.result`

Suena bien ¿Verdad?

Pero en tal aproximación ¡tenemos un problema! y es que el código JavaScript generado para `"2@1&3"` nos han pedido que sea:

```js
➜  hello-compilers-solution git:(master) ✗ ./bin/mmt.js '2@1&3'
console.log(Math.max(2, Math.min(1, 3)));
```

y si evaluamos el código resultante:

```js
➜  hello-compilers-solution git:(master) ✗ node
Welcome to Node.js v16.0.0.
> result = eval("console.log(Math.max(2, Math.min(1, 3)));")
2
undefined
> result
undefined
```

¡La variable `result` está `undefined`! 

Esto es así porque la llamada a `console.log()` siempre retorna `undefined` (no se confunda por el `2` que aparece en `stdout` producido por el `console.log`. El valor retornado es `undefined`)

Así pues una aproximación como esta no funcionaría:

```js
const p = require("../src/maxmin.js").parser;
const escodegen = require("escodegen");
require("chai").should();

const Checks = [
  { text: "2@1&3", result: 2 },
  { text: "2@1@3", result: 3 },
  { text: "2&1&3", result: 1 },
  { text: "2&1@3", result: 3 },
  { text: "2&(1@3)", result: 2 },
];

describe("Testing hello maxmin translator", () => {
  for (let c of Checks) {
    it(`Test ${c.text} = ${c.result}`, () => {
      const t = p.parse(c.text);
      const js = escodegen.generate(t);
      const result = eval(js);

      result.should.equal(c.result);
      
      console.log = oldLog;
    });
  }
});
```

No funcionaría porque lo que queda en `result` es `undefined` y no el resultado de `Math.max(2, Math.min(1, 3))`.
En efecto, al ejecutar las pruebas obtenemos:

```
1) Testing hello maxmin translator
       Test 2@1&3 = 2:
     TypeError: Cannot read property 'should' of undefined
```

¿Cómo arreglarlo?

¡El patrón de Stubbing al rescate!

Sustituyamos el método `log` del objeto `console` con nuestra propia función adaptada a nuestras necesidades de  testing `console.log = x => x;` que retorna el valor del argumento pasado a `console.log`. De esta forma podemos acceder al valor de la evaluación de la expresión:

```js{2,3}
it(`Test ${c.text} = ${c.result}`, () => {
      let oldLog = console.log;
      console.log = x => x;

      const t = p.parse(c.text);
      const js = escodegen.generate(t);
      const result = eval(js);

      result.should.equal(c.result);
      
      console.log = oldLog;
    });
  }
});
```

Ahora `result` contiene la evaluación de la expresión y las pruebas funcionan:

```
➜  hello-compilers-solution git:(master) ✗ npm test

> hello-compilers@1.0.1 test
> npm run build; mocha


> hello-compilers@1.0.1 build
> jison src/maxmin-ast.jison src/maxmin.l -o src/maxmin.js



  Testing hello maxmin translator
    ✔ Test 2@1&3 = 2
    ✔ Test 2@1@3 = 3
    ✔ Test 2&1&3 = 1
    ✔ Test 2&1@3 = 3
    ✔ Test 2&(1@3) = 2


  5 passing (9ms)
  ```