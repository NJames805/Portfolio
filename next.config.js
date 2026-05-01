/** @type {import('next').NextConfig} */
const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ??
  process.env.NEXT_PUBLIC_REPO_NAME ??
  "portfolio";

const isProd = process.env.NODE_ENV === "production";
const isUserOrOrgPages = repoName.toLowerCase().endsWith(".github.io");
const basePath = isProd && !isUserOrOrgPages ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name][ext]",
      },
    });
    return config;
  },
};

module.exports = nextConfig; 