/*
export default function handler(req, res) {
  res.status(200).send("hello") // json({ message: 'Hello from Next.js!' })
}
*/

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
        organization: "ULL-ESIT-PL-2324",
        //alu: "gcruz174"
      });

    //res.status(200).json({ message: 'Hello from Next.js!' })
    //console.error("r\n", JSON.stringify(r, null, 2))
    let teams = r?.organization?.teams
    // TODO: check if teams has a value
    if (email === 'crguezl@ull.edu.es') {
      teams = teams.edges.map(n => n.node)
    }
    else {
      teams = teams.edges.filter(n => n?.node?.name?.includes(id)).map(n => n.node)
      //console.error("alu\n",JSON.stringify(teams, null, 2))
    }
    res.status(200).json({
      totalCount: r?.organization?.teams?.totalCount,
      teams
    })
  } else {
    res.status(200).json({ error: 'Not authorized. Login first' })
  }
}
