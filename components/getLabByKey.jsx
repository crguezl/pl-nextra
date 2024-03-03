import { getPagesUnderRoute } from 'nextra/context'
import filterRouteLocale from 'nextra/filter-route-locale'
import { useRouter } from 'next/router'

// returns the page for a given labKey
export default function getLabByKey({ labKey }) {
    const pages = getPagesUnderRoute("/labs")
    console.error("labKey=", labKey)
    //console.error(pages[0])
    let result = pages.filter(page => {
        return (page?.frontMatter?.key === labKey) 
    })
    //console.error("Result\n", result)
    return (<div>{result[0].frontMatter.title}</div>)
}
