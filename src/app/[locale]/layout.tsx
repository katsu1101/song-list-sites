import {isValidLocale}                                  from "@/i18n/routing";
import {getSiteConfigByLocale}                          from "@/site";
import {Metadata}                                       from "next";
import {NextIntlClientProvider}                         from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound}                                       from "next/navigation";
import React                                            from "react";

export async function generateMetadata({
                                         params,
                                       }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!isValidLocale(locale)) notFound();

  const t = await getTranslations({locale});
  const localizedSiteConfig = getSiteConfigByLocale(locale);
  const description = t("metadataDescription");
  const localePath = locale === "ja" ? "" : `${locale}/`;
  const canonicalUrl = new URL(localePath, localizedSiteConfig.siteUrl).toString();

  return {
    title: localizedSiteConfig.title,
    description,
    keywords: localizedSiteConfig.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ja: new URL("", localizedSiteConfig.siteUrl).toString(),
        en: new URL("en/", localizedSiteConfig.siteUrl).toString(),
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: localizedSiteConfig.title,
    },
    openGraph: {
      title: localizedSiteConfig.title,
      description,
      siteName: localizedSiteConfig.title,
      url: canonicalUrl,
      locale: locale === "ja" ? "ja_JP" : "en_US",
    },
    twitter: {
      title: localizedSiteConfig.title,
      description,
    },
    other: {
      "mobile-web-app-capable": "yes",
    },
  };
}

export default async function LocaleLayout({
                                             children,
                                             params,
                                           }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const {locale} = await params;
  if (!isValidLocale(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
