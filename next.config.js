/** @type {import('next').NextConfig} */
const { homepage } = require("./package.json");

const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ??
  process.env.NEXT_PUBLIC_REPO_NAME ??
  null;

const isProd = process.env.NODE_ENV === "production";

function basePathFromHomepage(homepageUrl) {
  if (!homepageUrl) return "";
  try {
    const u = new URL(homepageUrl);
    const p = u.pathname.replace(/\/+$/, "");
    return p === "" ? "" : p;
  } catch {
    return "";
  }
}

const inferredBasePath = basePathFromHomepage(homepage);
const basePath = isProd ? inferredBasePath || (repoName ? `/${repoName}` : "") : "";

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