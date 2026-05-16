import Home from "@/app/home";
import {setRequestLocale} from "next-intl/server";

export default async function LocalePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <Home />;
}
