// src/site/reshra.ts
import type { SiteConfig } from "./types";
import { basePath } from "./runtime";

export const reshraConfig: SiteConfig = {
  id: "reshra",
  assetDir: "reshra",
  basePath,
  siteUrl: "https://katsu1101.github.io/song-list-reshra-hanamaki/",
  title: "花巻レシュラちゃんの歌リスト",
  description: "花巻レシュラさんが配信で歌った歌情報をまとめるサイトです。",
  keywords: ["花巻レシュラ", "VTuber", "j-pop", "アニソン"],
  linkNote: `#花巻レシュラちゃんの歌リスト の検索結果\nキーワード: `,
  linkNote2: `#花巻レシュラちゃんの歌リスト`,
  tagSuffix: `\n#レシュラ \n　\n　`,

  menuItems: [
    { name: "YouTube（花巻レシュラ）", url: "https://www.youtube.com/@ReshRa_vase" },
    { name: "twitch（花巻レシュラ）", url: "https://www.twitch.tv/reshra_vase"},
    { name: "𝕏（花巻レシュラ）", url: "https://x.com/ReshRa_vase" },
    { name: "Fantia（レーシュ星発信局）", url: "https://fantia.jp/fanclubs/187641" },
    { name: "ASE OFFICIAL STORE", url: "https://ase-store.com/?category_id=67888caed5cfeb0421ef8a56" },
    { name: "SUZURI（レシュラのかわいい屋さん）", url: "https://suzuri.jp/reshrahanamaki" },
    { name: "VASE 公式サイト", url: "https://www.vase.tokyo/" },

    { name: "ローソンプリント", url: "https://lawson-print.com/products/categories/vase"},
    { name: "ファミマプリント", url: "https://famima-print.family.co.jp/vtuber/vase-59tnz" },

    { name: "𝕏（かつき）", url: "https://x.com/katsu1101" },
  ]
} as const;
