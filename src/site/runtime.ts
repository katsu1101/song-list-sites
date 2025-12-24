// src/site/runtime.ts
const normalizeBasePath = (value: string | undefined): string => {
  const raw = (value ?? "").trim();
  if (raw === "" || raw === "/") return "";
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
};

export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
// export const siteId = (process.env.NEXT_PUBLIC_SITE_ID === "reshra" ? "reshra" : "linca") as const;
