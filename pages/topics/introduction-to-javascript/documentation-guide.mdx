[documentation](https://github.com/documentationjs/documentation/blob/HEAD/docs/GETTING_STARTED.md) is a **documentation generator**. It's used to generate documentation from comments _within your code_. `documentation` processes JavaScript comments
in the [JSDoc format](https://jsdoc.app/about-getting-started.html). 

```
➜  scapegoat git:(master) npx documentation --version
13.1.1
```

For the most part, the things you document will be functions or classes
of JavaScript libraries. Let's start with a function and how to document
its essential parts.

```js
  /**
   * Escape special characters in the given string of html
   * @param {string} input any html
   * @returns {string} escaped HTML entities
   */
  function escape(html) {
    if (!html) return '';

    return String(html).replace(specialRe, (match) => reverse[match]);
  },
```

The comment before the `escape` function is a JSDoc comment. Note that it
begins with `/**` instead of `/*`. JSDoc requires this.

Let's break down the earlier JSDoc example:

```js
/**
 * Escape special characters in the given string of html
 * ...
```

The first line of the comment is typically the _description_. This section
says _what the code is or does_.

```js
 * @param {string} input any string
```

On the second line:

* `@param` is **a tag**: This tag indicates that we'll be documenting a function's parameter.
* `{string}` is **a type**. It says that the input to this function is
  a JavaScript "string." It could also say `{number}`,
  `{Object}`, `{Date}`, or any other JavaScript built-in type. And if you
  defined a custom class, like `FooClass`, you can use it as a type, too! Just say `{FooClass}`.
* `input any html` is the description of the input.

On the  line `@returns {string}` we just have a description of the value `escaped HTML entities`.

JSDoc lets you specify  everything about your code:
* use `@name` to say what something is called, 
* `@kind` for whether it's a function
or a class, 
* `@param` for its parameters 
* `documentation` automatically populates `@name`, `@kind`, and `@memberof` tags based on its reading of the code

Install the `documentation` binary with [npm](https://www.npmjs.com/).

```sh
$ npm install -g documentation
```

`documentation` then installs a command called `documentation`. Run it with
`--help` or `--help <command>` to get help.

```
➜  scapegoat git:(master) npx documentation help
Usage:

  # generate markdown docs for index.js and files it references
  documentation build index.js -f md

  # generate html docs for all files in src
  documentation build src/** -f html -o docs

  # document index.js, ignoring any files it requires or imports
  documentation build index.js -f md --shallow

  # build, serve, and live-update html docs for app.js
  documentation serve app.js

  # validate JSDoc syntax in util.js
  documentation lint util.js

  # update the API section of README.md with docs from index.js
  documentation readme index.js --section=API

  # build docs for all values exported by index.js
  documentation build --document-exported index.js


Comandos:
  documentation serve [input..]   generate, update, and display HTML
                                  documentation
  documentation build [input..]   build documentation
  documentation lint [input..]    check for common style and uniformity mistakes
  documentation readme [input..]  inject documentation into your README.md

Opciones:
  --version  Muestra número de versión                                [booleano]
  --help     Muestra ayuda                                            [booleano]

Ejemplos:
  documentation build foo.js -f md > API.md
  documentation readme index.js -s "API Docs" --github
```

Here is the help for the `build` command:

```
$ documentation --help build

Options:
  --version                  Show version number                       [boolean]
  --help                     Show help                                 [boolean]
  --theme, -t                specify a theme: this must be a valid theme module
  --project-name             project name. by default, inferred from
                             package.json
  --project-version          project version. by default, inferred from
                             package.json
  --project-description      project description. by default, inferred from
                             package.json
  --project-homepage         project homepage. by default, inferred from
                             package.json
  --favicon                  favicon used in html
  --watch, -w                watch input files and rebuild documentation when
                             they change                               [boolean]
  --markdown-toc             include a table of contents in markdown output
                                                       [boolean] [default: true]
  --markdown-toc-max-depth   specifies the max depth of the table of contents in markdown output
                                                           [number] [default: 6]
  --shallow                  shallow mode turns off dependency resolution, only
                             processing the specified files (or the main script
                             specified in package.json)
                                                      [boolean] [default: false]
  --config, -c               configuration file. an array defining explicit sort
                             order                                      [string]
  --no-package, --np         dont find and use package.json for project-
                             configuration option defaults
                                                      [boolean] [default: false]
  --external                 a string / glob match pattern that defines which
                             external modules will be whitelisted and included
                             in the generated documentation.     [default: null]
  --require-extension, --re  additional extensions to include in require() and
                             import's search algorithm.For instance, adding .es5
                             would allow require("adder") to find "adder.es5"
  --parse-extension, --pe    additional extensions to parse as source code.
  --private, -p              generate documentation tagged as private
                                                      [boolean] [default: false]
  --access, -a               Include only comments with a given access level,
                             out of private, protected, public, undefined. By
                             default, public, protected, and undefined access
                             levels are included
                [array] [choices: "public", "private", "protected", "undefined"]
  --github, -g               infer links to github in documentation    [boolean]
  --infer-private            Infer private access based on the name. This is a
                             regular expression that is used to match the name
                                                                        [string]
  --document-exported        Generate documentation for all exported bindings
                             and members even if there is no JSDoc for them
                                                      [boolean] [default: false]
  --sort-order               The order to sort the documentation
                                [choices: "source", "alpha"] [default: "source"]
  --output, -o               output location. omit for stdout, otherwise is a
                             filename for single-file outputs and a directory
                             name for multi-file outputs like html
                                                             [default: "stdout"]
  --format, -f       [choices: "json", "md", "remark", "html"] [default: "json"]
```
