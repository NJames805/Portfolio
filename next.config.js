/** @type {import('next').NextConfig} */
var githubRepo = process.env.GITHUB_REPOSITORY || "";
var repoFromGithub = githubRepo.split("/")[1] || "";
var repoName = repoFromGithub || process.env.NEXT_PUBLIC_REPO_NAME || "Portfolio";

var isProd = process.env.NODE_ENV === "production";
var isUserOrOrgPages = repoName.toLowerCase().slice(-10) === ".github.io";
var basePath = isProd && !isUserOrOrgPages ? "/" + repoName : "";

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