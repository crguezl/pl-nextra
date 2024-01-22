import React from 'react'
import { Link } from 'nextra-theme-docs';
import styles from './counters.module.css'

export default function relatedLabs({ labs} ) {
  let labsJSX = labs.map(lab => {
        return <li><Link href={`/labs/${lab}`} key={lab}>{lab}</Link></li>
  })
  return (
    <ul className={ styles.myList}>
        {labsJSX}
    </ul>
  )
}
