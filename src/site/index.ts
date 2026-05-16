// src/site/index.ts
import type {Locale}                         from "@/i18n/routing";
import {getLincaConfigByLocale, lincaConfig} from "./linca";
import {reshraConfig}                        from "./reshra";
import type {SiteConfig, SiteId}             from "./types";

const parseSiteId = (value: string | undefined): SiteId => {
  return value === "reshra" ? "reshra" : "linca";
};

const siteId = parseSiteId(process.env.NEXT_PUBLIC_SITE_ID);

const configs: Record<SiteId, SiteConfig> = {
  linca: lincaConfig,
  reshra: reshraConfig,
};

export const siteConfig: SiteConfig = configs[siteId];

export const getSiteConfigByLocale = (locale: Locale): SiteConfig => {
  if (siteId === "linca") {
    return getLincaConfigByLocale(locale);
  }
  return siteConfig;
};
