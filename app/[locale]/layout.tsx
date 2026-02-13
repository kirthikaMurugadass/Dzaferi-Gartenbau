import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { routing } from "@/i18n/routing";
import { getFooterData } from "@/sanity/lib/queries";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  
  let footerData = null;
  try {
    footerData = await getFooterData();
  } catch (error) {
    console.error('Error fetching footer data:', error);
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main>{children}</main>
      <Footer footerData={footerData} />
      <ScrollToTop />
    </NextIntlClientProvider>
  );
}
