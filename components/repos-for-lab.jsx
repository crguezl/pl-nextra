import { Link } from '@/src/frontmatter'
import Styles from '@/components/counters.module.css'
import React from 'react'

export default function ReposForLab({ lab}) {
  return (
    <div>
      <ul className={Styles.uList}>
        <li>Repos for lab <Link href={"https://github.com/orgs/ULL-ESIT-PL-2324/repositories?q="+lab}>{lab}</Link></li>
        <li>
          <Link href={"https://classroom.github.com/classrooms/153934884-ull-esit-pl-2324/assignments/"+lab}>
          GitHub Classroom Assignments for lab {lab}
          </Link>
        </li>
        <li><Link href={"https://github.com/ULL-ESIT-PL/"+lab+"-template"}>Repo template</Link></li>
      </ul>
    </div>
  )
}


