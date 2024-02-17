/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com",
            },
            {
                protocol: 'https',
                hostname: 'nextjs-demo-04-master-class.s3.eu-west-2.amazonaws.com'
            }
        ]
    },
};

export default nextConfig;
