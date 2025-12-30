import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        "node:fs": false
      }

      console.log('Webpack version:', webpack.version)
    }
    return config
  }
}

export default nextConfig
