---
practica: scope-intro
grupo: PE103
date: 2023/03/10
time: 12:00
---

# Challenge: Añada  El ángulo de un complejo al lenguaje

## Objetivo 

Añada una notación `<(c)` para el ángulo de un número complejo, de manera que el siguiente programa de entrada:

```
➜  hello-compilers-solution git:(challenges) ✗ cat test/input/arg.calc 
<(1+i)
```

cuando se compila produce una salida como:

```
➜  hello-compilers-solution git:(challenges) ✗ bin/mmt.js -f test/input/arg.calc -j test/actualjs/arg.js
➜  hello-compilers-solution git:(challenges) ✗ cat test/actualjs/arg.js  
```

```js /arg/
const { print,Complex } = require("/Users/casianorodriguezleon/campus-virtual/2324/pl2324/practicas/hello-compilers/hello-compilers-solution/src/support-lib.js");
/* end of preamble of generated code */
print(Complex('1').add(Complex('i')).arg());
```

que cuando se ejecuta produce la siguiente salida:

```
➜  hello-compilers-solution git:(challenges) ✗ node test/actualjs/arg.js       
0.7853981633974483
➜  hello-compilers-solution git:(challenges) ✗ node -e 'console.log(Math.PI/4)'                         
0.7853981633974483
```

## Pruebas

Añada pruebas para la nueva funcionalidad.