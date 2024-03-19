---
title: "Scope Analysis and Translation: Translating From Egg to JavaScript" 
categories: ["practicas"] 
rubrica:
  - "Se añadió  una opción -j --js al ejecutable o bien en su directorio bin hay un nuevo ejecutable egg2js.js que permite hacer la traducción"
  - "Traduce correctamente todos los ejemplos en la descripción de la práctica"
  - "La solución presentada respeta el principio OPEN/CLOSED"
  - "En lo posible se respeta la semántica de Egg y en dodne no se documenta apropiadamente"
  - "El número de constructos Egg traducidos es un criterio en la calificación de esta práctica"
  - "Opcional: Se proporciona información de localización (offset, etc.)"
  - Se ha hecho un buen uso del versionado semántico en la evolución del módulo
  - El superproyecto está correctamente estructurado usando submódulos
  - Se ha publicado en GitHub Registry 
  -
    - Pruebas
    - Se provee una carpeta `examples`  con ejemplos de programas `egg``
    - Se ha automatizado el proceso de pasar del "*ejemplo que funciona*" a "*test unitario que prueba que funciona*"
    - Se hace integración contínua tanto en desarrollo como en producción
  - 
    - Documentación
    - Ejecutables, Lenguaje, ASTs, etc.
    - Documentación del módulo npm (API) y ejecutables 
    - "Opcional: publicar la documentación de la API usando GitHub Pages en la carpeta `docs/`. Informe de cubrimiento"
--- 

## Goals

Write a translator from the [Egg](https://eloquentjavascript.net/12_language.html) language to the JavaScript language.

Reuse your parser to create the parse trees. Add traversal functions of the ASTs to generate the JS code.

## On the Preservation of Semantics

None of these quotes will serve as an excuse for your Egg to JS translator not to be faithful to the original Egg interpreter

::: tip Negative Quotes
> The original is unfaithful to the translation.

- Jorge Luis Borges, book *Other Inquisitions*

Borges poses the idea that, in some ways, the translation may be *true*r to the *fundamental spirit* of the original than the original itself.
Equivalent excuse: *"The JS semantics of my translator is better than the one in the original Egg"*

You can also try to say that, according to Robert Frost, it is because there is too much poetry in the original Egg:

> Poetry is what gets lost in translation

- Robert Frost
:::


Instead you have to follow Gunter Grass:

::: tip Positive Quotes

> Translation is that which transforms everything so that nothing changes

- Gunter Grass
:::

### Etimology 

> The word 'translation' comes, etymologically, from the Latin for 'bearing across'. Having been borne across the world, we are translated men. It is normally supposed that something always gets lost in translation; I cling, obstinately to the notion that something can also be gained

-  Salman Rushdie, Imaginary Homelands: Essays and Criticism 1981-1991

Here there are a few ethimological entries:

- traductĭo, -ōnis (latin): *hacer pasar de un lugar a otro*, *to move from one place to another*
- translatio (classical latin): traslación, translation
- interpretatio: interpretación, interpretation
- übersetzen (german): *pasar a la otra orilla*, *cross over to the other shore*, ex. *Wir haben über den Fluss übergesetzt*

## The Compiler

Add a `-j --js` option to your compiler executable, or add a new `egg2js.js` executable to your `bin` directory to do the translation
 

## Translating Arithmetic Expressions

When the program is given input with Egg expressions of type *apply* like these:

```ruby
$ cat examples/times.egg
print(
 +(3,
    *(4,
      5
    )
  ),
  -(9,3)
)
```

should output an `examples/times.js` file with output similar to this:

```
➜  egg2js-solution git:(master) git remote -v
origin  git@github.com:ULL-ESIT-PL-2122/egg2js-solution.git (fetch)
origin  git@github.com:ULL-ESIT-PL-2122/egg2js-solution.git (push)
➜  egg2js-solution git:(master) git -P lg -n 1
6e62885 - (HEAD -> master, origin/master) test/testfiles/generatingJS (hace 2 minutos Casiano Rodriguez-Leon)
```
```js
➜  egg2js-solution git:(master) bin/egg.js test/testfiles/generatingJS/times.egg -J
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
runtimeSupport.print((3 + (4 * 5)), (9 - 3))
``` 

Observe how the JS expression is fully parenthesized 

```
➜  egg2js-solution git:(master) bin/egg.js test/testfiles/generatingJS/times.egg -j
➜  egg2js-solution git:(master) node test/testfiles/generatingJS/times.egg.js 
23 6
```

Here is another example but with an arithmetic string expressions instead:

```ruby
➜  egg2js-solution git:(master) ✗ cat ex/string.egg 
print(+(
    "hello",
    +(
        " ",
        "world"
    )
))
``` 
```js
➜  egg2js-solution git:(master) ✗ bin/egg.js -J ex/string.egg
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
runtimeSupport.print(('hello' + (' ' + 'world')))
```
```
➜  egg2js-solution git:(master) ✗ bin/egg.js -j ex/string.egg
➜  egg2js-solution git:(master) ✗ node ex/string.egg.js 
hello world
```

## Translating Value nodes

The `generateJS` for the `Value` class is almost trivial:

```js
class Value extends Ast {
  constructor(value) { ... }
  evaluate() { ... }

  generateJS() {
    if (typeof this.value === 'number') {
      return this.value;
    }
    return `'${this.value}'`;
  }
}
```

## Translating Word nodes

Observe how we concatenate the prefix string `'$'` to all the source variables in order to avoid clashes with any variables we will need  for our translation algorithm.

For instance `Egg.print`! What if the egg source code has a variable with name `Egg`?
This way we are on safe ground.

```js
class Word extends Ast {
  constructor(name) { ... }
  evaluate(env) { ... }

  generateJS(scope) {
      let eggName = '$'+this.name;
      setAsUsed(scope, eggName);
      return eggName;
  }
}
```

The utility function `setAsUsed` is imported from `'../utils/scope.js'`.
It saves in the current symbol table that the variable is being **used** in the current scope. 

Later, when the scope is **closed** we will check that all **used** variables were declared.


## Adding `generateJS` Methods to the AST nodes 

An approach that I have followed when doing this practice is to add `generateJS` methods to each of the different types of AST nodes that are responsible for generating the JS code corresponding to that type of node. These methods always receive as a parameter the symbol table for the current scope.

Inside the file `ast.js` we wrote:

```js
const { setAsUsed } = require('../utils/scope.js');
const {specialForms} = require('../eggInterpreter/specialForms.js');
const {generateJSForms} = require('../generateJS/generateJSForms.js');

class Ast { ... } // Abstract class 
``` 

## Translating Apply nodes 

```js
class Apply extends Ast {
  constructor(tree, args = []) { ... }
  evaluate(env) { ... }

  generateJS(scope) {
    if (this.operator.type === 'word') {
      if (generateJSForms[this.operator.name]) {
        return generateJSForms[this.operator.name](this.args, scope);
      } 
      else {
        let opTranslation = this.operator.generateJS(scope);
        if (opTranslation && scope[opTranslation].declared) {
          let argsTranslated = this.args.map(arg => arg.generateJS(scope));
          return `${opTranslation}(${argsTranslated})`; 
        } 
        else if (opTranslation && !scope[opTranslation].declared){ 
          if (this.operator.name in specialForms) {
            let errorMsg = `Translation of "${this.operator.name}" not implemented yet.\n`;
            console.error(errorMsg);
            process.exit(1);
          }
          console.warn(`Warning: Non declared symbol "${this.operator.name}" used as function.\n`);
          let argsTranslated = this.args.map(arg => arg.generateJS(scope));
          return `${opTranslation}(${argsTranslated})`; 
        }
        else {
          let errMsg = `Fatal error.\n`+
              `AST=${JSON.stringify(this)}.\nscope=${JSON.stringify(scope)}.\n`;
          console.error(errMsg);
          process.exit(0);
        }
      }
    } else if (this.operator.type == 'apply') {
      let argsTranslated = this.args.map(arg => arg.generateJS(scope));
      return `${this.operator.generateJS(scope)}(${argsTranslated})`;
    }
  }
```

### Not Implemented Constructs

Here is an example that activates lines 18-20 since `while` is in `specialForms` but its translator has not being implemented yet:

```ruby
➜  egg2js-solution git:(master) ✗ cat ex/not-implemented.egg          
do(
    def(i, 1),
    while(<(i, 4),
      do(
        print(i),
        =(i, +(i,1))  
      )
    )
)
```

When executes produces:

```  
➜  egg2js-solution git:(master) ✗ bin/egg.js -J ex/not-implemented.egg
Translation of "while" not implemented yet.
```

### Translating applys onto applys

Lines 33-35 of the method take care of the case when `this.operator.type` is `apply`.

Note that in Egg the operator of an apply can itself be an apply as in this example with the expression `f(2)(4)`:

```js
➜  egg2js-solution git:(master) ✗ cat examples/generatingJS/funfun.egg
do(
  def(f, fun(x, fun(y, +(x,y)))),
  print(f(2)(4)) # 6
)
```

It is therefore necessary to correctly translate the operator:

```
➜  egg2js-solution git:(master) ✗ bin/egg.js examples/generatingJS/funfun.egg -J
```
```js
➜  egg2js-solution git:(master) bin/egg.js -J examples/generatingJS/funfun.egg
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
var $f;
(() => {
  $f = function($x) {
    return function($y) {
      return ($x + $y)
    }
  };
  return runtimeSupport.print($f(2)(4))
})()
```

## Strategy Pattern Again

To make it easier to generate JS code you may find it useful to follow the *Strategy Pattern* and have a module that exports a `generateJS` map/hash whose keys are
the same as in `specialForms` and `topEnv` and the values are the corresponding
JS code generation functions. In this way we avoid as far as possible violating the OPEN/CLOSED principle:

```js

let generateJSForms = Object.create(null);

['+', '-', '*', '/', '==', '<', '>', '&&', '||' ].forEach(op => {
  generateJSForms[op] = function(args, scope) {
    ...
  }
});

generateJSForms["print"] = function(args, scope) {
  ...
};

generateJSForms["do"] = function(args, scope) {
  ...
};

generateJSForms["fun"] = generateJSForms["->"] = function(args, scope) {
  ...
};

generateJSForms["="] = generateJSForms["set"] = function(args, scope) {
  ... 
};

generateJSForms[':='] = 
generateJSForms['def'] = 
generateJSForms['define'] = function(args, scope) {
  ...
};

module.exports = { generateJSForms };
```
 
## Compiling the input program: compileToJS

Some scope analysis is needed. Again, we can use a hash list to keep track of the declarations and uses of the symbols in the input  program. Such data structure is called a  Symbol Table. Our symbol tables are objects with the following structure:

```
{
  key is the variable: { declared: true if declared, used: true if used }
}
```

Here is the entry function `compileToJS` that initiates the translation:

```js
function compileToJS(fileName) {
  let topScope = Object.create(null);
  Object.keys(topEnv).forEach((key) => {
    topScope[key] = { declared: true};
  });

  let scope = Object.create(topScope);

  const template = (declarations, jsCode) => declarations.length?
                      `var ${declarations.join(',')}; ${jsCode}`: 
                      jsCode;

  try {
    let program = fs.readFileSync(fileName, 'utf8');
    let tree = parse(program);
    let jscode = json2Ast[tree.type](tree).generateJS(scope);
    checkDeclarationsIn(scope, "In global program");
    return template(Object.keys(scope), jscode);
  }
  catch (err) {
    console.log(err.message);
    process.exit(0);
  }
}
```

## Checking Declarations: checkDeclarationsIn

Since we are using JS inheritance chain the search in the symbol table is automatically made by JS. Awfully simple!

```js

function checkDeclarationsIn(localScope, message) {
  Object.keys(localScope).forEach((key) => {
    if (!localScope[key].declared) {
      //console.warn
      throw new TypeError(`Variable "${key.slice(1)}" is not declared. ${message? message : ""}`);
    }
  })
}
```

The following image illustrates the search on a C compiler in the scope analysis phase for a non declared variable `i = 2`:  

![](/images/scope-analysis-non-declared-variable.png)

Here is an example that illustrates the typical info to store in a symbol table and how the AST *variable **use** nodes* have references to its *variable **declarations*** stored in the symbol table:

![](/images/global-symbol-table-c-like.png)

### References

* [Experimental Language: EXPL](https://silcnitc.github.io/) Write your own compiler!. An educational platform for compiler construction ([silcnitc](https://github.com/silcnitc))

## Runtime Library Support

You may find it useful to write a `runtime-support.js` library with functions that support running the translated JS programs. Something like that:

```js
➜  egg2js-solution git:(master) ✗ cat lib/generateJS/runtimeSupport.js 
runtimeSupport = {
  /**
   * print function emulating egg print behavior
   * @param  {...any} args 
   */
  print: (...args) => {
    console.log(...args);
    return args;
  }
  /* ... */
};

module.exports = runtimeSupport;
```

To reach the runtime support library in an independent manner, you can use the fact that **wherever it is installed the path relative to the caller is going to be the same**:

```js
const jsBeautify = require('js-beautify');
const jsBeautifyConfig = {
  indent_size: 2,
  space_in_empty_paren: true,
  end_with_newline: true,
  preserve_newlines: false
}

const compileToJsAndBeautify = (eggFile) => {  
  let compiledJS = `
  const path = require('path');
  const runtimeSupport = require(
    path.join(
      '${__dirname}', 
      "..", 
      "generateJS", 
      "runtimeSupport"
    )
  );
  
  ${compileToJS(eggFile)}
  `;
  
  let compiledJSBW = jsBeautify(compiledJS, jsBeautifyConfig);
  return compiledJSBW;
}
``` 


## Translating a do

The `do` in Egg returns the last expression evaluated, whereas a JS block is not an expression.
So I can't translate `do(...)` directly into a JS `{ ... }` block.


### Translation Scheme: Using Anonymous Functions

Observe how is this translation that we have made of a `do`:

```ruby
➜  egg2js-solution git:(master) ✗ cat examples/generatingJS/do.egg
print(
  do(
    def(a,1),
    =(a,9),
    def(b, +(a,1))
  )
)                                                                                           
```

can be translated as:

```js
➜  egg2js-solution git:(master) bin/egg.js examples/generatingJS/do.egg -J
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
var $a, $b;
runtimeSupport.print((() => {
  $a = 1;
  $a = 9
  return $b = ($a + 1);
})())
```

See how the scope is created using an anonymous function `(() => { ... })()` that is executed on the fly *so that it returns the last expression evaluated*.

We have not made use of a direct translation of a `do` by a compound statement

```js
{ ... }
```

and we have taken this pains to respect the semantics of Egg.

In general, make sure that any JS program resulting from the translation of an Egg program produces the same results as when the Egg program is parsed.

Here is the hash `generateJSForms["do"]` entry for this `do` translation strategy:

```js 
generateJSForms["do"] = function(args, scope) { 
  let argsTranslated = args.map(arg => arg.generateJS(scope));
  const lastOne = argsTranslated.pop();

  const template = (expressions, lastOne) => {
    return `(()=>{
      ${expressions.join("\n")}
      return ${lastOne}
    })()`;
  }

  return template(argsTranslated, lastOne);
};
```

### Another translation Scheme for do 

But, is the case with `do`, we can have more than one translation scheme for the same source construct. For instance, for the tanslation of the `do` we can follow this alternative approach:

```js
generateJSForms["do"] = function(args, scope) {
  debugger;
  
  let argsTranslated = args.map(arg => arg.generateJS(scope));

  const template = (expressions) => {
    return `(${expressions.join(", ")})`;
  }

  let temp = template(argsTranslated);

  return temp;
};
```

That for the same input example `do.egg`:

```ruby
➜  egg2js-solution git:(master) cat ex/do.egg         
print(
  do(
    def(a,1),
    =(a,9),
    def(b, +(a,1))
  )
)
```
Produces this  translation:

```js
➜  egg2js-solution git:(master) bin/egg.js -J ex/do.egg
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
var $a, $b;
runtimeSupport.print(($a = 1, $a = 9, $b = ($a + 1)))
```

Take notice of the importance of the nested parenthesis `(($a =1, ...))`. 
If we were using a single parenthesis instead, the meaning will be quite different!

That produces the same result than the interpreted egg program:

```
➜  egg2js-solution git:(master) bin/egg.js -xj ex/do.egg
10
```

## Translating a def

Here you have a translation strategy for the `def`:

```js 
generateJSForms[':='] = 
generateJSForms['def'] = 
generateJSForms['define'] = function(args, scope) {
  if (args.length != 2)  throw new Error('define only accepts two arguments');
  let [variable, expr] = args.map(arg => arg.generateJS(scope));
  setAsDeclared(scope, variable);
  return `${variable} = ${expr};`;
};
```

And here is an example of use:

```ruby
➜  egg2js-solution git:(master) ✗ cat ex/declared-twice.egg
do(
    def(a,4),
    def(a,5),
    def(b, 9),
    print(+(a,b))
)
```

That when compiled produces:

```js
➜  egg2js-solution git:(master) ✗ bin/egg.js -J ex/declared-twice.egg
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
var $a, $b;
(() => {
  $a = 4;
  $a = 5;
  $b = 9;
  return runtimeSupport.print(($a + $b))
})()
```

If we run the resulting js we get:

```
➜  egg2js-solution git:(master) ✗ bin/egg.js -Jj ex/declared-twice.egg
➜  egg2js-solution git:(master) ✗ node ex/declared-twice.egg.js 
14
```

## A more complex example: Managing Scopes

When variables and functions are declared and new scopes are created like in this example (assume that in addition to the functions the `do` has its own scope):

```js
➜  egg2js-solution git:(master) ✗ cat examples/generatingJS/hello-scope.egg
print("computed value = ", 
  do(
    def(x,4),
    def(inc, fun(w, do(
        def(y, 999),
        +(w,1)
      ) # do
    ) # fun
    ),# def
    def(z,-1),
    set(x, inc(x))
  )
)
```

The translation should produce the equivalent JavaScript code:

```
➜  egg2js-solution git:(master) ✗ bin/egg.js examples/generatingJS/hello-scope.egg -J
```
```js
➜  egg2js-solution git:(develop) ✗ bin/egg.js examples/generatingJS/hello-scope.egg -J
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
var $x, $inc, $z;
runtimeSupport.print('computed value = ', (() => {
  $x = 4;
  $inc = function($w) {
    var $y;
    return (() => {
      $y = 999;
      return ($w + 1)
    })()
  };
  $z = -1;
  return $x = $inc($x)
})())
```

Notice how we prefix source variables with "`$`" so that statements like `def(x,4)` become:

```js
  var $x, $inc, $z;
  $x = 4;
```

this is done so that *translated variables* don't **collide** with auxiliary variables that we might need to introduce to support the translation.


## Visual Appearance of the Generated Code

You can use some module like this:

* [js-beautify](https://www.npmjs.com/package/js-beautify) npm module

to improve the visual appearance of the exit code

## Exercise: Translation Scheme for While

Write a translation scheme for the  Egg `while` loop.
Assume the Egg `while` loop always returns `false`.

Try your proposal with this example:

```ruby
➜  egg2js-solution git:(master) cat examples/generatingJS/while.egg
do(
    def(a,1),
    while(<(a,4),
      do(
        print(a),
        =(a, +(a,1))
      )
    )
)
```

Execution:

```
➜  egg2js-solution git:(master) bin/egg.js -xj ex/while.egg       
1
2
3
``` 

## Translating Property nodes

As exercise do the `generateJS` translation function for the `Property` class.

```js
class Property extends Ast { ... }

module.exports = {Value, Word, Apply, Property };
```

## References

* [Repo ULL-ESIT-PL-2122/egg2js-solution](https://github.com/ULL-ESIT-PL-2122/egg2js-solution) private
* [Repo ULL-ESIT-GRADOII-PL/egg2js](https://github.com/ULL-ESIT-GRADOII-PL/egg2js) private
* [Lab Generating JS 2020/2021](https://ull-esit-pl-2021.github.io/practicas/generating-js)
  * [labs generating js 2020/2021](https://github.com/orgs/ULL-ESIT-PL-2021/repositories?q=generating-js&type=all&language=&sort=)
* [Apuntes 2019/2020 de PL: Compilador de Egg a JS](https://ull-esit-pl-1819.github.io/introduccion/tfa/#compilador-de-egg-a-js)