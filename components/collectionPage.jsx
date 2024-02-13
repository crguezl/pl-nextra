import Link from 'next/link'
import { useRouter } from 'next/router'
import { getPagesUnderRoute } from 'nextra/context'
import filterRouteLocale from 'nextra/filter-route-locale'
import styles from './counters.module.css'
import LabInfo from '@/components/LabInfo'

const ClassroomAssignments = "https://classroom.github.com/classrooms/153934884-ull-esit-pl-2324/assignments/"
const Repos = "https://github.com/orgs/ULL-ESIT-PL-2324/repositories?q="

export function CollectionPage({ path }) {
  const { locale, defaultLocale } = useRouter()
  let result = filterRouteLocale(
    getPagesUnderRoute(path),
    locale, defaultLocale
  ).map(page => {
      //console.error(page.frontMatter?.title)
      if (page.frontMatter?.display === 'hidden') return null
      return (
        <li key={page.route}>
          <Link className={styles.link} href={page.route}>{page.meta?.title || page.frontMatter?.title || page?.name}</Link>
          {path === '/labs' && <LabInfo page={page} />} 
          {path.startsWith('/clases') &&     
              <ul className={styles.uList}>
                  <li>{page.frontMatter?.summary}</li>
                  <li><Link className={styles.link} href={page.route+"#videos"}>Videos</Link></li>
                  {page.frontMatter?.topics?.map(topic => <li>Topic: <Link className={styles.link} href={topic.href}>{topic.text}</Link></li>)}
              </ul> 
          }
        </li>
       )
    })
    return (
        <ol className={styles.myList} reversed>
            {result}
        </ol>
    )
}
