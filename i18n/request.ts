import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

async function loadMessages(locale: string) {
  const [home, services, projects, contact, about, footer, common, legal, privacy] =
    await Promise.all([
      import(`../messages/home/${locale}.json`),
      import(`../messages/services/${locale}.json`),
      import(`../messages/projects/${locale}.json`),
      import(`../messages/contact/${locale}.json`),
      import(`../messages/about/${locale}.json`),
      import(`../messages/footer/${locale}.json`),
      import(`../messages/common/${locale}.json`),
      import(`../messages/legal/${locale}.json`),
      import(`../messages/privacy/${locale}.json`),
    ]);

  return {
    ...common.default,
    Home: home.default,
    // New canonical namespace for all service-related i18n (used by `useTranslations('services')`)
    services: services.default,
    // Backward-compatible alias (avoid breaking existing imports during refactor)
    Services: services.default,
    // New canonical namespace for all project-related i18n (used by `useTranslations('projects')`)
    projects: projects.default,
    // Backward-compatible alias (avoid breaking existing imports during refactor)
    Projects: projects.default,
    Contact: contact.default,
    About: about.default,
    Footer: footer.default,
    Legal: legal.default,
    privacy: privacy.default,
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = (requested && routing.locales.includes(requested as "en" | "de"))
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
