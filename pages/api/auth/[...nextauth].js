import { log } from "console"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { URL } from "url"
import { inspect } from "util"

let authHandler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
})

let wrapper = async function (req, res) {
  let url = new URL(req.url, "http://localhost:3000")
  
  log(inspect(url, { depth: 10 })) 
  /* 
    "http://localhost:3000/api/auth/csrf"
    [next-auth][warn][NEXTAUTH_URL] 
    https://next-auth.js.org/warnings#nextauth_url
    "http://localhost:3000/api/auth/signout"
    "http://localhost:3000/api/auth/signin?callbackUrl=%2Fauth%2Flogout" %2F is /
    "http://localhost:3000/api/auth/signin/github"
    "http://localhost:3000/api/auth/callback/github?code=b416fe08a4-the-code-that-will-be-exchanged-for-the-session-0"
  */

  const { body, cookies, headers, method, query } = req
  log(inspect({ body, cookies, method, query }, { depth: 1 })) 

  let result = authHandler(req, res) /* Promise { <pending>,
    [Symbol(async_id_symbol)]: 788747, [Symbol(trigger_async_id_symbol)]: 788737, [Symbol(kResourceStore)]: undefined
  } */
  log(inspect(result, { depth: 10 })) // If we insert an "await" for result is undefined for all urls
  return result
}
export default wrapper 