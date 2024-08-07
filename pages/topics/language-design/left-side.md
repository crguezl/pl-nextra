<!--import { Callout } from 'nextra/components'-->

## Haskell

Haskell and its pattern matching allows to **define** functions with different patterns for different inputs:

```haskell
func 0 = 1
func 1 = 2
func n | n < 0 = otherfunc
| n > 1 = other n
```

but it is a **definition**, not a **modification**.

Pattern matching also provides additional features, 
such as the selection based on the structure of a complex object.

## C++, C and similar languages


C++ and other conventional programming languages,  allow
defining a function returning a reference to a modifiable memory area.

In C++ you can also overload the  operator `()` being able in this way 
to implement a similar semantic.

But we are not saying that changing the behavior of a callable variable is 
not possible in a conventional language. The point is 
that increase expressivity by providing left-side assignment as a feature we can construct 
a language in which objects, arrays and classes are functions or callable objects. 

## Chat GPT on Programming Languages allowing f(3) = 9  for a function f

Follows a chat with GPT-3 on the topic of the existence of programming languages that allow you to assign a value to a function at a specific point, like `f(3) = 9`.


### Question

In most programming languages you can put on the left side of an assignment a property of an object or an index of an array like:

For an array:
```js
a[0] = 4;
```
or  for an object:

```js
a["x"] = 9 
```

but you can't do something like this for the value of a function at a specific point like in:

```js
f(3) = 9;
```

**Do you know of any programming language in which you can write something like this?**

## Chat GPT Answer
{/*
<Callout type="info">
*/}
In most programming languages, functions are treated as first-class citizens, meaning they can be passed around and manipulated like any other data type. **However, the ability to assign a value to the result of a function call directly, as in `f(3) = 9;`, is not a common feature in programming languages**.

However, *there are some languages that allow you to achieve similar behavior using various mechanisms*. One such language is Mathematica.

In Mathematica, you can define functions with pattern-matching rules, and you can use these rules to effectively assign values to function inputs. Here's an example:

```js /:=/ /x_/
f[x_] := 2x + 1

(* Now we can define values for specific inputs *)
f[3] = 9

(* You can now call f[3] and it will return the assigned value *)
f[3]
(* Output: 9 *)
```

In this example, we defined a function `f[x_]` which represents a **linear equation**. Then, we assigned a specific value `9` to `f[3]`. Now, whenever you call `f[3]`, it will return `9`.

Mathematica's pattern-matching rules and symbolic computation capabilities enable this behavior, allowing for a more symbolic and mathematical programming style compared to traditional imperative languages. However, it's important to note that Mathematica operates in a different paradigm compared to most mainstream programming languages, and **direct function value assignment like this is not a common feature in those languages**.
{/*</Callout>*/}

### Comments to Chat GPT answer

Notice the Mathematica example refers to a "linear equation" and not to a "function". 

## Google Gemini Answer

Here follows a Google Gemini answer to the exactly the same question:

{/* <Callout type="info">*/}
 **While it's not exactly the same syntax as `f(3) = 9`, a few programming paradigms and languages offer features that allow you to achieve a similar effect, treating functions more flexibly:**

**1. Dynamic Languages with Closures:**

- **Python, JavaScript, and other dynamic languages often allow you to create closures—functions that capture and modify variables from their surrounding scope**. This can be used to create a function that "remembers" certain values and effectively updates itself.

   ```javascript
   function createCounter() {
       let count = 0;
       return function() {
           count = count + 1;
           return count;
       };
   }

   let myCounter = createCounter();
   console.log(myCounter());  // 1
   console.log(myCounter());  // 2
   ```

**2. Prototype-Based Languages:**

- **Languages like JavaScript and Lua use prototype-based inheritance, where you can modify an object's methods (functions) directly**. This means you can indirectly "update" a function's behavior for a specific instance.

   ```javascript
   function Person(name) {
       this.name = name;
       this.greet = function() {
           console.log("Hello, I'm " + this.name);
       };
   }

   let person1 = new Person("Alice");
   person1.greet();  // "Hello, I'm Alice"
   person1.greet = function() {
       console.log("Hi there! ");
   };
   person1.greet();  // "Hi there! "
   ```

**3. Semantic Function Assignment (Experimental):**

- **Some languages like R and Julia have explored "semantic function assignment," which allows you to create aliases or modify function definitions in certain contexts**. However, this feature is often limited and not universally supported.

**4. Symbolic Programming:**

- **In symbolic programming languages like Mathematica or SymPy, functions are often treated as symbolic expressions that can be manipulated algebraically.** This might allow for constructs that resemble assigning to function values, but it's a very different paradigm from traditional programming.

{/*</Callout>*/}

{/*<Callout type="warning">*/
**Remember that these approaches don't directly modify a function's code itself; they create new functions or aliases with altered behavior.** Understanding these nuances is crucial for writing clear and maintainable code.
{/*</Callout>*/}

## Wolfram Mathematica

For a introduction to Wolfram Mathematica see:

1. [MATHEMATICA TUTORIAL for the First Course: Functions](https://www.cfm.brown.edu/people/dobrush/am33/Mathematica/intro/function.html) by Prof. Vladimir Dobrushkin at Brown University.
2. [Answers to the question: How to modify function argument?](https://mathematica.stackexchange.com/questions/17767/how-to-modify-function-argument) at https://mathematica.stackexchange.com/

To define a function, just type in the formula.
We need to use a special form for the left hand side, which includes 
- an **underscore** after the name of the variable, and 
- a special "**colon-equals**" sign `:=` for the function definition:

```js /:=/
f[x_] := (Cos[x] -1)/ x^2
```

The symbol `x_`, pronounced *x-blank*, denotes a **pattern** named "x." For example, If one were to enter

```js /=/
f[x] =3*x+1
``` 

then
- `f[3]` and `f[a+b]` will not be evaluated, but 
- `g[x]` will be evaluated because `x` is set as the only variable that this function will accept.

Function evaluation in Mathematica is indicated by square brackets. 
That is, while in mathematical notation, we write $f(x)$, in Mathematica the correct syntax is `f[x]`. 
Ordinary parentheses are used exclusively for algebraic grouping. 
Thus we write `(a*t)` to indicate that the argument is the product of `a` and `t`. 

However, if `f[x_]=3*x+1` is entered, then 
- `f[2]` is 7, 
- `f[a+b] = 3a+3b+1`, and 
- `f[x] is 3x+1` 


**because entering `x_` allows me to plug in different values for "x-blank."**

Quote from [How to modify function argument?](https://mathematica.stackexchange.com/questions/17767/how-to-modify-function-argument) at https://mathematica.stackexchange.com/:

> ... Whether or not the expressions passed as arguments can be modified inside a function depends on whether or not they represent an **L-value** (meaning they can be assigned a value, e.g. via `Set` operator) ... for the following function:

```mathematica
f[x_]:=x=1
```
this will assign to `a`:

```mathematica
Clear[a];
f[a]
```
while this will result in an error:

```mathematica
a=2;
f[a]
```
> because in the first case, the symbol `a` is injected into the r.h.s. (it is of course first evaluated, but since it does not have any value, it evaluates trivially, to itself), while in the second, it already has a value, so it's immutable value `2` is injected.
>
> ... Note however, that this "**injection**" parameter-passing mechanism is highly unusual, from the point of view of traditional languages. In essence, **parameter-passing acts as a code-generation device**, assembling full function's code in *a macro-like fashion* from code pieces passed as parameters and the body which has "placeholders" and acts like a macro. 
> **One can say that in Mathematica, run-time code generation happens at each function invocation**.


## SymPy

SymPy is a Python library for symbolic mathematics. 
It aims to become a full-featured computer algebra system (CAS). 

If you wish to contribute to SymPy or like to get the latest updates as they come, install SymPy from git. To download the repository, execute the following from the command line:

```bash
git clone https://github.com/sympy/sympy.git
```

Here is a simple example of how to use SymPy:

```python
>>> from sympy import symbols
>>> x, y = symbols('x y')
>>> expr = x + 2*y
>>> expr
x + 2*y
>>> expr - x
2*y
>>> expr.evalf(subs={x:4})
2.0*y + 4.0
>>> expr.evalf(subs={x:4}).evalf(subs={y:1})
6.00000000000000
>>> from sympy import Piecewise, Eq, pprint
>>> f = Piecewise((0, Eq(x, 0)), (x + 1, True))
>>> pprint(f, use_unicode=True)
⎧  0    for x = 0
⎨                
⎩x + 1  otherwise
>>> f.subs(x, 0)
0
>>> f.subs(x, 1)
2
```

## Julia

Julia features optional typing, multiple dispatch, and good performance, achieved using type inference and just-in-time ([JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation)) compilation (and [optional ahead-of-time compilation](https://github.com/JuliaLang/PackageCompiler.jl)), implemented using [LLVM](https://en.wikipedia.org/wiki/Low_Level_Virtual_Machine). It is multi-paradigm, combining features of imperative, functional, and object-oriented programming. 

See section [Redefining methods](https://docs.julialang.org/en/v1/manual/methods/) of the Julia documentation:

```julia
julia> f(x::Real) = 2*x
f (generic function with 1 method)
julia> f(x::Int) = x
f (generic function with 2 methods)
julia> f(3)
3
julia> f(1.5)
3.0
```
Also:

```julia
julia> struct Polynomial{R}
                  coeffs::Vector{R}
              end

julia> function (p::Polynomial)(x)  # defines a callable object for type Polynomial. 
                  v = p.coeffs[end] # last coefficient
                  for i = (length(p.coeffs)-1):-1:1 
                      v = v*x + p.coeffs[i] #  calculates the value of the polynomial at x using Horner's method
                  end
                  return v
              end

julia> (p::Polynomial)() = 4

julia> p = Polynomial([1,10,100])
Polynomial{Int64}([1, 10, 100])

julia> p(3) # 100*3^2 + 10*3 + 1 = 900 + 30 + 1 = 931
931

julia> p()
4
```

## Lab left-side

The lab [left-side](/labs/left-side) is a lab that explores answers to this question.import { throwDeprecation } from 'process'
