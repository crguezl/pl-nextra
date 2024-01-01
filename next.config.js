const myConfig = {
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        //port: '80',
        pathname: '/u',
      },
    ],
    domains: ['avatars.githubusercontent.com'],
  },  
}

const withNextra = require('nextra')(myConfig)

module.exports = withNextra()
