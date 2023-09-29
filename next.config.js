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
    },
    webpack: (config) => {
        config.externals.push({
            '@aws-sdk/signature-v4-multi-region': 'commonjs @aws-sdk/signature-v4-multi-region',
        });

        return config;
    },
}

module.exports = nextConfig
