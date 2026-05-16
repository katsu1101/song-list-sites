export const locales = ["ja", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

export const isValidLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);
