import {basePath}        from "@/site/runtime";
import fs                from "fs";
import type {NextConfig} from "next";
import nextPWA           from "next-pwa";
import createNextIntlPlugin from "next-intl/plugin";
import path              from "path";

// 🔽 追加: ビルドバージョンを更新する関数
const updateBuildVersion = () => {
  const buildVersionPath = path.join(__dirname, "public", "build-version.json");
  const timestamp = new Date().toISOString();

  fs.writeFileSync(buildVersionPath, JSON.stringify({version: timestamp}, null, 2));
  console.log(`✅ Build version updated: ${timestamp}`);
};

// 🔽 追加: Next.js のビルド時にバージョンを自動更新
updateBuildVersion();

const nextConfig: NextConfig = {
  output: "export", // ✅ 静的サイト化
  images: {unoptimized: true}, // ✅ GitHub Pages は画像最適化ができないため無効化
  trailingSlash: true, // ✅ URL の末尾に `/` を追加（GitHub Pages 互換）
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  reactStrictMode: true,

  webpack: (config) => {
    // 必要に応じて Webpack のカスタム設定
    config.resolve.fallback = {fs: false};
    return config;
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // 開発中に邪魔なら:
  disable: process.env.NODE_ENV !== "production",
});

export default withNextIntl(withPWA(nextConfig));
