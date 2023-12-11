/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcMinify: false,
        serverComponentsExternalPackages: ["mongoose", "@typegoose/typegoose"]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
            }
        ]
    }
};

module.exports = nextConfig;
