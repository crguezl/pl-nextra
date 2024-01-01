import { useSession } from "next-auth/react"
import { useConfig } from 'nextra-theme-docs'
import styles from './counters.module.css'

export default function User({ logo }) {
  const { data: session, status } = useSession()
  let config = useConfig()

  if (status === "authenticated") {
    console.error("***********Session***********")
    console.error(session)
    config.chat.icon = (session.user.name)
    return <p>
        <ul className={styles.uList}>
            <li><img src={session.user.image} alt={session.user.name} width="32" height="32" /></li>
            <li>Email: {session.user.email}</li>
            <li>Name: {session.user.name}</li>
        </ul>  
        </p>
  }

  return <a href="/api/auth/signin">Sign in</a>
}