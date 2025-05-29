/** @type {import('next').NextConfig} */
const repo = 'Portfolio'; // Change if your repo name is different
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  // Ensure static assets are properly handled
  trailingSlash: true,
  // Copy static assets to the output directory
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]'
      }
    });
    return config;
  },
  // Ensure proper path handling for static assets
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 