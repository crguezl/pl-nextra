import React from 'react'
import styles from './counters.module.css'
import Link from 'next/link'
const ClassroomAssignments = "https://classroom.github.com/classrooms/153934884-ull-esit-pl-2324/assignments/"
const Repos = "https://github.com/orgs/ULL-ESIT-PL-2324/repositories?q="

export default function LabInfo({page}) {
    return (
        <div>
            <ul className={styles.uList}>
                <li key="rubric"><Link className={styles.link} href={page.route + "#rubric"}>Rubric</Link></li>
                <li key="classroom"><Link className={styles.link} href={ClassroomAssignments + page.frontMatter?.key} target="_blank">Classroom</Link></li>
                <li key="repos"><Link className={styles.link} href={Repos + page.frontMatter?.key} target="_blank">Repos</Link></li>
                <li key="videos"><Link className={styles.link} href={page.route + "#videos"} target="_blank">Videos</Link></li>
            </ul>
        </div>
    )
}
