/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
      "socks-proxy-agent": "socks-proxy-agent",
    });

    return config;
  },
};

export default nextConfig;
