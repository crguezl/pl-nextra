const myConfig = {
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true
}

const withNextra = require('nextra')(myConfig)

module.exports = withNextra()
