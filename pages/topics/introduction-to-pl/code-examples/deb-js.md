A very simple example of es6 module [deb.js](https://github.com/crguezl/hello-ast-types/blob/master/deb.js)

```js filename="hello-ast-types/deb.js"
import cj from "color-json";

const SkippedKeys = new Set(["start", "end", "raw", "sourceType"]);
const skip = (key, value) => SkippedKeys.has(key)? undefined : value;
const deb = x => cj(JSON.stringify(x, skip, 2));

export default deb;
```

