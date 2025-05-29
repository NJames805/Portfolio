/** @type {import('next').NextConfig} */
const repo = 'portfolio'; // Change if your repo name is different
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/'+repo,
  assetPrefix: '/'+repo+'/',
  // Ensure static assets are properly handled
  trailingSlash: true,
  // Copy static assets to the output directory
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig; 