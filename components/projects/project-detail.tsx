"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type ProjectDetail = {
  title: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  process: {
    steps: Array<{ title: string; description: string }>;
  };
  results: {
    items: string[];
  };
  cta: {
    heading: string;
    text: string;
    button: string;
  };
};

export function ProjectDetailPageClient({
  slug,
  image,
  heroImage,
  title: titleProp,
  description: descriptionProp,
  techStack,
}: {
  slug: string;
  image: string;
  heroImage?: string;
  title?: string;
  description?: string;
  techStack?: string[];
}) {
  const ui = useTranslations("projects.ui");

  // Legacy translations for project details are no longer required.
  // We rely on Sanity data passed from the server. Keep details null-safe.
  const details: ProjectDetail | null = null;

  const title = titleProp ?? details?.title ?? slug;
  const description = descriptionProp ?? details?.description ?? "";
  const tags = techStack ?? [];
  const hero = heroImage ?? image;

  return (
    <div>
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src={hero} alt={title} fill className="object-cover" priority sizes="100vw" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(27,58,45,0.6) 0%, rgba(27,58,45,0.3) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-[1280px] mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              {ui("backToProjects")}
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)]">
              {title}
            </h1>
            {description ? <p className="text-white/90 mt-2">{description}</p> : null}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
            </div>

            <div className="mt-10 space-y-10">
              <section>
                <h2 className="text-2xl font-semibold text-neutral-950 mb-4 font-[family-name:var(--font-heading)]">
                  {ui("overviewHeading")}
                </h2>
                <p className="text-neutral-700 leading-relaxed text-lg">{details?.overview}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-neutral-950 mb-4 font-[family-name:var(--font-heading)]">
                  {ui("challengeSolutionHeading")}
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                      {ui("challengeLabel")}
                    </p>
                    <p className="text-neutral-700 leading-relaxed text-lg">{details?.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                      {ui("solutionLabel")}
                    </p>
                    <p className="text-neutral-700 leading-relaxed text-lg">{details?.solution}</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
                  {ui("processHeading")}
                </h2>
                <ol className="space-y-4">
                  {(details?.process?.steps ?? []).map((step, index) => (
                    <li key={index} className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm">
                      <p className="text-sm font-semibold text-primary-700 mb-1">
                        {ui("step")} {index + 1}
                      </p>
                      <p className="text-lg font-semibold text-neutral-950">{step.title}</p>
                      <p className="text-neutral-700 mt-2 leading-relaxed">{step.description}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
                  {ui("resultsHeading")}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(details?.results?.items ?? []).map((item) => (
                    <li key={item} className="bg-primary-50 border border-primary-100 rounded-xl p-4 text-neutral-800">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
              <h2 className="text-xl font-semibold text-neutral-950 mb-4 font-[family-name:var(--font-heading)]">
                {ui("projectDetails")}
              </h2>
              <p className="text-neutral-700 mb-6">{description}</p>

              <div className="mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  {ui("tags")}
                </h3>
                <ul className="space-y-1">
                  {tags.map((tag) => (
                    <li key={tag} className="text-neutral-700">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/contact">
                <Button variant="primary" size="lg" className="w-full">
                  {ui("requestSimilarProject")}
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-6 border border-primary-200 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-950 mb-2 font-[family-name:var(--font-heading)]">
                {details?.cta?.heading}
              </h3>
              <p className="text-neutral-700 mb-5 leading-relaxed">{details?.cta?.text}</p>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="w-full">
                  {details?.cta?.button}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

