import React, { useMemo, useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/Site/MainLayout";
import { useTranslation } from 'react-i18next';
import DOMPurify from "dompurify";

import { Gallery } from "@/Components/Site/Components/Gallery";

export default function PortfolioShow({
  currentLanguage,
  availableDesign,
  metatags,
  languages,
  defaultLang,
  social,
}) {
  const { url } = usePage();

  const { t } = useTranslation();

  const initialIndex = useMemo(() => {
    try {
      const search = new URLSearchParams(new URL(window.location.href).search);
      const n = parseInt(search.get("photo") ?? "0", 10);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    } catch {
      return 0;
    }
  }, []);

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    if (!availableDesign?.media?.length) return;
    if (activeIndex > availableDesign.media.length - 1) setActiveIndex(0);
  }, [availableDesign?.media?.length]);

  const title =
    availableDesign?.translation?.title ??
    availableDesign?.default_translation?.title ??
    "Portfolio";

  const description =
    availableDesign?.translation?.description ??
    availableDesign?.default_translation?.description ??
    "";

  const sanitizedDescription = DOMPurify.sanitize(description, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a',
      'ul', 'ol', 'li', 'p', 'h1', 'h2', 'h3', 'blockquote', 'pre', 'code', 'br',
      'table', 'thead', 'tbody', 'tr', 'td', 'th',
      'iframe', 'img', 'figure',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'colspan', 'rowspan', 'style',
      'src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'alt', 'title',
      'type', 'start'
    ],
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allowfullscreen', 'allow', 'frameborder'],
  });

  return (
    <MainLayout
      languages={languages}
      defaultLang={defaultLang}
      social={social}
      metatags={metatags}
      currentLanguage={currentLanguage}
    >
      <Head title={metatags?.title ?? title} />

      <section id="available" className="mx-auto xl:mt-5 lg:mt-5 md:mt-10 sm:mt-5 xs:mt-5 p-2">
        <div className="max-w-[1240px] mx-auto w-full">
          <div className="mb-4">
            <Link
              href={route("site.available_designs", { locale: currentLanguage?.slug ?? "lang" })}
              className="inline-flex items-center text-sm text-[#595954]/70 hover:text-[#595954] transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {t("back")}
            </Link>
          </div>
          <div className="mb-10">
            <h1 className="text-[2.0rem] tracking-tight text-[#595954] text-center sm:text-left">
              {title}
            </h1>
          </div>

          <div className="w-full max-w-6xl mx-auto px-4">
            <Gallery
              images={availableDesign?.media}
              initialIndex={activeIndex}
              onIndexChange={setActiveIndex}
              />
          </div>

          <div className="mt-10">
            {description && (
              <div className="font-normal text-justify color-gray" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
