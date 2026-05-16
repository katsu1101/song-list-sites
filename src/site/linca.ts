// src/site/linca.ts
import type {Locale}     from "@/i18n/routing";
import {basePath}        from "./runtime";
import type {SiteConfig} from "./types";

export const lincaConfig: SiteConfig = {
  id: "linca",
  assetDir: "linca",
  basePath,
  siteUrl: "https://katsu1101.github.io/song-list-linca-tojou/",
  title: "戸定梨香ちゃんの歌リスト",
  description:
    "戸定梨香さんが配信で歌った最新の歌情報を更新。かわいいVTuber戸定梨香さんの歌声の魅力を堪能できるサイトです。",
  keywords: ["戸定梨香", "VTuber", "かわいい", "j-pop", "アニソン"],
  linkNote: `#戸定梨香ちゃんの歌リスト の検索結果\nキーワード: `,
  linkNote2: `#戸定梨香ちゃんの歌リスト`,
  tagSuffix: `\n#戸定梨香 #とじょりん \n　\n　`,

  menuItems: [
    {name: "YouTube（戸定梨香）", url: "https://www.youtube.com/@Linca_Tojou"},
    {name: "𝕏（戸定梨香）", url: "https://x.com/Tojou_Linca"},
    {name: "Fantia（戸定梨香のとじょりんワールド）", url: "https://fantia.jp/fanclubs/70005"},
    {name: "ASE OFFICIAL STORE", url: "https://ase-store.com/?category_id=67888c9a6e449503ebae7c96"},
    {name: "SUZURI（とじょりんがいっぱい）", url: "https://suzuri.jp/lincatojou"},
    {name: "VASE 公式サイト", url: "https://www.vase.tokyo/"},

    {name: "LINEスタンプ", url: "https://store.line.me/stickershop/product/20411879/ja"},
    {name: "ローソンプリント", url: "https://lawson-print.com/products/categories/vase"},
    {name: "ファミマプリント", url: "https://famima-print.family.co.jp/vtuber/vase-59tnz"},

    {name: "きっくーのメモ帳（データ提供元）", url: "https://kicku-tw.blogspot.com/"},
    {name: "𝕏（かつき）", url: "https://x.com/katsu1101"},
    {name: "とじょりん聖地（茶月兄チャマ）", url: "https://maps.app.goo.gl/oLhPAWA7RqTj8eXK7"},
    {name: "ちばっことじょりん（茶月兄チャマ）", url: "https://maps.app.goo.gl/Ce7naG5KTSxGPcwv8"},
  ]
} as const;

type LocalizedLincaConfig = Pick<SiteConfig, "title" | "description" |  "keywords" | "linkNote" | "linkNote2" | "menuItems">;

const lincaLocalizedConfig: Record<Locale, LocalizedLincaConfig> = {
  ja: {
    title: "戸定梨香ちゃんの歌リスト",
    description: "戸定梨香さんが配信で歌った最新の歌情報を更新。かわいいVTuber戸定梨香さんの歌声の魅力を堪能できるサイトです。",
    keywords: ["戸定梨香", "VTuber", "かわいい", "j-pop", "アニソン"],
    linkNote: "#戸定梨香ちゃんの歌リスト の検索結果\nキーワード: ",
    linkNote2: "#戸定梨香ちゃんの歌リスト",
    menuItems: lincaConfig.menuItems,
  },
  en: {
    title: "Linca Tojou Song List",
    description: "A song list site featuring songs sung by Linca Tojou during streams.",
    keywords: ["Linca Tojou", "VTuber", "songs", "j-pop", "anisong"],
    linkNote: "#LincaTojouSongList search results\nKeyword: ",
    linkNote2: "#LincaTojouSongList",
    menuItems: [
      {name: "YouTube (Linca Tojou)", url: "https://www.youtube.com/@Linca_Tojou"},
      {name: "X (Linca Tojou)", url: "https://x.com/Tojou_Linca"},
      {name: "Fantia (Linca Tojou no Tojorin World)", url: "https://fantia.jp/fanclubs/70005"},
      {name: "ASE OFFICIAL STORE", url: "https://ase-store.com/?category_id=67888c9a6e449503ebae7c96"},
      {name: "SUZURI (Tojorin Merch)", url: "https://suzuri.jp/lincatojou"},
      {name: "VASE Official Site", url: "https://www.vase.tokyo/"},
      {name: "LINE Stickers", url: "https://store.line.me/stickershop/product/20411879/ja"},
      {name: "Lawson Print", url: "https://lawson-print.com/products/categories/vase"},
      {name: "Famima Print", url: "https://famima-print.family.co.jp/vtuber/vase-59tnz"},
      {name: "Kicku's Memo (Data Source)", url: "https://kicku-tw.blogspot.com/"},
      {name: "X (katsuki)", url: "https://x.com/katsu1101"},
      {name: "Tojorin Pilgrimage Spot", url: "https://maps.app.goo.gl/oLhPAWA7RqTj8eXK7"},
      {name: "Chibakko Tojorin", url: "https://maps.app.goo.gl/Ce7naG5KTSxGPcwv8"},
    ],
  },
};

export const getLincaConfigByLocale = (locale: Locale): SiteConfig => ({
  ...lincaConfig,
  ...lincaLocalizedConfig[locale],
});