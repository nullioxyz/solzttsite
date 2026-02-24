import React, { useMemo, useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { useSelectReferences } from "@/Contexts/SelectReferencesContext";
import { Gallery } from "@/Components/Site/Components/Gallery";
import { Button } from "@material-tailwind/react";
import ImageWithDoubleTap from "../ImageWithDoubleTap/Index";

export default function AvailableDesignDetail({
  currentLanguage,
  availableDesign,
  metatags,
}) {
  const { t } = useTranslation();
  const { addAsReference, selectedReferences, setSelectedReferences } = useSelectReferences();

  const handleAddAsReference = (item) => {
    const isSelected = selectedReferences?.some((ref) => ref.id === availableDesign.id);
    if (!isSelected) {
      addAsReference({
        id: item.id,
        image: route("file.index", { locale: "lang", uuid: item.media[0].uuid }),
        name: item.translation ? item.translation.title : item.default_translation.title,
        type: "available_design",
      });
    }
  };

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
    if (activeIndex > availableDesign.media.length - 1) {
      setActiveIndex(0);
    }
  }, [availableDesign?.media?.length, activeIndex]);

  const title =
    availableDesign?.translation?.title ?? availableDesign?.default_translation?.title ?? "";

  const description =
    availableDesign?.translation?.description ?? availableDesign?.default_translation?.description ?? "";

  const normalizedDescription = useMemo(() => {
    const trimmed = description?.trim?.() ?? "";
    if (!trimmed) return "";
    const hasHtmlTag = /<\/?[a-z][\s\S]*>/i.test(trimmed);
    return hasHtmlTag ? trimmed : `<p>${trimmed}</p>`;
  }, [description]);

  const sanitizedDescription = DOMPurify.sanitize(normalizedDescription, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "ul",
      "ol",
      "li",
      "p",
      "h1",
      "h2",
      "h3",
      "blockquote",
      "pre",
      "code",
      "br",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
      "iframe",
      "img",
      "figure",
    ],
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "colspan",
      "rowspan",
      "style",
      "src",
      "width",
      "height",
      "frameborder",
      "allow",
      "allowfullscreen",
      "alt",
      "title",
      "type",
      "start",
    ],
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allowfullscreen", "allow", "frameborder"],
  });

  const handleClick = () => {
    handleAddAsReference(availableDesign);
  };

  const renderActionButton = () => {
    const isSelected = selectedReferences?.some((ref) => ref.id === availableDesign.id);

    return (
      <Button
        size="sm"
        className="rounded-none border-0 bg-white shadow-none hover:shadow-md flex items-center gap-2 whitespace-nowrap p-2"
        onClick={() => {
          if (isSelected) {
            setSelectedReferences((prevRefs) =>
              prevRefs.filter((ref) => ref.id !== availableDesign.id)
            );
          } else {
            handleClick();
          }
        }}
        aria-label={isSelected ? t("remove_reference") : t("use_as_reference")}
        title={isSelected ? t("remove_reference") : t("use_as_reference")}
      >
        <motion.div
          initial={false}
          animate={{ scale: isSelected ? [1, 1.4, 1] : [1, 0.8, 1] }}
          transition={{ duration: 0.3 }}
        >
          {isSelected ? (
            <BookmarkSolid className="w-6 h-6 text-orange-600" />
          ) : (
            <BookmarkOutline className="w-6 h-6 text-[#595954]" />
          )}
        </motion.div>

        {isSelected ? (
          <span className="text-xs text-orange-600">{t("remove_reference")}</span>
        ) : (
          <span className="text-xs text-[#595954]">{t("use_as_reference")}</span>
        )}
      </Button>
    );
  };

  return (
    <>
      <Head title={metatags?.title ?? title} />

      <section id="available" className="mx-auto xl:mt-5 lg:mt-5 md:mt-10 sm:mt-5 xs:mt-5 p-2">
        <div className="max-w-[1240px] mx-auto w-full">
          <div className="mb-4">
            <Link
              href={route("site.available_designs", { locale: currentLanguage?.slug ?? "lang" })}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#dcdad6] bg-[#fafafa] text-xs text-[#595954] hover:bg-white hover:border-[#cfcac4] transition-colors shadow-sm"
            >
              <svg
                className="w-4 h-4"
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

          <div className="lg:hidden">
            <div className="w-full max-w-6xl mx-auto px-4">
              <ImageWithDoubleTap onDoubleTap={handleClick} className="w-full">
                <Gallery
                  images={availableDesign?.media}
                  initialIndex={activeIndex}
                  onIndexChange={setActiveIndex}
                />
              </ImageWithDoubleTap>
            </div>

            <div className="mt-5">
              <h1 className="text-[1.4rem] tracking-tight text-[#595954] text-center">{title}</h1>
            </div>

            <div className="mt-6">
              {description && (
                <div
                  className="font-normal text-justify color-gray"
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
              )}
              <div className="mt-6 flex justify-start -ml-2">
                {renderActionButton()}
              </div>
            </div>
          </div>

          <div className="hidden lg:block mb-12">
            <div className="relative z-0 border border-black/10 bg-white grid grid-cols-[minmax(0,1.35fr)_minmax(320px,420px)] min-h-[72vh]">
              <div className="relative border-r border-black/10 flex items-center justify-center bg-[#fafafa] overflow-hidden p-3">
                <ImageWithDoubleTap onDoubleTap={handleClick} className="w-full h-full">
                  <Gallery
                    images={availableDesign?.media}
                    initialIndex={activeIndex}
                    onIndexChange={setActiveIndex}
                  />
                </ImageWithDoubleTap>
              </div>

              <div className="flex flex-col min-h-0">
                <div className="p-5 border-b border-black/10">
                  <h1 className="text-[1.4rem] tracking-tight text-[#595954] leading-tight">{title}</h1>
                </div>

                <div className="p-5 overflow-y-auto">
                  {description && (
                    <div
                      className="font-normal text-justify color-gray"
                      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                    />
                  )}
                  <div className="mt-6 flex justify-start -ml-2">
                    {renderActionButton()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
