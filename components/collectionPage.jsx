import Link from 'next/link'
import { useRouter } from 'next/router'
import { getPagesUnderRoute } from 'nextra/context'
import filterRouteLocale from 'nextra/filter-route-locale'
import styles from './counters.module.css'
import LabInfo from '@/components/LabInfo'
import ClassInfo from '@/components/ClassInfo'


const ClassroomAssignments = "https://classroom.github.com/classrooms/153934884-ull-esit-pl-2324/assignments/"
const Repos = "https://github.com/orgs/ULL-ESIT-PL-2324/repositories?q="

export function CollectionPage({ path }) {
  const { locale, defaultLocale } = useRouter()
  const pages = getPagesUnderRoute(path)
  //console.error(pages)
  let result = filterRouteLocale(pages,locale, defaultLocale).map(page => {
      //console.error(page.frontMatter?.title)
      if (page.frontMatter?.display === 'hidden') return null
      return (
        <li key={page.route}>
          <Link className={styles.link} href={page.route}>{page.meta?.title || page.frontMatter?.title || page?.name}</Link>
          {path === '/labs' && <LabInfo page={page} />} 
          {path.startsWith('/clases') &&  <ClassInfo page={page} />} 
        </li>
       )
    })
    return (
        <ol className={styles.myList} reversed>
            {result}
        </ol>
    )
}
