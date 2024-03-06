---
title: The Earley Algorithm Explained
sidebar: auto
next: /temas/syntax-analysis/earley/nearley.md
---
<!-- KatEX example

# This is a markdown file

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>

a formula $J \left( \theta_0, \theta_1 \right) = \frac{1}{2m}\sum\limits_{i=1}^m \left( h_{\theta}(x^{(i)})-y^{(i)} \right)^{2}$ and more text
-->

# {{ $frontmatter.title }}

Let be a grammar $G = (\Sigma, V, P, Start)$ and $x$ an input sequence of tokens $x = a_{1}a_{2} \ldots a_{n}$.

A **state** is an element $(X \longrightarrow \alpha \bullet \beta, j)$ where 
1. $X \longrightarrow \alpha \beta \in P$ is a  production in the set of  grammar productions  $P$, and 
2. **The dot • represents the current position in that production** and 
3. **The origin position** $j \in \{0 \ldots n \}$ is the position in the input at which the matching of this production $X \longrightarrow \alpha \beta$ began:  $x = a_{1}a_{2} \ldots a_{j} \ldots a_{n}$.

The set of *active states* when the  input prefix $a_1 \ldots a_k$ is being analyzed is called $S_k$. 

* Input position 0 is the position prior to input. 
* Input position `n` is the position after accepting the nth token. 
  Informally, input positions can be thought of as locations at token boundaries. 

More precisely, $S_k$ is the set of states $(X \longrightarrow \alpha \bullet \beta, j)$  whose production rule $X \longrightarrow \alpha \beta$ appears in a derivation from the $Start$ symbol 

$Start \overset{\star}{\Longrightarrow} a_{1}a_{2} \ldots a_{j-1}X\omega \underset{X \longrightarrow \alpha \beta}{\Longrightarrow } a_{1}a_{2} \ldots a_{j-1} \alpha \beta \omega 
\overset{\star{}}{\Longrightarrow} a_{1}a_{2} \ldots a_j \ldots a_{k} \beta \omega$ 

Observe that it holds that $\alpha \overset{\star{}}{\Longrightarrow} a_{j} \ldots a_k$

::: tip Idea
So the idea is that if state $(X \longrightarrow \alpha \bullet \beta, j)$ is in $S_k$ (with $j \le k$) is because $X \longrightarrow \alpha\beta$ was used in some partial parse tree that produces $a_1 \ldots a_j \ldots a_k$ and $\alpha$ has derived onto 
$a_j \ldots a_k$. 
::: 

A state is said **finished** when its **current position** is the last position of the right side of the production 
$(Y \longrightarrow \gamma \bullet, j)$, that is, when there is no symbol to the right of the dot • in the visual representation of the state.

The parser is seeded with $S_0$ consisting of only the top-level rule. 
The parser then repeatedly executes three operations: 

1. prediction, 
2. scanning, and 
3. completion.


These three operations are repeated until no new states can be added to the set $S_k$ 

## Prediction 

1. $\forall s = (X \longrightarrow \alpha \bullet Y \beta, j)  \in S_k$ (where *j* is the start of the substring), and $Y \in V$ is in the set of non terminals
2. add states $(Y \longrightarrow \bullet \gamma, k)$ to $S_k$ $\forall Y \longrightarrow \gamma$ grammar productions having *Y* on the left hand side.

Duplicate states are not added to the state set, only new ones. 

## Scanning 

If $a_{k} \in \Sigma$ is the next terminal in the input stream, then $\forall s \in S_{k-1}$ of the form $s = (X \longrightarrow \alpha \bullet a_{k} \beta, j)$ , add 
$s = (X \longrightarrow \alpha a_{k} \bullet \beta, j)$ to $S_{k}$.

## Completion

$\forall s \in S_{k}$  of the form $s = (Y \longrightarrow \gamma \bullet, j)$, 
find all states in $S_j$ of the form $(X \longrightarrow \alpha \bullet Y \beta, i)$ and add $(X \longrightarrow \alpha Y \bullet \beta, i)$ to $S_k$.



## Acceptance

The algorithm accepts if an state with the form $(Start \longrightarrow \gamma \bullet, 0)$ ends up in $S_n$, where $Start$ is the start symbol of the grammar $G$ and $n$ is the input length. 

If there are several of these states it means the grammar is ambiguous. 

If there are none, the input is rejected.

## Algorithm Pseudocode

We augment the initial grammar with  the rule `γ → •S`  

We also assume that the lexical analysis has been made and the parameter `tokens`
contains an array with the token objects of the input string.

```js
function EarleyParse(tokens, grammar) {

    function init(length) {
        let S = [];
        for(k =0; k <= length; k++) {
          S[k] = new Set();
        }
        return S;     
    }

    let S = init(tokens.length);

    function PREDICTOR([A → α•Bβ, j], k) {
      grammar.rules(B).forEach((B → γ) => S[k].add([B → •γ, k]))
    }

    function SCANNER([A → α•aβ, j], k) {
      // "a" is a terminal like ID while tokens[k] is a token object with a "type" and a value like "temp"
      if (tokens[k].type == a) S[k+1].add([A → αa•β, j])
    }

    function COMPLETER([B → γ•, s], k) {
      S[s].filter([A → α•Bβ, j]) => S[k].add([A → αB•β, j])
    }

    S[0].add([γ → •grammar.start, 0]); 
    for(k = 0; k <= tokens.length; k++) {
        S[k].forEach(state => {  
            if (!state.isFinished()) 
                if (state.nextElement() in grammar.nonTerminal) 
                    PREDICTOR(state, k)         // non-terminal
                else
                    SCANNER(state, k)             // terminal
            else 
                COMPLETER(state, k)  // state matches the pattern [B → γ•, s]     
        })
    }
    return S;
}
```

En este código `γ` denota una nueva variable sintáctica auxiliar que produce el símbolo de arranque `grammar.start`.

La función de aceptación sería:

```js 
function  ACCEPTS(S, tokens) {
  return S[tokens.length].has((γ → S•, 0))
}
```

## Ambiguous Grammar Example

Consider the following grammar:

```
➜  examples git:(main) ✗ cat nearley-algorithm-ambiguous.ne 
```

```js
e -> e "-" e {% ([L, _, R]) => `minus(${L}, ${R})` %}
   | "1"     {% id %}
```

We compile it:

```
➜  examples git:(main) ✗ npx nearleyc nearley-algorithm-ambiguous.ne -o nearley-algorithm-ambiguous.js
```

and the trace the execution:

```js
➜  examples git:(main) ✗ npx nearley-test nearley-algorithm-ambiguous.js -i '1-1-1'  
Table length: 6
Number of parses: 2
Parse Charts
Chart: 0
0: {e →  ● e "-" e}, from: 0
1: {e →  ● "1"}, from: 0

Chart: 1
0: {e → "1" ● }, from: 0
1: {e → e ● "-" e}, from: 0

Chart: 2
0: {e → e "-" ● e}, from: 0
1: {e →  ● e "-" e}, from: 2
2: {e →  ● "1"}, from: 2

Chart: 3
0: {e → "1" ● }, from: 2
1: {e → e ● "-" e}, from: 2
2: {e → e "-" e ● }, from: 0
3: {e → e ● "-" e}, from: 0

Chart: 4
0: {e → e "-" ● e}, from: 0
1: {e → e "-" ● e}, from: 2
2: {e →  ● e "-" e}, from: 4
3: {e →  ● "1"}, from: 4

Chart: 5
0: {e → "1" ● }, from: 4
1: {e → e ● "-" e}, from: 4
2: {e → e "-" e ● }, from: 2
3: {e → e "-" e ● }, from: 0
4: {e → e ● "-" e}, from: 2
5: {e → e "-" e ● }, from: 0
6: {e → e ● "-" e}, from: 0
7: {e → e ● "-" e}, from: 0


Parse results: 
[ 'minus(minus(1, 1), 1)', 'minus(1, minus(1, 1))' ]
```

To get the full derivations from the chart, you need to search for a **completed state** matching the pattern `e → `$\alpha$ ● `from 0` in the last chart. 


```js
Chart: 5
0: {e → "1" ● }, from: 4
1: {e → e ● "-" e}, from: 4
2: {e → e "-" e ● }, from: 2
3: {e → e "-" e ● }, from: 0
4: {e → e ● "-" e}, from: 2
6: {e → e ● "-" e}, from: 0
```

The fact that state 3  `{e → e "-" e ● }, from: 0` exist means the state `{e → e "-"  ● e }, from: 0` must also exist somewhere.
In this case such state appears in Charts 2 and 4.

The advance from `{e → e "-"  ● e }, from: 0` (Chart 4) to `{e → e "-" e ● }, from: 0` in Chart 5
can be produced due to any of the **completed states**
0 and 2 in Chart 5 `0: {e → "1" ● } from: 4` and `2: {e → e "-" e ● }, from: 2`, that leads to two different syntax trees for `1-1-1`:

```js
Parse results: 
[ 'minus(minus(1, 1), 1)', 'minus(1, minus(1, 1))' ]
```

## Second Example

Consider this example from [Wikipedia](https://en.wikipedia.org/wiki/Earley_parser#Example):

```
# https://en.wikipedia.org/wiki/Earley_parser#Example

P -> S

S -> S "+" M
   | M

M -> M "*" T
   | T

T -> "1"
   | "2"
   | "3"
   | "4"
```

executed with `nearley-test wikipedia.js -i '2+3*4'`

```bash
➜  examples git:(main) ✗ nearleyc wikipedia.ne -o wikipedia.js 
➜  examples git:(main) ✗ nearley-test wikipedia.js -i '2+3*4'
Table length: 6
Number of parses: 1
Parse Charts
Chart: 0
0: {P →  ● S}, from: 0
1: {S →  ● S "+" M}, from: 0
2: {S →  ● M}, from: 0
3: {M →  ● M "*" T}, from: 0
4: {M →  ● T}, from: 0
5: {T →  ● "1"}, from: 0
6: {T →  ● "2"}, from: 0
7: {T →  ● "3"}, from: 0
8: {T →  ● "4"}, from: 0

Chart: 1
0: {T → "2" ● }, from: 0
1: {M → T ● }, from: 0
2: {M → M ● "*" T}, from: 0
3: {S → M ● }, from: 0
4: {S → S ● "+" M}, from: 0
5: {P → S ● }, from: 0

Chart: 2
0: {S → S "+" ● M}, from: 0
1: {M →  ● M "*" T}, from: 2
2: {M →  ● T}, from: 2
3: {T →  ● "1"}, from: 2
4: {T →  ● "2"}, from: 2
5: {T →  ● "3"}, from: 2
6: {T →  ● "4"}, from: 2

Chart: 3
0: {T → "3" ● }, from: 2
1: {M → T ● }, from: 2
2: {M → M ● "*" T}, from: 2
3: {S → S "+" M ● }, from: 0
4: {S → S ● "+" M}, from: 0
5: {P → S ● }, from: 0

Chart: 4
0: {M → M "*" ● T}, from: 2
1: {T →  ● "1"}, from: 4
2: {T →  ● "2"}, from: 4
3: {T →  ● "3"}, from: 4
4: {T →  ● "4"}, from: 4

Chart: 5
0: {T → "4" ● }, from: 4
1: {M → M "*" T ● }, from: 2
2: {M → M ● "*" T}, from: 2
3: {S → S "+" M ● }, from: 0
4: {S → S ● "+" M}, from: 0
5: {P → S ● }, from: 0


Parse results: 
[
  [
    [ [ [ [ '2' ] ] ], '+', [ [ [ '3' ] ], '*', [ '4' ] ] ]
  ]
]
```

The state `{P → S ● }, from: 0` represents a completed parse. This state also appears in charts 1 
(corresponding to `2 • + 3 * 4`) and 3 (`2 + 3 • * 4`), since they are complete sentences.

## Loup Blog "Earley Parsing Explained"

* [Earley Parsing Explained](https://loup-vaillant.fr/tutorials/earley-parsing/) by Loup

### Advanced: Optimizing Right Recursion. Loup blog

* [Optimising Right Recursion](https://loup-vaillant.fr/tutorials/earley-parsing/right-recursion) by Loup 

* [Joop Leo’s optimizations for right-Recursion]({{site.baseurl}}/assets/pdfs/joop-leo-parse-algorithm-optimization-for-right-recursion.pdf) original paper

## Toby Ho video "on the Earley Parsing Algorithm"

Toby Ho illustrates step by step the algorithm.

<youtube id="WNKw1tiskSM"></youtube>

## Video on "Earley Parsing" by Natalie Parde

<youtube id="1j6hB3O4hAM"></youtube>


## "Early Parser" in the Wikipedia

* [Earley parser](https://en.wikipedia.org/wiki/Earley_parser)

## Marpa: a Perl parser generator based on the Earley Algorithm

See [What is the Marpa algorithm?](https://blogs.perl.org/users/jeffrey_kegler/2011/11/what-is-the-marpa-algorithm.html) By Jeffrey Kegler on November 18, 2011 in [Jeffrey Kegler's Blog](https://blogs.perl.org/users/jeffrey_kegler/)

## Other Earley Parsers in JS

### NearleyJS: A parser generator based on the Earley Algorithm

See section [NearleyJS](nearley)

### lagodiuk/earley-parser-js

See repo [lagodiuk/earley-parser-js](https://github.com/lagodiuk/earley-parser-js#online-demo).

The implementation is in file [earley-oop.js](https://github.com/lagodiuk/earley-parser-js/blob/master/earley-oop.js).

A fork of this repo for ULL-ESIT-PL is in <https://github.com/ULL-ESIT-PL/earley-parser-js>

### Others

See also npm packages 

* [earley-parser](https://www.npmjs.com/package/earley-parser)
* A TS implementation: [earley](https://www.npmjs.com/package/earley)
* [Probabilistic Earley parser](https://www.npmjs.com/package/probabilistic-earley-parser)