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
## netlify error

```bash
11:33:38 PM: process.env.NEXTAUTH_URL https://ull-pl.netlify.app/
11:33:38 PM:    Generating static pages (9/36)
11:33:38 PM:    Generating static pages (18/36)
11:33:38 PM:    Generating static pages (27/36)
11:33:38 PM: Error occurred prerendering page "/nextra-playground/stars". Read more: https://nextjs.org/docs/messages/prerender-error
11:33:38 PM: Error: Error serializing `.ssg.stars` returned from `getStaticProps` in "/nextra-playground/stars".
11:33:38 PM: Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
11:33:38 PM:     at r (/opt/build/repo/node_modules/next/dist/compiled/next-server/pages.runtime.prod.js:38:446)
11:33:38 PM:     at /opt/build/repo/node_modules/next/dist/compiled/next-server/pages.runtime.prod.js:38:683
11:33:38 PM:     at Array.every (<anonymous>)
11:33:38 PM:     at r (/opt/build/repo/node_modules/next/dist/compiled/next-server/pages.runtime.prod.js:38:580)
11:33:38 PM:     at /opt/build/repo/node_modules/next/dist/compiled/next-server/pages.runtime.prod.js:38:683
11:33:38 PM:     at Array.every (<anonymous>)
11:33:38 PM:     at r (/opt/build/repo/node_modules/next/dist/compiled/next-server/pages.runtime.prod.js:38:580)
11:33:38 PM:     at H (/opt/build/repo/node_modules/next/dist/compiled/next-server/pages.runtime.prod.js:38:1117)
11:33:38 PM:     at eZ (/opt/build/repo/node_modules/next/dist/compiled/next-server/pages.runtime.prod.js:48:294)
11:33:38 PM:     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
11:33:39 PM: brief ["totalCount","edges"]
11:33:39 PM:  ✓ Generating static pages (36/36)
11:33:39 PM: > Export encountered errors on following paths:
11:33:39 PM: 	/nextra-playground/stars
11:33:40 PM: Failed during stage "building site": Build script returned non-zero exit code: 2
11:33:40 PM: ​
11:33:40 PM: "build.command" failed                                        
```