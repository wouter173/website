import nextMdx from "@next/mdx";

const withMdx = nextMdx();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({ test: /\.glsl/, type: "asset/source" });
    return config;
  },
};

export default withMdx(nextConfig);
