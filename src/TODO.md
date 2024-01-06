# TODO

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