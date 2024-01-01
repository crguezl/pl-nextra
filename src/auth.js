// See https://next-auth.js.org/configuration/nextjs#getserversession
import { getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  debug: true,
  providers: [
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        //allowDangerousEmailAccountLinking: true // https://next-auth.js.org/configuration/providers/oauth#allowdangerousemailaccountlinking-option
      }),
    /*
    TwitterProvider({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET
      }
    */

  ], // rest of your config
  /*
   callbacks: {
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name
      }
      return token
    }
  }
    */
} 

// Use it in server contexts
export function auth(...args) {
  return getServerSession(...args, config)
}