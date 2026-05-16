import {NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {getMessages, setRequestLocale} from "next-intl/server";
import {isValidLocale} from "@/i18n/routing";
import React from "react";

export default async function LocaleLayout({
                                             children,
                                             params,
                                           }: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
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
