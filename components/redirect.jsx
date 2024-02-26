import { useRouter } from 'next/router'
import styles from './counters.module.css'


export default function Redirect({to, title}) {
  const router = useRouter()
 
  return (
    <button className={ styles.button } type="button" onClick={() => router.push(to)}>
      {title}
    </button>
  )
}