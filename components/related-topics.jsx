import React from 'react'
import { Link } from 'nextra-theme-docs';
import styles from './counters.module.css'

export default function RelatedTopics({ topics} ) {
  let topicsJSX = topics.map(topic => {
        return <li  key={topic.href}><Link href={topic.href}>{topic.text}</Link></li>
  })
  return (
    <ul className={ styles.myList}>
        {topicsJSX}
    </ul>
  )
}
