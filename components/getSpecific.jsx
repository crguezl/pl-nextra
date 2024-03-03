import Link from 'next/link'
import { getPagesUnderRoute } from 'nextra/context'
import filterRouteLocale from 'nextra/filter-route-locale'
import { useRouter } from 'next/router'
import styles from './counters.module.css'

import React from 'react'

export default function getSpecific({ path }) {
    const { locale, defaultLocale } = useRouter()
    const pages = getPagesUnderRoute(path)
    //console.error(pages[0])
    let result = filterRouteLocale(pages, locale, defaultLocale).map(page => {
        if (page.frontMatter?.display === 'hidden') return null
        return (
          <li key={page.route}>
            <Link className={styles.link} href={page.route}>{page.meta?.title || page.frontMatter?.title || page?.name}</Link> {page.frontMatter?.key} 
          </li>
         )
      })
      return (<ol className={styles.myList} reversed>{result}</ol>)
}
