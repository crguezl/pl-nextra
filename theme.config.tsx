import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import { SessionProvider } from "next-auth/react"
import { Link } from 'nextra-theme-docs'
const config: DocsThemeConfig = {
  banner: {
    key: 'functions',
    text: (<span> 
      <a href="https://gorace.uca.es/app/" target="_blank">To the Race!. </a>
      <a href="/labs/left-side##gorace-experiment" target="_blank">
         Lab left-side. deadline is 11/04 →
      </a>
    </span>
    )
  },
  logo: <span>
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24"
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor" 
    className="w-6 h-6">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" 
      />
    </svg>
  </span>,
  project: {
    link: 'https://github.com/ULL-ESIT-PL-2324',
  },
  chat: {
    link: 'https://meet.google.com/eha-yfij-zmo',
    icon: <svg 
             xmlns="http://www.w3.org/2000/svg" 
             fill="none" 
             width="20"
             viewBox="0 0 24 24" 
             strokeWidth="1.5" 
             stroke="currentColor" 
             className="w-6 h-6">
             <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" 
             />
          </svg>
  },
  docsRepositoryBase: 'https://github.com/ULL-ESIT-PL-2324/pl-nextra/blob/main/',
  footer: {
    text: (
      <span>
        ULL {new Date().getFullYear()} ©{' '}
        <Link href="https://campusingenieriaytecnologia2324.ull.es/course/view.php?id=2324090147" target="_blank">
        Notes for the 23/24 course on Programming Languages inside the Informática degree at ULL
        </Link>
        .
      </span>
    )
  },
  main: ({ children }) => { // See https://github.com/shuding/nextra/discussions/1508#discussioncomment-4990229
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { frontMatter } = useConfig();
    return (
      <SessionProvider>
      <main className="">
        <h1 className="nx-mt-2 nx-text-4xl nx-font-bold nx-tracking-tight">
          {frontMatter?.title}
        </h1>
        <p>{frontMatter?.description}</p>
        <div className="">{children}</div>
      </main>
      </SessionProvider>
    ); 
  },
  sidebar: {
    toggleButton: true,
    /*titleComponent({ title, type }) {
      if (type === 'separator') {
        return (
          <div style={{ background: 'cyan', textAlign: 'center' }}>{title}</div>
        )
      }
      if (title === 'About') {
        return <>❓ {title}</>
      }
      return <>👉 {title}</>
    }*/
  },
  toc: {
    float: true,
    title: "On this page"
  },
  faviconGlyph: '🇵🇱',
  search: {
    placeholder: "Search PL 23/24 site"
  },
  /*
  components: { // See https://nextra.site/docs/docs-theme/theme-configuration#mdx-components
    SessionProvider, //????XXXX
  }
  */
}

export default config
