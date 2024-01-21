### Parsing JSON 

#### Question 

* [Exam Parsing JSON](/assets/old-exam-sample.pdf): pdf file. Question: Parse the JSON Language 
  
#### Examples of Solutions

* [Solution: JSON parser in nearley.js](https://github.com/ULL-ESIT-PL/learning-nearley/blob/main/examples/json.ne)
  * Task to do: Improve the solution by using your own lexical analyzer generator instead of the current moo lexer, removing the explicit use of white spaces (syntactic variable `_` like in the production rule `pair -> key _ ":" _ value`) in the Nearley grammar
* [Solution: JSON parser in yacc](https://gist.github.com/justjkk/436828/)
* [Solution: JSON parser in pegjs](https://github.com/pegjs/pegjs/blob/master/examples/json.pegjs)

### Translator from Egg AST to AST Term 

#### Question 

Example of a second part for the exam: 

Assume the input JSON contains an Egg AST and translate it to AST Term notation.

Here is an example. Given the input program:

```ruby
➜  evm2term git:(master) cat examples/property.egg 
x["sub", 1]("length") # 3
``` 

Whose JSON looks like:

```json
➜  evm2term git:(master) head -n 4 examples/property.json 
{
  "type": "apply",
  "operator": {
    "type": "property",
```

The output of the `evm2term` translator will be:

```js
➜  evm2term git:(master) evm2term examples/property.json 
apply(op:property(op:word{x}, args:[value{sub},value{1}]), args:[value{length}])
```

Possible Improvements if you decide it to present as TFA: 

- Add pretty printing of the term
- Give support to JS Esprima ASTs
- Make it generic so that any compiler AST can be added via some configuration

#### Example of Solution

* See package [evm2term](https://www.npmjs.com/package/evm2term) and file [crguezl/evm2term/index.js](https://github.com/crguezl/evm2term/blob/master/index.js) for a solution using `estraverse`
