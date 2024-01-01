import { log } from "console"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { URL } from "url"
import { inspect } from "util"
import { config, auth} from "@/src/auth"

export const authOptions = {
  // your configs
  tutu: 4,
  cookie: null
}

let authHandler = NextAuth( config )

let wrapper = async function (req, res) {
  let url = new URL(req.url, "http://localhost:3000")
  
  //log(inspect(url, { depth: 10 })) 
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

  /* Promise { <pending>,  [Symbol(async_id_symbol)]: 788747, [Symbol(trigger_async_id_symbol)]: 788737, [Symbol(kResourceStore)]: undefined  } */
  let result = await authHandler(req, res) 
    log(inspect({ body, cookies, method, query }, { depth: 1 })) 
    /*  cookies: {
    'next-auth.csrf-token': '5c5a425421b243ab9643d9d19eb73637347dd4e16c5b98cb924a9a8f56be2fea|b2211844feff364586eb8459a1ef357bf4b2ebfdea9ffbe80c6b87d2632c85df',
    'next-auth.callback-url': 'http://localhost:3000/',
    'next-auth.state': 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..v6uSSVnJnyiH9_d7.8gJWUsWMmuxprEWGSIEqAMmPTiEl0AEw5lApi0e91E5l1yLJCNV4SHpUIubvJL5E9ZPMTtD9rZX9SQXjWGl3telR_2in19bw7FqUfGagnyMLKlICyo58h6hHPSpQp67I6xKXxlHojTAruGX2c8vGxcAhoLBN-E1e23A_pvqgRS-HlwPrso8.kO9OVVz3DHPi3
    */
    // If we insert an "await" for result is undefined for all urls
  return result
}
export default wrapper 