import Home               from "@/app/home";
import {locales}          from "@/i18n/routing";
import {setRequestLocale} from "next-intl/server";

export default async function LocalePage({params}: { params: Promise<{ locale: string }> }) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <Home/>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}