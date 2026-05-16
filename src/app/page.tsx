import Home                     from "@/app/home";
import {defaultLocale}          from "@/i18n/routing";
import {NextIntlClientProvider} from "next-intl";
import {setRequestLocale}       from "next-intl/server";

export default async function RootPage() {
  setRequestLocale(defaultLocale);
  const messages = (await import(`@/messages/${defaultLocale}.json`)).default;

  return (
    <NextIntlClientProvider locale={defaultLocale} messages={messages}>
      <Home/>
    </NextIntlClientProvider>
  );
}