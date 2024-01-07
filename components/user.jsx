import { useSession, signOut } from "next-auth/react" // https://next-auth.js.org/getting-started/client#usesession
import { useConfig } from 'nextra-theme-docs'
import styles from './counters.module.css'


export default function User() {
  const { data: session, status } = useSession()
  let config = useConfig()

  if (status === "authenticated") {
    console.error("***********Session***********")
    console.error(session)
    config.chat.icon = (session.user.name)
    return (<div>
          <ul className={styles.uList}>
            <li><img src={session.user.image} alt={session.user.name} width="32" height="32" /></li>
            <li>Email: {session.user.email}</li>
            <li>Name: {session.user.name}</li>
          </ul>  
          <button onClick={() => signOut()} className={styles.button}>Sign out</button>
        </div>)
  }

  return <a href="/api/auth/signin">Sign in</a>
}