
## 🏟 Plugins

The 🐊**Putout** repo is comprised of many npm packages. It is a [lerna](https://github.com/lerna/lerna) monorepo similar to [babel](https://github.com/babel/babel).
It has a lot plugins divided by groups:

### Appliers

| Package | Version |
|--------|-------|
| [`@putout/plugin-apply-array-at`](/packages/plugin-apply-array-at#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-array-at.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-array-at) |
| [`@putout/plugin-apply-is-array`](/packages/plugin-apply-is-array#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-is-array.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-is-array) |
| [`@putout/plugin-apply-numeric-separators`](/packages/plugin-apply-numeric-separators#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-numeric-separators.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-numeric-separators) |
| [`@putout/plugin-apply-destructuring`](/packages/plugin-apply-destructuring#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-destructuring.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-destructuring) |
| [`@putout/plugin-apply-optional-chaining`](/packages/plugin-apply-optional-chaining#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-optional-chaining.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-optional-chaining) |
| [`@putout/plugin-apply-if-condition`](/packages/plugin-apply-if-condition#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-if-condition.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-if-condition) |
| [`@putout/plugin-apply-early-return`](/packages/plugin-apply-early-return#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-early-return.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-early-return) |

### Splitters

| Package | Version |
|--------|-------|
| [`@putout/plugin-split-variable-declarations`](/packages/plugin-split-variable-declarations#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-split-variable-declarations.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-split-variable-declarations) |
| [`@putout/plugin-split-nested-destructuring`](/packages/plugin-split-nested-destructuring#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-split-nested-destructuring.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-split-nested-destructuring) |

### Mergers

| Package | Version |
|--------|-------|
| [`@putout/plugin-merge-destructuring-properties`](/packages/plugin-merge-destructuring-properties#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-merge-destructuring-properties.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-merge-destructuring-properties) |
| [`@putout/plugin-merge-duplicate-imports`](/packages/plugin-merge-duplicate-imports#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-merge-duplicate-imports.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-merge-duplicate-imports) |
| [`@putout/plugin-merge-if-statements`](/packages/plugin-merge-if-statements#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-merge-if-statements.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-merge-if-statements) |

### Converters

| Package | Version |
|--------|-------|
| [`@putout/plugin-convert-apply-to-spread`](/packages/plugin-convert-apply-to-spread#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-apply-to-spread.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-apply-to-spread) |
| [`@putout/plugin-convert-quotes-to-backticks`](/packages/plugin-convert-quotes-to-backticks#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-quotes-to-backticks.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-quotes-to-backticks) |
| [`@putout/plugin-convert-bitwise-to-logical`](/packages/plugin-convert-bitwise-to-logical#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-bitwise-to-logical.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-bitwise-to-logical) |
| [`@putout/plugin-convert-concat-to-flat`](/packages/plugin-convert-concat-to-flat#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-concat-to-flat.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-concat-to-flat) |
| [`@putout/plugin-convert-esm-to-commonjs`](/packages/plugin-convert-esm-to-commonjs#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-esm-to-commonjs.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-esm-to-commonjs) |
| [`@putout/plugin-convert-commonjs-to-esm`](/packages/plugin-convert-commonjs-to-esm#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-commonjs-to-esm.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-commonjs-to-esm) |
| [`@putout/plugin-convert-array-copy-to-slice`](/packages/plugin-convert-array-copy-to-slice#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-array-copy-to-slice.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-array-copy-to-slice) |
| [`@putout/plugin-convert-template-to-string`](/packages/plugin-convert-template-to-string#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-template-to-string.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-template-to-string) |
| [`@putout/plugin-convert-equal-to-strict-equal`](/packages/plugin-convert-equal-to-strict-equal#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-equal-to-strict-equal.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-equal-to-strict-equal) |
| [`@putout/plugin-convert-index-of-to-includes`](/packages/plugin-convert-index-of-to-includes#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-index-of-to-includes.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-index-of-to-includes) |
| [`@putout/plugin-convert-math-pow`](/packages/plugin-convert-math-pow#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-math-pow.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-math-pow) |
| [`@putout/plugin-convert-to-arrow-function`](/packages/plugin-convert-to-arrow-function#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-to-arrow-function.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-to-arrow-function) |
| [`@putout/plugin-convert-for-to-for-of`](/packages/plugin-convert-for-to-for-of#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-for-to-for-of.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-for-to-for-of) |
| [`@putout/plugin-convert-for-each-to-for-of`](/packages/plugin-convert-for-each-to-for-of#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-for-each-to-for-of.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-for-each-to-for-of) |
| [`@putout/plugin-convert-for-in-to-for-of`](/packages/plugin-convert-for-in-to-for-of#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-for-in-to-for-of.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-for-in-to-for-of) |
| [`@putout/plugin-convert-map-to-for-of`](/packages/plugin-convert-map-to-for-of#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-map-to-for-of.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-map-to-for-of) |
| [`@putout/plugin-convert-object-assign-to-merge-spread`](/packages/plugin-convert-object-assign-to-merge-spread#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-object-assign-to-merge-spread.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-object-assign-to-merge-spread) |
| [`@putout/plugin-convert-comparison-to-boolean`](/packages/plugin-convert-comparison-to-boolean#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-comparison-to-boolean.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-comparison-to-boolean) |
| [`@putout/plugin-convert-typeof-to-is-type`](/packages/plugin-convert-typeof-to-is-type#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-typeof-to-is-type.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-typeof-to-is-type) |
| [`@putout/plugin-convert-mock-require-to-mock-import`](/packages/plugin-convert-mock-require-to-mock-import#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-mock-require-to-mock-import.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-mock-require-to-mock-import) |
| [`@putout/plugin-convert-assignment-to-arrow-function`](/packages/plugin-convert-assignment-to-arrow-function#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-assignment-to-arrow-function.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-assignment-to-arrow-function) |
| [`@putout/plugin-convert-assignment-to-comparison`](/packages/plugin-convert-assignment-to-comparison#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-assignment-to-comparison.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-assignment-to-comparison) |

### Removers

| Package | Version |
|--------|-------|
| [`@putout/plugin-remove-unused-variables`](/packages/plugin-remove-unused-variables#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-variables) |
| [`@putout/plugin-remove-unused-for-of-variables`](/packages/plugin-remove-unused-for-of-variables#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-for-of-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-for-of-variables) |
| [`@putout/plugin-remove-unreferenced-variables`](/packages/plugin-remove-unreferenced-variables#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unreferenced-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unreferenced-variables) |
| [`@putout/plugin-remove-duplicate-keys`](/packages/plugin-remove-duplicate-keys#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-keys.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-duplicate-keys) |
| [`@putout/plugin-remove-duplicate-case`](/packages/plugin-remove-duplicate-case#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-case.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-duplicate-case) |
| [`@putout/plugin-remove-unused-expressions`](/packages/plugin-remove-unused-expressions#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-expressions) |
| [`@putout/plugin-remove-unused-private-fields`](/packages/plugin-remove-unused-private-fields#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-private-fields.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-private-fields) |
| [`@putout/plugin-remove-useless-variables`](/packages/plugin-remove-useless-variables#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-variables) |
| [`@putout/plugin-remove-useless-else`](/packages/plugin-remove-useless-else#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-else.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-else) |
| [`@putout/plugin-remove-useless-map`](/packages/plugin-remove-useless-map#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-map.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-map) |
| [`@putout/plugin-remove-useless-new`](/packages/plugin-remove-useless-new#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-new.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-new) |
| [`@putout/plugin-remove-useless-constructor`](/packages/plugin-remove-useless-constructor#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-constructor.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-constructor) |
| [`@putout/plugin-remove-useless-return`](/packages/plugin-remove-useless-return#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-return.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-return) |
| [`@putout/plugin-remove-useless-continue`](/packages/plugin-remove-useless-continue#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-continue.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-continue) |
| [`@putout/plugin-remove-useless-operand`](/packages/plugin-remove-useless-operand#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-operand.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-operand) |
| [`@putout/plugin-remove-useless-array-constructor`](/packages/plugin-remove-useless-array-constructor#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-array-constructor.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-array-constructor) |
| [`@putout/plugin-remove-useless-conditions`](/packages/plugin-remove-useless-conditions#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-conditions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-conditions) |
| [`@putout/plugin-remove-useless-type-conversion`](/packages/plugin-remove-useless-type-conversion#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-type-conversion.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-type-conversion) |
| [`@putout/plugin-remove-useless-functions`](/packages/plugin-remove-useless-functions#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-functions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-functions) |
| [`@putout/plugin-remove-useless-typeof`](/packages/plugin-remove-useless-typeof#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-typeof.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-typeof) |
| [`@putout/plugin-remove-useless-array-from`](/packages/plugin-remove-useless-array-from#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-array-from.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-array-from) |
| [`@putout/plugin-remove-useless-spread`](/packages/plugin-remove-useless-spread#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-spread.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-spread) |
| [`@putout/plugin-remove-useless-array-entries`](/packages/plugin-remove-useless-array-entries#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-array-entries.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-array-entries) |
| [`@putout/plugin-remove-useless-arguments`](/packages/plugin-remove-useless-arguments#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-arguments.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-arguments) |
| [`@putout/plugin-remove-useless-escape`](/packages/plugin-remove-useless-escape#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-escape.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-escape) |
| [`@putout/plugin-remove-useless-template-expressions`](/packages/plugin-remove-useless-template-expressions#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-template-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-template-expressions) |
| [`@putout/plugin-remove-useless-for-of`](/packages/plugin-remove-useless-for-of#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-for-of.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-for-of) |
| [`@putout/plugin-remove-debugger`](/packages/plugin-remove-debugger#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-debugger.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-debugger) |
| [`@putout/plugin-remove-iife`](/packages/plugin-remove-iife#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-iife.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-iife) |
| [`@putout/plugin-remove-unreachable-code`](/packages/plugin-remove-unreachable-code#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unreachable-code.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unreachable-code) |
| [`@putout/plugin-remove-console`](/packages/plugin-remove-console#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-console.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-console) |
| [`@putout/plugin-remove-empty`](/packages/plugin-remove-empty#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-empty.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-empty) |
| [`@putout/plugin-remove-empty-pattern`](/packages/plugin-remove-empty-pattern#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-empty-pattern.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-empty-pattern) |
| [`@putout/plugin-remove-constant-conditions`](/packages/plugin-remove-constant-conditions#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-constant-conditions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-constant-conditions) |
| [`@putout/plugin-remove-boolean-from-assertions`](/packages/plugin-remove-boolean-from-assertions#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-boolean-from-assertions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-boolean-from-assertions) |
| [`@putout/plugin-remove-boolean-from-logical-expressions`](/packages/plugin-remove-boolean-from-logical-expressions#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-boolean-from-logical-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-boolean-from-logical-expressions) |
| [`@putout/plugin-remove-duplicates-from-logical-expressions`](/packages/plugin-remove-duplicates-from-logical-expressions#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-duplicates-from-logical-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-duplicates-from-logical-expressions) |
| [`@putout/plugin-remove-nested-blocks`](/packages/plugin-remove-nested-blocks#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-nested-blocks.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-nested-blocks) |

### Simplifiers

| Package | Version |
|--------|-------|
| [`@putout/plugin-simplify-assignment`](/packages/plugin-simplify-assignment#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-simplify-assignment.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-simplify-assignment) |
| [`@putout/plugin-simplify-logical-expressions`](/packages/plugin-simplify-logical-expressions#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-simplify-logical-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-simplify-logical-expressions) |
| [`@putout/plugin-simplify-ternary`](/packages/plugin-simplify-ternary#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-simplify-ternary.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-simplify-ternary) |

### Not bundled

Next packages not bundled with 🐊**Putout** but can be installed separately.

| Package | Version |
|--------|-------|
| [`@putout/plugin-react-hooks`](/packages/plugin-react-hooks#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-react-hooks.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-react-hooks) |
| [`@putout/plugin-convert-is-nan-to-number-is-nan`](/packages/plugin-convert-is-nan-to-number-is-nan#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-is-nan-to-number-is-nan.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-is-nan-to-number-is-nan) |
| [`@putout/plugin-convert-spread-to-array-from`](/packages/plugin-convert-spread-to-array-from#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-spread-to-array-from.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-spread-to-array-from) |
| [`@putout/plugin-apply-shorthand-properties`](/packages/plugin-apply-shorthand-properties#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-shorthand-properties.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-shorthand-properties) |
| [`@putout/plugin-apply-nullish-coalescing`](/packages/plugin-apply-nullish-coalescing#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-nullish-coalescing.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-nullish-coalescing) |
| [`@putout/plugin-cloudcmd`](/packages/plugin-cloudcmd#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-cloudcmd.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-cloudcmd) |
| [`@putout/plugin-postcss`](/packages/plugin-postcss#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-postcss.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-postcss) |
| [`@putout/plugin-jest`](/packages/plugin-jest#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-jest.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-jest) |
| [`@putout/plugin-travis`](/packages/plugin-travis#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-travis.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-travis) |
| [`@putout/plugin-convert-throw`](/packages/plugin-convert-throw#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-throw.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-throw) |

### Groups

| Package | Version |
|--------|-------|
| [`@putout/plugin-declare-undefined-variables`](/packages/plugin-declare-undefined-variables#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-declare-undefined-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-declare-undefined-variables) |
| [`@putout/plugin-declare-before-reference`](/packages/plugin-declare-before-reference#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-declare-before-reference.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-declare-before-reference) |
| [`@putout/plugin-reuse-duplicate-init`](/packages/plugin-reuse-duplicate-init#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-reuse-duplicate-init.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-reuse-duplicate-init) |
| [`@putout/plugin-madrun`](/packages/plugin-madrun#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-madrun.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-madrun) |
| [`@putout/plugin-strict-mode`](/packages/plugin-strict-mode#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-strict-mode.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-strict-mode) |
| [`@putout/plugin-extract-sequence-expressions`](/packages/plugin-extract-sequence-expressions#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-extract-sequence-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-extract-sequence-expressions) |
| [`@putout/plugin-extract-object-properties`](/packages/plugin-extract-object-properties#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-extract-object-properties.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-extract-object-properties) |
| [`@putout/plugin-putout`](/packages/plugin-putout#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-putout.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-putout) |
| [`@putout/plugin-putout-config`](/packages/plugin-putout-config#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-putout-config.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-putout-config) |
| [`@putout/plugin-tape`](/packages/plugin-tape#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-tape.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-tape) |
| [`@putout/plugin-webpack`](/packages/plugin-webpack#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-webpack.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-webpack) |
| [`@putout/plugin-eslint`](/packages/plugin-eslint#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-eslint.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-eslint) |
| [`@putout/plugin-package-json`](/packages/plugin-package-json#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-package-json.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-package-json) |
| [`@putout/plugin-promises`](/packages/plugin-promises#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-promises.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-promises) |
| [`@putout/plugin-gitignore`](/packages/plugin-gitignore#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-gitignore.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-gitignore) |
| [`@putout/plugin-npmignore`](/packages/plugin-npmignore#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-npmignore.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-npmignore) |
| [`@putout/plugin-browserlist`](/packages/plugin-browserlist#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-browserlist.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-browserlist) |
| [`@putout/plugin-github`](/packages/plugin-github#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-github.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-github) |
| [`@putout/plugin-regexp`](/packages/plugin-regexp#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-regexp.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-regexp) |
| [`@putout/plugin-nodejs`](/packages/plugin-nodejs#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-nodejs.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-nodejs) |
| [`@putout/plugin-typescript`](/packages/plugin-typescript#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-typescript.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-typescript) |
| [`@putout/plugin-try-catch`](/packages/plugin-try-catch#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-try-catch.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-try-catch) |
| [`@putout/plugin-montag`](/packages/plugin-montag#readme) | [![npm](https://img.shields.io/npm/v/@putout/plugin-montag.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-montag) |
