/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    redirects: async () => [
        {
            source: '/articles',
            destination: '/',
            permanent: true,
        },
    ],
}

module.exports = nextConfig
