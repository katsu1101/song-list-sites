import type {SiteConfig} from "../types";

export const lincaEnConfig = {
  title: "Linca Tojou Song List",
  description: "A song list site featuring songs sung by Linca Tojou during streams.",
  keywords: ["Linca Tojou", "VTuber", "songs", "j-pop", "anisong"],
  linkNote: "#LincaTojouSongList search results\nKeyword: ",
  linkNote2: "#LincaTojouSongList",
  tagSuffix: "\n#LincaTojou \n　\n　",
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
} as const satisfies Pick<SiteConfig, "title" | "description" | "keywords" | "linkNote" | "linkNote2" | "tagSuffix" | "menuItems">;
