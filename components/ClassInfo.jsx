import React from 'react'
import styles from './counters.module.css'
import Link from 'next/link'

export default function ClassInfo({page}) {
    return (
        <div>
            <ul className={styles.uList}>
                  <li key="frontMatter">{page.frontMatter?.summary}</li>
                  <li key="videos"><Link className={styles.link} href={page.route+"#videos"}>Videos</Link></li>
                  {page.frontMatter?.topics?.map(topic => <li key={topic.text}><Link className={styles.link} href={topic.href}>{topic.text}</Link></li>)}
            </ul> 
        </div>
    )
}
