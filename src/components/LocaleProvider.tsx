"use client";

import {detectLocale, dictionaries, Locale}             from "@/lib/i18n";
import {NextIntlClientProvider}                         from "next-intl";
import {createContext, useContext, useEffect, useState} from "react";

const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void } | null>(null);

export const useAppLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useAppLocale must be used within LocaleProvider");
  }
  return ctx;
};

export default function LocaleProvider({children}: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ja");

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  return (
    <LocaleContext.Provider value={{locale, setLocale}}>
      <NextIntlClientProvider locale={locale} messages={dictionaries[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
