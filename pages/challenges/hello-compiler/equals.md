---
practica: scope-intro
grupo: PE101
date: 2023/03/09
time: 8:30
---
# Añada  `==` al lenguaje

## Objetivo 

La librería [complex.js](https://www.npmjs.com/package/complex.js?__hstc=72727564.036ef8c78be07a16851a1b468004963e.1438150266326.1438150266326.1438150266326.1&__hssc=72727564.1.1438150266326&__hsfp=1960224772) soporta el método `equals` para comparar números complejos. 
Añada al lenguaje de la calculadora el operador `==` para comparar números complejos de manera que el siguiente programa de entrada:


```
2+3i == 4/2+(6/2)*i
```

produzca una salida como:

```
➜  hello-compilers-solution git:(challenges) ✗ bin/mmt.js -f test/input/equals.calc -j test/actualjs/equals.js
``` 
```js 
➜  hello-compilers-solution git:(challenges) ✗ cat test/actualjs/equals.js 
const { print,Complex } = require("/Users/casianorodriguezleon/campus-virtual/2324/pl2324/practicas/hello-compilers/hello-compilers-solution/src/support-lib.js");
/* end of preamble of generated code */
print(Complex('2').add(Complex('3i')).equals(
    Complex('4').div(Complex('2')).add(
        Complex('6').div(Complex('2')).mul(
            Complex('i')
        )
    )
  )
);
```


y cuando se ejecuta el anterior programa produce la siguiente salida:

```
➜  hello-compilers-solution git:(challenges) ✗ node test/actualjs/equals.js 
true
```

## Prioridad

**Establezca para el `==` la misma prioridad que tiene en el lenguaje JS**. 


## Pruebas

Añada pruebas unitarias para comprobar que el operador `==` funciona correctamente.