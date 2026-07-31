import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const githubPages = process.env.GITHUB_PAGES === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: githubPages ? "export" : undefined,
  trailingSlash: githubPages,
  basePath: githubPages ? "/papp-web" : undefined,
  assetPrefix: githubPages ? "/papp-web/" : undefined,
  env: {
    NEXT_PUBLIC_SITE_BASE_PATH: githubPages ? "/papp-web" : ""
  },
  reactStrictMode: true,
  images: {
    unoptimized: githubPages,
    formats: ["image/avif", "image/webp"]
  },
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: ["import", "global-builtin", "color-functions"]
  },
  turbopack: {
    root
  }
};

export default nextConfig;
