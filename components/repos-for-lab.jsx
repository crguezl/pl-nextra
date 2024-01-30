import { Link } from '@/src/frontmatter'

import React from 'react'

export default function ReposForLab({ lab }) {
  return (
    <div>
        Repos for lab <Link href={"https://github.com/orgs/ULL-ESIT-PL-2324/repositories?q="+lab}>{lab}</Link>
    </div>
  )
}


