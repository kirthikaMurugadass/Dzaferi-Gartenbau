"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

function createContactFormSchema(
  messages: { nameMin: string; emailInvalid: string; messageMin: string }
) {
  return z.object({
    name: z.string().min(2, messages.nameMin),
    email: z.string().email(messages.emailInvalid),
    phone: z.string().optional(),
    service: z.string().optional(),
    message: z.string().min(10, messages.messageMin),
    contactMethod: z.enum(["phone", "email"]).optional(),
  });
}

export type ContactFormData = z.infer<ReturnType<typeof createContactFormSchema>>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("Contact.page.form");
  const locale = useLocale() as 'en' | 'de';

  const contactFormSchema = useMemo(
    () =>
      createContactFormSchema({
        nameMin: t("errors.nameMin"),
        emailInvalid: t("errors.emailInvalid"),
        messageMin: t("errors.messageMin"),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          locale,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit form");
      }

      // Success - reset form and show success message
      reset();
      setSubmitted(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t("errorGeneric");
      setError(errorMessage);
    }
  };

  if (submitted) {
    return (
      <div className="bg-primary-50 rounded-lg sm:rounded-xl p-8 sm:p-10 md:p-12 text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Check className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-950 mb-2">
          {t("successTitle")}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 md:space-y-6">
      {error && (
        <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
      )}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {t("labels.fullName")}
        </label>
        <input
          id="name"
          {...register("name")}
          className={cn(
            "w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg border bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300",
            errors.name ? "border-red-500" : "border-neutral-300"
          )}
          placeholder={t("placeholders.name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {t("labels.email")}
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={cn(
            "w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg border bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300",
            errors.email ? "border-red-500" : "border-neutral-300"
          )}
          placeholder={t("placeholders.email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {t("labels.phone")}
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className="w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg border border-neutral-300 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300"
          placeholder={t("placeholders.phone")}
        />
      </div>
      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {t("labels.serviceInterest")}
        </label>
        <select
          id="service"
          {...register("service")}
          className="w-full h-11 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg border border-neutral-300 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300"
        >
          <option value="">{t("serviceOptions.select")}</option>
          <option value="garden-construction">
            {t("serviceOptions.gardenConstruction")}
          </option>
          <option value="garden-care">{t("serviceOptions.gardenCare")}</option>
          <option value="property-management">
            {t("serviceOptions.propertyManagement")}
          </option>
          <option value="winter-service">
            {t("serviceOptions.winterService")}
          </option>
          <option value="other">{t("serviceOptions.other")}</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {t("labels.projectDescription")}
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-300 min-h-[120px]",
            errors.message ? "border-red-500" : "border-neutral-300"
          )}
          placeholder={t("placeholders.message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t("sending")}
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </form>
  );
}
