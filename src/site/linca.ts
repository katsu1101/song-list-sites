// src/site/linca.ts
import type {Locale} from "@/i18n/routing";
import {lincaEnConfig} from "./linca-locales/en";
import {lincaJaConfig} from "./linca-locales/ja";
import {basePath} from "./runtime";
import type {SiteConfig} from "./types";

type LocalizedLincaConfig = Pick<SiteConfig, "title" | "description" | "keywords" | "linkNote" | "linkNote2" | "tagSuffix" | "menuItems">;

const lincaLocalizedConfig: Record<Locale, LocalizedLincaConfig> = {
  ja: lincaJaConfig,
  en: lincaEnConfig,
};


export const lincaConfig: SiteConfig = {
  id: "linca",
  assetDir: "linca",
  basePath,
  siteUrl: "https://katsu1101.github.io/song-list-linca-tojou/",
  title: lincaJaConfig.title,
  description: lincaJaConfig.description,
  keywords: lincaJaConfig.keywords,
  linkNote: lincaJaConfig.linkNote,
  linkNote2: lincaJaConfig.linkNote2,
  tagSuffix: lincaJaConfig.tagSuffix,
  menuItems: lincaJaConfig.menuItems,
} as const;

export const getLincaConfigByLocale = (locale: Locale): SiteConfig => ({
  ...lincaConfig,
  ...lincaLocalizedConfig[locale],
});
