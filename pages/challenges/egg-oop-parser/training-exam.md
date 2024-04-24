---
title: "Training Exams for PL"
categories: [ "exams" ]
sidebar: auto
key: training-exam
published: true
date: 2023/05/05
kind: task
delivery:
order: 19
layout: Practica
prev: /practicas/tfa.md
template: https://github.com/ULL-ESIT-PL/exam-training-template
---

# {{ $frontmatter.title }}

## Exam: Parsing RegExps

* Read carefully [the pdf with the questions](https://github.com/ULL-ESIT-PL/exam-training-template/blob/master/docs/exam.pdf)
* Fill the code in this template repo [ULL-ESIT-PL/exam-training-template](https://github.com/ULL-ESIT-PL/exam-training-template)

[AST Explorer](https://astexplorer.net/#/gist/4ea2b52f0e546af6fb14f9b2f5671c1c/49dafda5429858220f62387740fd4226cdc3dde0) supports various regexp parsers. Feel free to play with them and have a look at the shapes of the ASTs.


Watch this video 

<youtube id="https://youtu.be/bxadjvhtffs"></youtube>

and this other from minute 30:30:

<youtube id="https://youtu.be/W94dX7zeRO0"></youtube>

## Exam: Parsing JSON

See also another exam example in section [Translator from Egg AST to AST Term](/practicas/tfa.html#translator-from-egg-ast-to-ast-term) of the TFA. 
The task there is to build a JSON Parser and translate a JSON containing the AST of an Egg parser onto the term notation.

!!!include(includes/evmtoterm.md)!!!
