import { Link } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'

const frontmatter = () => {
    return useConfig().frontMatter
}

export { Link, frontmatter };