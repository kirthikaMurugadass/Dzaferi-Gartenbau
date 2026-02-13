import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de"],
  defaultLocale: "de",
  localePrefix: "never", // Don't add /de prefix for German-only site
});
