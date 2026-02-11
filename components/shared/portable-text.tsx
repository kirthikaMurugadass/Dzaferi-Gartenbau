"use client";

import { PortableText as PortableTextComponent } from "@portabletext/react";

interface PortableTextProps {
  content: any[] | null | undefined;
  className?: string;
}

export function PortableText({ content, className }: PortableTextProps) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <PortableTextComponent
        value={content}
        components={{
          block: {
            normal: ({ children }) => <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-4">{children}</p>,
            h1: ({ children }) => <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-4 font-[family-name:var(--font-heading)]">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl sm:text-2xl font-semibold text-neutral-950 mb-4 font-[family-name:var(--font-heading)]">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg sm:text-xl font-semibold text-neutral-950 mb-3 font-[family-name:var(--font-heading)]">{children}</h3>,
            h4: ({ children }) => <h4 className="text-base sm:text-lg font-semibold text-neutral-950 mb-3 font-[family-name:var(--font-heading)]">{children}</h4>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-primary-500 pl-4 italic text-neutral-700 my-4">{children}</blockquote>,
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-700">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-neutral-700">{children}</ol>,
          },
          marks: {
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            link: ({ value, children }) => {
              const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
              return (
                <a
                  href={value?.href}
                  target={target}
                  rel={target === "_blank" ? "noopener noreferrer" : undefined}
                  className="text-primary-700 hover:text-primary-800 underline"
                >
                  {children}
                </a>
              );
            },
          },
        }}
      />
    </div>
  );
}
