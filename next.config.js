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
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
        //port: '80',
        pathname: '/images/**',
      },
    ],
    domains: ['avatars.githubusercontent.com'],
  },  
}

const withNextra = require('nextra')(myConfig)

module.exports = withNextra()
