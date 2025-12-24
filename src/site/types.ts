// src/site/types.ts

export type SiteId = "linca" | "reshra";

export type SiteConfig = Readonly<{

  id: string; // "linca" | "reshra"
  
  // public/<assetDir>/... に置くもの（favicon, manifest, og-image等）
  assetDir: string;

  // canonical / metadataBase / JSON-LDなどの絶対URL
  siteUrl: string; // 末尾 / 推奨

  // GitHub Pages の basePath（例: /song-list-linca-tojou）
  basePath: string;

  // 表示・SEO系
  title: string;
  description: string;
  keywords: string[];

  // Xへのpost
  linkNote: string; //`#戸定梨香ちゃんの歌リスト の検索結果\nキーワード: `,
  linkNote2: string; //`#戸定梨香ちゃんの歌リスト`,
  tagSuffix: string; //`\n#戸定梨香 #とじょりん \n　\n　`,

  // メユーデータ
  menuItems: { name: string, url: string }[]
}>;
