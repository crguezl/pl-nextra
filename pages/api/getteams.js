/*
export default function handler(req, res) {
  res.status(200).send("hello") // json({ message: 'Hello from Next.js!' })
}
*/
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

    const graphqlWithAuth = graphql.defaults({
        headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      });
      

    const r = await graphqlWithAuth(teamsQuery,
        {
            organization:"ULL-ESIT-PL-2223",
            //alu: "gcruz174"
        });    

    //res.status(200).json({ message: 'Hello from Next.js!' })
    res.status(200).json({ teams: r })
}
