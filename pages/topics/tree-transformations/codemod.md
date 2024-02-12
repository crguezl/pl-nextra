---
sidebar: false
---
# Codemods and Code Refactoring

[Codemod](https://github.com/facebookarchive/codemod) was a tool/library developed by FaceBook to assist with large-scale codebase refactors that can be partially automated but still require human oversight and occasional intervention. It is now deprecated and archived. 

::: tip Definition: Code refactoring
[Code refactoring](https://en.wikipedia.org/wiki/Code_refactoring) is the process of restructuring existing computer code—changing the factoring—without changing its external behavior.
:::

**Example:** 

Let's say you're deprecating your use of the `<font>` tag.  From the command line, you might make progress by running:

    codemod -m -d /home/jrosenstein/www --extensions php,html \
        '<font *color="?(.*?)"?>(.*?)</font>' \
        '<span style="color: \1;">\2</span>'

For each match of the regex, you'll be shown a colored diff, and asked if you want to accept the change (the replacement of the `<font>` tag with a `<span>` tag), reject it, or edit the line in question in your `$EDITOR` of choice.

::: Codemod Definition
**Codemods are scripts used to rewrite other scripts**. Think of them as a find and replace functionality that can read and write code. You can use them to 
1. update source code to fit a team’s coding conventions, 
2. make widespread changes when an API is modified, or 
3. even auto-fix existing code when your public package makes a breaking change.
4. etc.
:::
