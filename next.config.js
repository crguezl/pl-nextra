const myConfig = {
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  images: { /* To protect your application from malicious users, configuration is required in order to use external images. This ensures that only external images from your account can be served from the Next.js Image Optimization API. These external images can be configured with the remotePatterns property in your next.config.js file */
    remotePatterns: [ // See https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
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
