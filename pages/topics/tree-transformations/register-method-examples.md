# Simple Example 

Code of the file [crguezl/hello-jscodeshift/hi-j-registermethods.js](https://github.com/crguezl/hello-jscodeshift/blob/master/hi-j-registermethods.js). It uses the `describe` function exported by [jscodeshift-helper](https://www.npmjs.com/package/jscodeshift-helper), a utility to help you explore jscodeshift.

```js
const describe = require('jscodeshift-helper').describe;
const keypress = require('./util/keypress');
```

The auxiliary module  [/crguezl/hello-jscodeshift/util/keypress.js](https://github.com/crguezl/hello-jscodeshift/blob/master/util/keypress.js) shows a way to pause the output and make the program wait for a keypress.

```js{19-23}
async function describeAndPause(obj) {
  describe(obj);
  await keypress()
}
```

Here is the code of the transformation function:

```js
async function main(fileInfo, api, options) {

  console.log("hello jscodeshift!");
  debugger;
  
  console.log("**********************fileInfo**************************");
  await describeAndPause(fileInfo);
  
  console.log("**********************options**************************");
  await describeAndPause(options);

  let j = api.jscodeshift;

  let jscColl = j(fileInfo.source);
  console.log("************* jscColl = j(fileInfo.source) *****************");
  await describeAndPause(jscColl);

  console.log('*****Register "findCalls" method: Now collections have the method "findCalls"***');
  j.registerMethods({
    findCalls: function() {
      return this.find(j.CallExpression);
    }
  });

  let callExpColl = jscColl.findCalls(); // Find all CallExpression AST nodes
  console.log("************* callExpColl = jscColl.findCalls() *****************");
  await describeAndPause(callExpColl);

  let removed = callExpColl.remove(); // Remove all CallExpression AST nodes
  console.log("************* removed = callExpColl.remove() *****************");
  await describeAndPause(removed);

  let final = removed.toSource(); // Convert the AST to source code
  console.log("************* final = removed.toSource() *****************");
  describe(final);
  process.stdin.pause();
  // Pauses the incoming 'data' events.
  return final;
};

module.exports = main;
```

Output:

```

> jscodeshift-learning@1.0.0 register
> git restore foo*.js; clear; ./use-hi-j-registermethods.js

Processing 1 files... 
Running in dry mode, no files will be written! 
hello jscodeshift!
**********************fileInfo**************************

---------------------------------------
This is a generic object.

{
  path: 'foo.js',
  source: 'var foo = 4;\nconsole.log(foo+foo /* twice foo */);\nconsole.log("foo");'
}

**********************options**************************

---------------------------------------
This is a generic object.

{ dry: true, print: true, verbose: 2, runInBand: true }

************* jscColl = j(fileInfo.source) *****************

---------------------------------------
This is a Collection with 1 item(s) of types: File, Node, Printable.

Description:
	A `Collection` is a generic collection of `NodePath`s. It only has a generic API to access and process the elements of the list. It doesn't know anything about AST types.

Methods:
	at - Returns a new collection containing only the element at position index. In case of a negative index, the element is taken from the end.
	childElements - 
	childNodes - 
	closest - 
	closestScope - 
	filter - Returns a new collection containing the nodes for which the callback returns true.
	findJSXElements - 
	findJSXElementsByModuleName - 
	findVariableDeclarators - 
	forEach - Executes callback for each node/path in the collection.
	get - Proxies to NodePath#get of the first path.
	getAST - 
	getTypes - 
	getVariableDeclarators - 
	insertAfter - 
	insertBefore - 
	isOfType - Returns true if this collection has the type `type`.
	map - Executes the callback for every path in the collection and returns a new collection from the return values (which must be paths). The callback can return null to indicate to exclude the element from the new collection. If an array is returned, the array will be flattened into the result collection.
	nodes - Returns an array of AST nodes in this collection.
	paths - 
	remove - 
	renameTo - 
	replaceWith - 
	size - Returns the number of elements in this collection.
	toSource - Returns pretty printed JS code.

References:
	https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation#collections
	https://github.com/facebook/jscodeshift/blob/master/src/Collection.js

*****Register "findCalls" method: Now collections have the method "findCalls"***
************* callExpColl = jscColl.findCalls() *****************

---------------------------------------
This is a Collection with 2 item(s) of types: CallExpression, Expression, ChainElement, Node, Printable.

Description:
	A `Collection` is a generic collection of `NodePath`s. It only has a generic API to access and process the elements of the list. It doesn't know anything about AST types.

Methods:
  ...

References:
	https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation#collections
	https://github.com/facebook/jscodeshift/blob/master/src/Collection.js

************* removed = callExpColl.remove() *****************

---------------------------------------
This is a Collection with 2 item(s) of types: CallExpression, Expression, ChainElement, Node, Printable.

Description:
	A `Collection` is a generic collection of `NodePath`s. It only has a generic API to access and process the elements of the list. It doesn't know anything about AST types.

Methods:
  ...

References:
	https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation#collections
	https://github.com/facebook/jscodeshift/blob/master/src/Collection.js

************* final = removed.toSource() *****************

---------------------------------------
This is a generic object.

'var foo = 4;'

var foo = 4;
 OKK foo.js
All done. 
Results: 
0 errors
0 unmodified
0 skipped
1 ok
Time elapsed: 3.053seconds 
{
  stats: {},
  timeElapsed: '3.053',
  error: 0,
  ok: 1,
  nochange: 0,
  skip: 0
}
```