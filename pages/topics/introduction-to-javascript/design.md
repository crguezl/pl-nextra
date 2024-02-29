---
title: "The Open Closed Principle and the Strategy Pattern"
---

## Code Smells

### Definición de *Code Smell* de la Wikipedia:

According to Martin Fowler, *"a **code smell** is a surface indication that usually corresponds to a deeper problem in the system"*.

Smells are certain structures in the code that indicate violation of fundamental design principles and negatively impact design quality.

Code smells **are usually not bugs**. They are not technically incorrect and do not currently prevent the program from functioning. Instead, **they indicate weaknesses in design** that may be slowing down development or increasing the risk of bugs or failures in the future.


### Application-level smells:
* **Duplicated code:** identical or very similar code exists in more than one location.
* **Contrived complexity:** forced usage of overcomplicated design patterns where simpler design would suffice.

### Class-level smells:
* **Large class:** a class that has grown too large. See God object.
* **Feature envy:** a class that uses methods of another class excessively.
* **Inappropriate intimacy:** a class that has dependencies on implementation details of another class.
* **Refused bequest:** a class that overrides a method of a base class in such a way that the contract of the base class is not honored by the derived class. See Liskov substitution principle.
* **Lazy class / Freeloader:** a class that does too little.
* **Excessive use of literals:** these should be coded as named constants, to improve readability and to avoid programming errors. Additionally, literals can and should be externalized into resource files/scripts where possible, to facilitate localization of software if it is intended to be deployed in different regions.
* **Cyclomatic complexity:** too many branches or loops; this may indicate a function needs to be broken up into smaller functions, or that it has potential for simplification.
* **Downcasting:** a type cast which breaks the abstraction model; the abstraction may have to be refactored or eliminated.
* **Orphan Variable or Constant class:** a class that typically has a collection of constants which belong elsewhere (typically a problem when using a Constants class ) where those constants should be owned by one of the other member classes.

### Method-level smells:

* **Too many parameters:** a long list of parameters is hard to read, and makes calling and testing the function complicated. It may indicate that the purpose of the function is ill-conceived and that the code should be refactored so responsibility is assigned in a more clean-cut way.
* **Long method:** a method, function, or procedure that has grown too large.
* **Excessively long identifiers:** in particular, the use of naming conventions to provide disambiguation that should be implicit in the software architecture.
* **Excessively short identifiers:** the name of a variable should reflect its function unless the function is obvious.
* **Excessive return of data:** a function or method that returns more than what each of its callers needs.

### Switch Smell

* El uso de un `switch` es a veces un punto débil: si introducimos nuevas casos deberemos modificar el código de la clase original en la que está el switch introduciendo un nuevo `case`.

 Viola el principio *Open/Closed*.

## El principio *Open/Closed*

* *"software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification"*;
that is, such an entity can allow its behaviour to be extended without modifying its source code.

### Ejemplo de Violación del Principio Open/Closed

El diseño inicial del lenguaje Egg viola el Principio Open/Close:

```
[~/.../PLgrado/eloquentjsegg(master)]$ sed -ne '/fun.*evaluate/,/^}/p'  lib/eggvm.js
```

```js
function evaluate(expr, env) {
  switch(expr.type) {
    case 'value': return expr.value;
    case 'word':
      if (expr.name in env) {
        return env[expr.name];
      } else {
        throw new ReferenceError(`Undefined variable: ${expr.name}`);
      }
    case 'apply':
      if (expr.operator.type == 'word' && expr.operator.name in specialForms) {
        return specialForms[expr.operator.name](expr.args, env);
      }
      let op = evaluate(expr.operator, env);
      if (typeof op != "function") {
        throw new TypeError('Applying a non-function');
      }
      return op(...expr.args.map((arg) => evaluate(arg, env)));
  }
}
```

## Design patterns

A design pattern is a general, reusable solution to a commonly occurring problem.

It is not a finished design that can be transformed directly into source or machine code. It is a description or template for how to solve a problem that can be used in many different situations. Design patterns are formalized best practices that the programmer can use to solve common problems when designing an application or system.

Design patterns may be viewed as a structured approach to computer programming intermediate between the levels of
* a programming paradigm and
* a concrete algorithm.

## Strategy Pattern

La solución para eliminar el *Switch Smell* es usar el `strategy design pattern`. 

The basic idea  of the `strategy design pattern` is to **delegate tasks to encapsulated algorithms which are interchangable at runtime**.

In the Strategy pattern we have an object (the *context*) that is trying to get something done. But to get that thing done, we need to supply the context with a second object, called the *strategy*, that helps￼ to get the thing done.

  1. Define a family of objects which all do the same thing
  2. Ensure the family of objects share the same interface so that they are interchangable.

<!--
Otro ejemplo, también de Elijah Manor se encuentra en el artículo [Switching to the Strategy Pattern in JavaScript](https://elijahmanor.com/switching-to-the-strategy-pattern-in-javascript/).

## Eliminate JavaScript Code Smells

Vea el Vídeo  de Elijah Manor.

Presta especial atención al *code smell* **Switch Statement Smell** desde el minuto 11:37 al 29:15.

<youtube id="JVlfj7mQZPo"></youtube>

Pueden encontrar las [trasparencias](http://elijahmanor.com/talks/js-smells/#/) de la presentación en [http://elijahmanor.com/talks/js-smells/#/](http://elijahmanor.com/talks/js-smells/#/).
-->

## Example of the strategy Pattern: HTTP file server fron Eloquent JS

Repo ULL-MII-SYTWS-1920/eloquent-javascript-exercises [solution 20_3_public_space/server.js](https://github.com/ULL-MII-SYTWS-1920/eloquent-javascript-exercises/blob/master/20_3_public_space/server.js)
  
```
[~/.../chapter20-nodejs/juanIrache-20_3_public_space(master)]$ pwd -P
/Users/casiano/local/src/javascript/eloquent-javascript-3/juanIrache-solutions/20_3_public_space
```

```js
const { createServer } = require('http');

const methods = Object.create(null);

createServer((request, response) => {
  let handler = methods[request.method] || notAllowed;
  console.log(`method= ${request.method} url=${request.url}`);
  handler(request)
    .catch(error => {
      if (error.status != null) return error;
      return { body: String(error), status: 500 };
    })
    .then(({ body, status = 200, type = 'text/plain' }) => {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'PUT, GET, OPTIONS, DELETE, MKCOL');
      response.writeHead(status, { 'Content-Type': type });
      if (body && body.pipe) body.pipe(response);
      else response.end(body);
    });
}).listen(8000);

async function notAllowed(request) {
  return {
    status: 405,
    body: `Method ${request.method} not allowed.`
  };
}

const { parse } = require('url');
const { resolve, sep } = require('path');

const baseDirectory = process.cwd();

function urlPath(url) {
  let { pathname } = parse(url);
  let path = resolve(decodeURIComponent(pathname).slice(1));
  if (path != baseDirectory && !path.startsWith(baseDirectory + sep)) {
    throw { status: 403, body: 'Forbidden' };
  }
  return path;
}

const { createReadStream } = require('fs');
const { stat, readdir, mkdir } = require('fs').promises;
const mime = require('mime');

methods.GET = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != 'ENOENT') throw error;
    else return { status: 404, body: 'File not found' };
  }
  if (stats.isDirectory()) {
    return { body: (await readdir(path)).join('\n') };
  } else {
    return { body: createReadStream(path), type: mime.getType(path) };
  }
};

const { rmdir, unlink } = require('fs').promises;

methods.DELETE = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != 'ENOENT') throw error;
    else return { status: 204 };
  }
  if (stats.isDirectory()) await rmdir(path);
  else await unlink(path);
  return { status: 204 };
};

const { createWriteStream } = require('fs');

function pipeStream(from, to) {
  return new Promise((resolve, reject) => {
    from.on('error', reject);
    to.on('error', reject);
    to.on('finish', resolve);
    from.pipe(to);
  });
}

methods.PUT = async function(request) {
  let path = urlPath(request.url);
  await pipeStream(request, createWriteStream(path));
  return { status: 200, body: path };
};

methods.MKCOL = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    await mkdir(path);
    return {status: 204};
  }
  if (stats.isDirectory()) return {status: 204};
  else return {status: 400, body: "Not a directory"};
};

methods.OPTIONS = async function(request) {
  return { status: 204 };
};
```

## Ejemplo: OOP Temperature Converter Removing Switch Smell

[ULL-ESIT-GRADOII-DSI/temperature-oop-noswitch](https://github.com/ULL-ESIT-GRADOII-DSI/temperature-oop-noswitch/tree/sepfiles)

## Referencias

* [Apuntes del curso 15/16: Code Smells/Código Hediondo](https://casianorodriguezleon.gitbooks.io/pl1516/content/apuntes/codesmell.html)
* [Apuntes del curso 16/17: Patrones de Diseño](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/patterns/)
* [Apuntes del curso 15/16: Eliminando Switch Smell](https://casianorodriguezleon.gitbooks.io/pl1516/content/practicas/noswitchsmell.html)
* [Apuntes del curso 16/17: Strategy Pattern](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/patterns/strategypattern.html)
* [Apuntes del curso 16/17: Práctica: Evaluar Strategy Pattern](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicaevaluastrategypattern.html)
* [Apuntes del curso 16/17: Práctica: Creación de Paquetes NPM y Strategy Pattern](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicamodulestrategypattern.html)
* [JSHint](http://jshint.com/)
