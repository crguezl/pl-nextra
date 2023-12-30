import { signOut } from "next-auth/react"
import styles from './counters.module.css'

export default function() {
  return (<div className={styles.container}>
            <button 
                onClick={() => signOut()} 
                className={ styles.button }
                >
                Sign out
            </button>
          </div>)
}

