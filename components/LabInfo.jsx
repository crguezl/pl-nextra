import React from 'react'
import styles from './counters.module.css'
import Link from 'next/link'
const ClassroomAssignments = "https://classroom.github.com/classrooms/153934884-ull-esit-pl-2324/assignments/"
const Repos = "https://github.com/orgs/ULL-ESIT-PL-2324/repositories?q="

export default function LabInfo({page}) {
    return (
        <div>
            <ul className={styles.uList}>
                <li><Link className={styles.link} href={page.route + "#rubric"}>Rubric</Link></li>
                <li><Link className={styles.link} href={ClassroomAssignments + page.frontMatter?.key} target="_blank">Classroom</Link></li>
                <li><Link className={styles.link} href={Repos + page.frontMatter?.key} target="_blank">Repos</Link></li>
            </ul>
        </div>
    )
}
