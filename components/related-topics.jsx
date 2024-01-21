import React from 'react'
import { Link } from 'nextra-theme-docs';
import styles from './counters.module.css'

export default function RelatedTopics({ topics} ) {
  let topicsJSX = topics.map(topic => {
        return <li><Link href={topic.href} key={topic.href}>{topic.text}</Link></li>
  })
  return (
    <ul className={ styles.myList}>
        {topicsJSX}
    </ul>
  )
}
