import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.IS_OUTPUT_EXPORT ? "export" : "standalone",
  basePath: "",
  async redirects() {
    return [
      // {
      //   source: "/",
      //   destination: "/",
      //   basePath: false,
      //   permanent: false,
      // },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.engage.mojaone.co.tz",
      },
    ],
  },
};

export default nextConfig;
