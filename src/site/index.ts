// src/site/index.ts
import type { SiteConfig, SiteId } from "./types";
import { lincaConfig } from "./linca";
import { reshraConfig } from "./reshra";

const parseSiteId = (value: string | undefined): SiteId => {
  return value === "reshra" ? "reshra" : "linca";
};

const siteId = parseSiteId(process.env.NEXT_PUBLIC_SITE_ID);

const configs: Record<SiteId, SiteConfig> = {
  linca: lincaConfig,
  reshra: reshraConfig,
};

export const siteConfig: SiteConfig = configs[siteId];
