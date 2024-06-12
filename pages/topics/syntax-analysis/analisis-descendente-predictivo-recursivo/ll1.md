### Recorrido del árbol en un ADPR
¿En que forma es recorrido el árbol de análisis sintáctico concreto en
un analizador descendente predictivo recursivo? ¿En que orden son
visitados los nodos?

### Factores Comunes

Si se tiene una variable con producciones:


$$A   \rightarrow \alpha \beta \mid \alpha \gamma$$


Las dos producciones tienen un máximo factor común en la izquierda de su
parte derecha $$\alpha$$. Asumimos que
$$FIRST(\beta) \cap FIRST(\gamma) = \emptyset$$.

1.  ¿Cómo puede modificarse la gramática para obtener una nueva
    gramática que cumpla la condición de que las partes derechas tienen
    conjuntos $$FIRST(\gamma_i)$$ disjuntos?

2.  ¿Puede modificarse la técnica APDR para que funcione sobre
    gramáticas con este tipo de producciones?. 

### Derivaciones a vacío

Surge un problema cuando
$$A \rightarrow \gamma_1 \mid \ldots \mid \gamma_n$$ y la palabra vacía
está en alguno de los conjuntos $$FIRST(\gamma_i)$$. ¿Que hacer entonces?

Nótese que si $$A \rightarrow \gamma$$ y $$\epsilon \in FIRST(\gamma)$$ es
porque existe una derivación
$$\gamma \stackrel{*}{\Longrightarrow} \epsilon$$. 

¿Que terminales podemos
legalmente encontrarnos cuando estamos en la subrutina `A`? 

Consideremos
una derivación desde el símbolo de arranque en la que se use la
producción $$A \rightarrow \gamma$$. 

Dicha derivación forzosamente tendrá
la forma:

$$S \stackrel{*}{\Longrightarrow} \beta A\ a \mu \Longrightarrow \beta \gamma\ a \mu \stackrel{*}{\Longrightarrow} \beta\ a \mu$$.

Cualquier terminal $$a \in \Sigma$$ que pueda aparecer en una derivación
desde el símbolo de arranque inmediatamente a continuación de la
variable $$A$$ es susceptible de ser visto cuando se esta analizando $$A$$ y
se aplicó $$A \rightarrow \gamma$$ con


$$\gamma \stackrel{*}{\Longrightarrow} \epsilon$$. 

Esto nos lleva a la
definición del conjunto $$FOLLOW(A)$$ como conjunto de terminales que
pueden aparecer a continuación de $$A$$ en una derivación desde el símbolo
de arranque:

Dada una gramática $$G=(\Sigma,V,P,S)$$ y una variable $$A \in V$$ se define
el conjunto $$FOLLOW(A)$$ como:

$$FOLLOW(A) = \left \{ b \in \Sigma :  \exists\ S  \stackrel{*}{\Longrightarrow}  \alpha A b \beta \right \} \cup E(A)$$

donde $$E(A) = \{ \$ \}$$ si $$S \stackrel{*}{\Longrightarrow} \alpha A$$ y es el conjunto vacío $$E(A) = \emptyset$$ en otro caso. Donde $ denota el final de la entrada 

<!-- ERROR latex
donde

$$E(A) = \left \{ \begin{array}{ll}
                         \{ \$  \}& \mbox{si $S \stackrel{*}{\Longrightarrow} \alpha A$} \\
                         \emptyset & \mbox{en otro caso} 
                      \end{array}
\right. $$ 

-->


Si $$A \rightarrow \gamma_1 \mid \ldots \mid \gamma_n$$ dado que los
conjuntos $$FIRST(\gamma_i)$$ han de ser disjuntos para que un analizador
predictivo APDR funcione, sólo una parte derecha puede contener la
palabra vacía en su $$FIRST$$. Supongamos que es $$\gamma_n$$. Podemos
reformular la construcción del procedimiento para la variable $$A$$
siguiendo este seudocódigo:

```js
    function A() {
      if (lookahead in FIRST(gamma_1)) { imitar gamma_1 }
      elsif (lookahead in FIRST(gamma_2)) { imitar gamma_2 }
      ...
      else (lookahead in FIRST(gamma_n) or lookahead in FOLLOW(A)) { imitar gamma_n }
    }
```

Un caso particular de $$\gamma_n \stackrel{*}{\Longrightarrow} \epsilon$$
es que $$\gamma_n = \epsilon$$. 

En tal caso, y como es obvio, el
significado de `imitar gamma_n` es equivalente a ejecutar una sentencia
vacía.

### Construcción de los conjuntos de Primeros y Siguientes

Construcción de los conjuntos $$FIRST(X)$$

Repita el siguiente conjunto de reglas hasta que no se puedan añadir mas
símbolos terminales o a ningún conjunto $$FIRST(X)$$:

1.  $$Si\ X \in \Sigma\ entonces\ FIRST(X) = {X}$$

2.  $$Si\ X \rightarrow \epsilon\ entonces\ FIRST(X) =  FIRST(X) \cup \{ \epsilon \}$$

3.  $$Si X \in V \ y\ X \rightarrow Y_1 Y_2 \cdots Y_k \in P\ entonces$$
    ```js
    i = 1;
    do FIRST(X) = FIRST(X) U FIRST*(Y_i);
     i++; 
    while (i <= k and € in FIRST(Y_i))
    ```

4.  Añadir $$\epsilon$$ a $$FIRST(X)$$ si $$i \geq k$$ y
    $$\epsilon \in FIRST(Y_k)$$

Aqui $$FIRST^*(Y)$$ denota al conjunto $$FIRST(Y) - \{ \epsilon \}$$.

Este algoritmo puede ser extendido para calcular $$FIRST(\alpha)$$ para
$$\alpha = X_1 X_2 \cdots X_n \in (V \cup \Sigma)^*$$. El esquema es
anólogo al de un símbolo individual.

### Construcción de los conjuntos $$FOLLOW(A)\ \forall A \in V$$:

Repetir los siguientes pasos hasta que ninguno de los conjuntos $$FOLLOW$$
cambie:

1.  $$FOLLOW(S) = \{\$\} $$ ($ representa el final de la entrada)

2.  $$Si\ A \rightarrow \alpha B \beta\ entonces$$
    $$FOLLOW(B) =  FOLLOW(B) \cup (FIRST(\beta) - \{\epsilon\})$$

3.  $$Si\ A \rightarrow \alpha B$$ o $$A \rightarrow \alpha B \beta$$ y $$\epsilon \in FIRST(\beta)$$  entonces
    $$FOLLOW(B) = FOLLOW(B) \cup FOLLOW(A)$$

### Gramáticas LL(1)

Una gramática $$G = (\Sigma, V, P, S)$$ cuyo lenguaje generado $$L(G)$$
puede ser analizado por un analizador sintáctico descendente recursivo
predictivo se denomina LL(1). Una gramática es LL(1) si y sólo si para
cualesquiera dos producciones $$A \rightarrow \alpha$$ y
$$A \rightarrow \beta$$ de $$G$$ se cumple:

1.  $$FIRST(\alpha) \cap FIRST(\beta) = \emptyset$$

2.  Si $$\epsilon \in FIRST(\alpha)$$, entonces
    $$FIRST(\beta) \cap FOLLOW(A) = \emptyset$$

¿De donde viene el nombre LL(1)? 

La primera L hace alusión al hecho de
que el flujo de terminales se lee de izquierda a derecha, accediendo a
la entrada por su izquierda (*Left*). 

La segunda L se refiere a que el
método de análisis predictivo construye una derivación a izquierdas. 

El
número entre paréntesis indica el número de terminales que debemos
consultar para decidir que regla de producción se aplica. Asi, en una
gramática LL(2) la decisión final de que producción elegir se hace
consultando los dos terminales a la entrada.

### Ejercicio 
Cuando se dice que una gramática es LL(1) si, y sólo si:

1.  $$FIRST(\alpha) \cap FIRST(\beta) = \emptyset$$

2.  Si $$\epsilon \in FIRST(\alpha)$$, entonces
    $$FIRST(\beta) \cap FOLLOW(A) = \emptyset$$

se asume que los conjuntos $$FIRST(\alpha)$$ no son vacíos.

-   ¿Que se puede decir de la regla $$A \rightarrow \alpha$$ si
    $$FIRST(\alpha) = \emptyset$$?

-   ¿Que se puede decir de la variable $$A$$ si $$FOLLOW(A) = \emptyset$$?

### Ambiguedad y LL(1)

¿Puede una gramática LL(1) ser ambigua?. Razone su respuesta.

<!--
  term $$\rightarrow$$ factor '\*' term $$|$$ factor 

  factor $$\rightarrow$$ '(' expression ')' $$|$$ ID $$|$$ NUM $$|$$ STR
  
  idlist $$\rightarrow$$ ID ',' idlist $$|$$ ID
-->

### Recursión por la Izquierda 

Una gramática es recursiva por la izquierda cuando existe una derivación
$$A \stackrel{*}{\Longrightarrow} A \alpha$$.

En particular, es recursiva por la izquierda si contiene una regla de
producción de la forma $$A \rightarrow A \alpha$$. En este caso se dice
que la recursión por la izquierda es directa.

Cuando la gramática es recursiva por la izquierda, el método de análisis
recursivo descendente predictivo no funciona. En ese caso, el
procedimiento `A` asociado con $$A$$ ciclaría para siempre sin llegar a
consumir ningún terminal.

### Eliminación de la Recursión por la Izquierda en la Gramática 

Es posible modificar la gramática para eliminar la recursión por la
izquierda. En este apartado nos limitaremos al caso de recursión por la
izquierda directa. La generalización al caso de recursión por la
izquierda no-directa se reduce a la iteración de la solución propuesta
para el caso directo.

Consideremos una variable $$A$$ con dos producciones:

$$A   \rightarrow A \alpha \mid \beta$$

donde $$\alpha, \beta \in (V \cup \Sigma)^*$$ no comienzan por $$A$$. Estas
dos producciones pueden ser sustituidas por:

$$A   \rightarrow \beta R$$

$$R   \rightarrow  \alpha R \mid \epsilon$$

eliminando así la recursión por la izquierda.

La producción $$R   \rightarrow  \alpha R$$ se dice recursiva por la
derecha. También podemos usar el operador de repetición y reducir la solución a una única regla $$A \rightarrow \beta \alpha *$$

Las producciones recursivas por la derecha dan lugar a árboles que se
hunden hacia la derecha. Es mas difícil traducir desde esta clase de
árboles operadores como el menos, que son asociativos a izquierdas.

### Ejercicio

Elimine la recursión por la izquierda de la gramática

$$expr   \rightarrow expr  -  NUM$$

$$expr   \rightarrow NUM$$

