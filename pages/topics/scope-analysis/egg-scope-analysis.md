---
draft: true
---

# Example of Scope Analysis in Egg

This code was developed by David Afonso Dorta.

See <https://github.com/ULL-ESIT-PL-1920/TFA-davafons>
and <https://github.com/ULL-ESIT-PL-1920/TFA-davafons>

```js
const estraverse = require("estraverse");
```

```js
const { TopEnv, SpecialForms } = require("../interp/environment.js");
const { Apply, Word } = require("../interp/ast.js");

const SCOPE_OPERATORS = ["do", "if", "while", "for", "foreach", "fun", "->", "object"];
const DEFINE_OPERATORS = [":=", "define", "def"];
const SET_OPERATORS = ["set", "<-"];
const FUNCTION_OPERATORS = ["fun", "->"];
const OBJECT_OPERATORS = ["object", "obj"];
```

```js
class Semantic {
  constructor(symboltable) {
    if (symboltable === undefined) {
      this.symboltable = Object.create(null);
    } else {
      this.symboltable = symboltable;
    }
  }

  check(tree) {
    const methods = this;

    tree = estraverse.replace(tree, {
      enter: function(node, parent) {
        if (node.type === "apply") {
          node = methods.checkApplyEnter(node);
        } else if (node.type === "word") {
          node = methods.checkWordEnter(node, parent);
        }

        return node;
      },
      leave: function(node) {
        if (node.type === "apply") {
          node = methods.checkApplyLeave(node);
        }

        return node;
      },
      keys: {
        apply: ["args"],
        word: [],
        value: [],
        regex: []
      },
      fallback: "iteration"
    });

    return tree;
  }

  static check(tree) {
    return new Semantic().check(tree);
  }

  checkApplyEnter(node) {
    if (node.operator.type == "word") {
      const operator_name = node.operator.name;

      // Assert that the arguments passed to the apply are correct
      // this.assertApplyArgs(node);

      // If entered on a new scope, create a child symboltable
      if (SCOPE_OPERATORS.includes(operator_name)) {
        this.symboltable = Object.create(this.symboltable);
      }

      // If the operator is a "define" operator, add the new symbol to the symboltable
      if (DEFINE_OPERATORS.includes(operator_name)) {
        node.args[0] = this.addToSymboltable(node.args[0]);
      }

      if (SET_OPERATORS.includes(operator_name)) {
        const symbol = this.findInSymboltable(node.args[0].name);

        if (symbol && symbol.const) {
          throw new TypeError(`${node.args[0].name} is const and can't be reassigned!`);
        }
      }

      // Add function arguments to function symboltable
      if (FUNCTION_OPERATORS.includes(operator_name)) {
        for (let i = 0; i < node.args.length - 1; ++i) {
          this.addToSymboltable(node.args[i]);
        }
      }

      // Add "this" symbol, and object properties, to object symboltable
      if (OBJECT_OPERATORS.includes(operator_name)) {
        const apply = new Apply(new Word({ value: "const" }));
        apply.args = [new Word({ value: "this" })];

        this.addToSymboltable(apply);

        for (let i = 0; i < node.args.length; i += 2) {
          this.addToSymboltable(new Word({ value: node.args[i].value }));
        }
      }

      // Add the "iterator" symbol to foreach symboltable
      if (operator_name === "foreach") {
        this.addToSymboltable(node.args[0]);
      }
    }

    return node;
  }

  assertApplyArgs(node) {
    /* ... */
  }

  addToSymboltable(node) {
    /* ... */
  }

  findInSymboltable(name) {
    // Find an element on the symboltable or the parent ones
    for (let table = this.symboltable; table; table = Object.getPrototypeOf(table)) {
      if (Object.prototype.hasOwnProperty.call(table, name)) {
        return table[name];
      }
    }

    return undefined;
  }

  checkWordEnter(node, parent) {
      /* ... */
  }

  checkApplyLeave(node) {
    if (node.operator.type == "word") {
      const operator_name = node.operator.name;

      // If left the scope, remove the last symboltable
      if (SCOPE_OPERATORS.includes(operator_name)) {
        this.symboltable = Object.getPrototypeOf(this.symboltable);
      }
    }

    return node;
  }
}

module.exports = {
  Semantic
};
```


See  also davafons TFA
