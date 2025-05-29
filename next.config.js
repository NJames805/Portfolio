/** @type {import('next').NextConfig} */
const repo = 'portfolio'; // Change if your repo name is different
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/'+repo,
  assetPrefix: '/'+repo+'/',
};

module.exports = nextConfig; 