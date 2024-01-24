/*
export default function handler(req, res) {
  res.status(200).send("hello") // json({ message: 'Hello from Next.js!' })
}
*/

const ORGANIZATION = "ULL-ESIT-PL-2324"
const TEACHEREMAIL = 'crguezl@ull.edu.es'

import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

import { graphql } from "@octokit/graphql";
import { log } from "console"
import { inspect } from "util"

const teamsQuery = `query getInfo($organization: String!) {
  organization(login: $organization) {
    teams(first: 100) {
      totalCount
      edges {
        node {
          name
          members(first: 100) {
            totalCount
            edges {
              memberAccessUrl
              node {
                name
                url
                email
                login
                avatarUrl             
              }
            }
          }
          url
        }
      }
    }
  }
}
  `

export default async function getTeams(req, res) {
  //const { body, cookies, headers, method, query } = req
  //log(inspect({ body, cookies, method, query }, { depth: 1 })) 

  const session = await getServerSession(req, res, authOptions)

  //console.error("session", session)
  let email = session?.user?.email;
  if (email) {
    let [id, domain] = email.split("@");
    //console.error(`id=${id} domain=${domain}`)

    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    const r = await graphqlWithAuth(teamsQuery,
      {
        organization: ORGANIZATION,
        //alu: "gcruz174"
      });

    //res.status(200).json({ message: 'Hello from Next.js!' })
    //console.error("r\n", JSON.stringify(r, null, 2))
    let teams = r?.organization?.teams
    // TODO: check if teams has a value
    if (email === TEACHEREMAIL) {
      teams = teams.edges.map(n => n.node)
    }
    else {
      teams = teams.edges.filter(n => n?.node?.name?.includes(id)).map(n => n.node)
      //console.error("alu\n",JSON.stringify(teams, null, 2))
    }
    teams = teams.sort((f1,f2) => {
      let [name1, ape11, ape12, alu1] = f1.name.split("-")
      let [name2, ape21, ape22, alu2] = f2.name.split("-")

      if (!alu1) alu1 = ape12
      if (!alu2) alu2 = ape22

      if (ape11 < ape21) return -1
      if (ape11 > ape21) return 1
      if (ape12 < ape22) return -1
      if (ape12 > ape22) return 1
      if (name1 < name2) return -1
      if (name1 > name2) return 1
      if (alu1 < alu2) return -1
      if (alu1 > alu2) return 1
      return 0
    })
    res.status(200).json({
      totalCount: r?.organization?.teams?.totalCount,
      teams
    })
  } else {
    res.status(200).json({ error: 'Not authorized. Login first' })
  }
}
