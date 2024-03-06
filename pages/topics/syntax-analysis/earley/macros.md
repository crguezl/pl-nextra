### Macros

Macros allow you to create polymorphic rules:

```
# Matches "'Hello?' 'Hello?' 'Hello?'"
matchThree[X] -> $X " " $X " " $X
inQuotes[X] -> "'" $X "'"

main -> matchThree[inQuotes["Hello?"]]
```

Macros are dynamically scoped, which means they see arguments passed to parent
macros:

```
# Matches "Cows oink." and "Cows moo!"
sentence[ANIMAL, PUNCTUATION] -> animalGoes[("moo" | "oink" | "baa")] $PUNCTUATION
animalGoes[SOUND] -> $ANIMAL " " $SOUND # uses $ANIMAL from its caller

main -> sentence["Cows", ("." | "!")]
```

Macros are expanded at compile time and inserted in places they are used. They
are not "real" rules. Therefore, macros *cannot* be recursive (`nearleyc` will
go into an infinite loop trying to expand the macro-loop). They must also be
defined *before* they are used (except by other macros).
