"use client"

import { useSession, signOut } from "next-auth/react" // https://next-auth.js.org/getting-started/client#usesession
import { useConfig } from 'nextra-theme-docs'
import styles from './counters.module.css'
const profiles = [
  {
    "Order": "A1",
    "Email": "alu0100291865@ull.edu.es",
    "Participant Name": "Casiano Alumni Rodríguez",
    "%Killer": "15,00%",
    "%Socialiser": "43,33%",
    "%Achiever": "30,00%",
    "%Explorer": "16,67%",
    "Bartle": "S"
  },

  {
    "Order": "A1",
    "Email": "alu0101404141@ull.edu.es",
    "Participant Name": "Saul Sosa Diaz",
    "%Killer": "10,00%",
    "%Socialiser": "43,33%",
    "%Achiever": "30,00%",
    "%Explorer": "16,67%",
    "Bartle": "S"
  },
  {
    "Order": "A2",
    "Email": "alu0101477596@ull.edu.es",
    "Participant Name": "Juan Rodriguez Suarez",
    "%Killer": "26,67%",
    "%Socialiser": "13,33%",
    "%Achiever": "30,00%",
    "%Explorer": "30,00%",
    "Bartle": "AE"
  },
  {
    "Order": "A3",
    "Email": "alu0101471846@ull.edu.es",
    "Participant Name": "José Ramon Morera Campos",
    "%Killer": "16,67%",
    "%Socialiser": "36,67%",
    "%Achiever": "16,67%",
    "%Explorer": "30,00%",
    "Bartle": "S"
  },
  {
    "Order": "A4",
    "Email": "alu0101487i37@ull.edu.es",
    "Participant Name": "Elias Hernandez Abreu",
    "%Killer": "40,00%",
    "%Socialiser": "26,67%",
    "%Achiever": "20,00%",
    "%Explorer": "13,33%",
    "Bartle": "K"
  },
  {
    "Order": "AS",
    "Email": "alu0101110639@ull.edu.es",
    "Participant Name": "Julio lvan Carrasco Armas",
    "%Killer": "23,33%",
    "%Socialiser": "13,33%",
    "%Achiever": "20,00%",
    "%Explorer": "36,67%",
    "Bartle": "E"
  },
  {
    "Order": "A6",
    "Email": "alu0101227023@ull.edu.es",
    "Participant Name": "fenic",
    "%Killer": "16,67%",
    "%Socialiser": "30,00%",
    "%Achiever": "43,33%",
    "%Explorer": "10,00%",
    "Bartle": "A"
  },
  {
    "Order": "A7",
    "Email": "alu0101219622@ull.edu.es",
    "Participant Name": "Tania Évora Vargas Martinez",
    "%Killer": "13,33%",
    "%Socialiser": "23,33%",
    "%Achiever": "33,33%",
    "%Explorer": "30,00%",
    "Bartle": "A"
  },
  {
    "Order": "AS",
    "Email": "alu0101389936@ull.edu.es",
    "Participant Name": "Sergio Nicolas Segui",
    "%Killer": "33,33%",
    "%Socialiser": "23,33%",
    "%Achiever": "26,67%",
    "%Explorer": "16,67%",
    "Bartle": "K"
  },
  {
    "Order": "A9",
    "Email": "alu0101465883@ull.edu.es",
    "Participant Name": "Adrian Mora Rodriguez",
    "%Killer": "13,33%",
    "%Socialiser": "30,00%",
    "%Achiever": "16,67%",
    "%Explorer": "40,00%",
    "Bartle": "E"
  },
  {
    "Order": "AIO",
    "Email": "alu0101392561@ull.edu.es",
    "Participant Name": "José Lozano Armas",
    "%Killer": "26,67%",
    "%Socialiser": "30,00%",
    "%Achiever": "26,67%",
    "%Explorer": "16,67%",
    "Bartle": "S"
  },
  {
    "Order": "All",
    "Email": "alu0101481227@ull.edu.es",
    "Participant Name": "Hugo Hernandez Martin",
    "%Killer": "26,67%",
    "%Socialiser": "26,67%",
    "%Achiever": "16,67%",
    "%Explorer": "30,00%",
    "Bartle": "E"
  },
  {
    "Order": "A12",
    "Email": "alu0101434780@ull.edu.es",
    "Participant Name": "Esther Medina Quintero",
    "%Killer": "10,00%",
    "%Socialiser": "33,33%",
    "%Achiever": "23,33%",
    "%Explorer": "33,33%",
    "Bartle": "SE"
  },
  {
    "Order": "A13",
    "Email": "alu0101480213@ull.edu.es",
    "Participant Name": "Adrian Alejandro Padron Lopez",
    "%Killer": "23,33%",
    "%Socialiser": "33,33%",
    "%Achiever": "20,00%",
    "%Explorer": "23,33%",
    "Bartle": "S"
  },
  {
    "Order": "A14",
    "Email": "alu0101499208@ull.edu.es",
    "Participant Name": "Daniel David Sarmiento Barrera",
    "%Killer": "26,67%",
    "%Socialiser": "20,00%",
    "%Achiever": "23,33%",
    "%Explorer": "30,00%",
    "Bartle": "E"
  },
  {
    "Order": "A15",
    "Email": "alu0101469652@ull.edu.es",
    "Participant Name": "Igor Dragone",
    "%Killer": "10,00%",
    "%Socialiser": "30,00%",
    "%Achiever": "23,33%",
    "%Explorer": "36,67%",
    "Bartle": "E"
  },
  {
    "Order": "A16",
    "Email": "alu0101471136@ull.edu.es",
    "Participant Name": "Raul bavarez Pérez",
    "%Killer": "23,33%",
    "%Socialiser": "23,33%",
    "%Achiever": "20,00%",
    "%Explorer": "33,33%",
    "Bartle": "E"
  },
  {
    "Order": "A17",
    "Email": "alu0101444741@ull.edu.es",
    "Participant Name": "Roberto Carrazana Pernia",
    "%Killer": "16,67%",
    "%Socialiser": "26,67%",
    "%Achiever": "23,33%",
    "%Explorer": "33,33%",
    "Bartle": "E"
  },
  {
    "Order": "A18",
    "Email": "alu0101495439@ull.edu.es",
    "Participant Name": "Adrian Suarez Tabares",
    "%Killer": "26,67%",
    "%Socialiser": "23,33%",
    "%Achiever": "20,00%",
    "%Explorer": "30,00%",
    "Bartle": "E"
  },
  {
    "Order": "A19",
    "Email": "alu0101408248@ull.edu.es",
    "Participant Name": "Thornas Edward Bradley",
    "%Killer": "16,67%",
    "%Socialiser": "30,00%",
    "%Achiever": "23,33%",
    "%Explorer": "30,00%",
    "Bartle": "SE"
  },
  {
    "Order": "A20",
    "Email": "alu0101491776@ull.edu.es",
    "Participant Name": "Tornas de Armas Déniz",
    "%Killer": "20,00%",
    "%Socialiser": "20,00%",
    "%Achiever": "33,33%",
    "%Explorer": "26,67%",
    "Bartle": "A"
  },
  {
    "Order": "A21",
    "Email": "alu0101476124@ull.edu.es",
    "Participant Name": "Jaime Martin",
    "%Killer": "16,67%",
    "%Socialiser": "33,33%",
    "%Achiever": "26,67%",
    "%Explorer": "23,33%",
    "Bartle": "S"
  },
  {
    "Order": "A22",
    "Email": "alu0101516332@ull.edu.es",
    "Participant Name": "Hugo Gonzalez Pérez",
    "%Killer": "16,67%",
    "%Socialiser": "26,67%",
    "%Achiever": "30,00%",
    "%Explorer": "26,67%",
    "Bartle": "A"
  },
  {
    "Order": "A23",
    "Email": "alu0101246949@ull.edu.es",
    "Participant Name": "Laura Ramallo Pérez",
    "%Killer": "10,00%",
    "%Socialiser": "33,33%",
    "%Achiever": "30,00%",
    "%Explorer": "26,67%",
    "Bartle": "S"
  },
  {
    "Order": "A24",
    "Email": "alu0101123547@u11.edu.es",
    "Participant Name": "Jorge Quintana Garcia",
    "%Killer": "10,00%",
    "%Socialiser": "30,00%",
    "%Achiever": "26,67%",
    "%Explorer": "33,33%",
    "Bartle": "E"
  }
]

function Profile(p) {
  return (<li key={p.Email}>
    <b>{p["Participant Name"]}</b>:
    &nbsp; Killer: {p["%Killer"]},
    Socialiser: {p["%Socialiser"]},
    Achiever: {p["%Achiever"]},
    Explorer: {p["%Explorer"]},
    Bartle: <b>{p["Bartle"]}</b>
  </li>)
}

function PlayerProfile(p) {
  return (
    <ul className={styles.uList}>
      <li>Killer: {p["%Killer"]}</li>
      <li>Socialiser: {p["%Socialiser"]}</li>
      <li>Achiever: {p["%Achiever"]}</li>
      <li>Explorer: {p["%Explorer"]}</li>
      <li>Bartle: <b>{p["Bartle"]}</b> </li>
    </ul>
  )
}

function AllProfiles() {
  return (
    <ul className={styles.uList}>
      {
        profiles.map(p => (
          <Profile {...p} />
        ))
      }
    </ul>
  )
}

export default function Player({admin}) {
  const { data: session, status } = useSession()
  let config = useConfig()

  if (status === "authenticated") {
    console.error("***********Admin***********", admin)
    console.error("***********Session***********")
    console.error(session)
    config.chat.icon = (session.user.name)
    if (session.user.email === admin) return (<AllProfiles />)
    let userProfile = profiles.find(p => p.Email === session.user.email)
    if (userProfile) return <ul className={styles.uList}>{userProfile ? <PlayerProfile {...userProfile} /> : null}</ul>
    return null;
  }
  return null;
}

