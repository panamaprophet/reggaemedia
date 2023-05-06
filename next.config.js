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
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            }
        ]
    }
}

module.exports = nextConfig
