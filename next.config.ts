import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to out/,
// which GitHub Pages serves (see .github/workflows/deploy.yml).
const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true, // journal/index.html instead of journal.html, which GitHub Pages serves reliably
    images: { unoptimized: true },
    turbopack: { root: __dirname },
};

export default nextConfig;
