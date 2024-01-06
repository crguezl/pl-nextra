# TODO

## North East Arrow

Unicode Character "↗" (U+2197) <https://www.compart.com/en/unicode/U+2197>

| Name                   | North East Arrow[1]                                                                                     |
|------------------------|---------------------------------------------------------------------------------------------------------|
| Unicode Version        | 1.1 (June 1993)[2]                                                                                      |
| Block                  | [Arrows, U+2190 - U+21FF][3]                                                                            |
| Plane                  | [Basic Multilingual Plane, U+0000 - U+FFFF][3]                                                          |
| Script                 | [Code for undetermined script (Zyyy)][4]                                                                |
| Category               | [Other Symbol (So)][1]                                                                                  |
| Bidirectional Class    | [Other Neutral (ON)][1]                                                                                 |
| Combining Class        | [Not Reordered (0)][1]                                                                                  |
| Character is Mirrored  | No[1]                                                                                                   |
| GCGID                  | SM950000[5]                                                                                             |
| HTML Entity            | - `&#8599;`<br>- `&#x2197;`<br>- `&UpperRightArrow;`                                                    |
| UTF-8 Encoding         | `0xE2 0x86 0x97`                                                                                        |
| UTF-16 Encoding        | `0x2197`                                                                                                |
| UTF-32 Encoding        | `0x00002197`                                                                                            |

## Passing session as a prop to the SessionProvider

In theme.config.js, See <https://authjs.dev/getting-started/providers/oauth-tutorial#exposing-the-session-via-sessionprovider> and find how to add the session.

They say:

```js
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

But I have:

```js
 main: ({ children }) => { // See https://github.com/shuding/nextra/discussions/1508#discussioncomment-4990229
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { frontMatter } = useConfig();
    return (
      <SessionProvider>
      <main className="">
        <div className="">{children}</div>
      </main>
      </SessionProvider>
    ); 
  },
```


        session, ...pageProps 