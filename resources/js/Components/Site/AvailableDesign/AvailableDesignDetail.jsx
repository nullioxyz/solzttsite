import React, { useMemo, useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';
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
  const [designs, setDesigns] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const { t } = useTranslation();
  const { addAsReference, selectedReferences, setSelectedReferences } = useSelectReferences();

  const handleAddAsReference = (item) => {
    const isSelected = selectedReferences?.some(ref => ref.id === availableDesign.id);
    if(!isSelected) {
      addAsReference({
        id: item.id,
        image: route('file.index', {locale: 'lang', uuid: item.media[0].uuid}),
        name: item.translation ? item.translation.title : item.default_translation.title,
        type: 'available_design',
      });
    }
  };
  
    useEffect(() => {
      if (newItems.length > 0) {
        boxRefs.current = boxRefs.current.slice(0, designs.length);
  
        anime({
          targets: boxRefs.current.slice(-newItems.length),
          opacity: [0, 1],
          translateY: [50, 0],
          duration: 1000,
          easing: 'easeOutExpo',
          delay: (el, i) => i * 100,
        });
  
        setNewItems([]);
      }
    }, [newItems, designs.length]);
  

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
    availableDesign?.translation?.title ??
    availableDesign?.default_translation?.title ??
    "";

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


  const handleClick = () => {
    handleAddAsReference(availableDesign);
  };

  const renderActionButton = () => {
    const isSelected = selectedReferences?.some(ref => ref.id === availableDesign.id);

    return (
      <Button
        size="sm"
        className="rounded-none border-0 bg-white shadow-none hover:shadow-md flex items-center gap-2 whitespace-nowrap p-2"
        onClick={() => {
          if (isSelected) {
            setSelectedReferences(prevRefs =>
              prevRefs.filter(ref => ref.id !== availableDesign.id)
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
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-[2.0rem] tracking-tight text-[#595954] text-center sm:text-left">
              {title}
            </h1>

            <div className="flex justify-center sm:justify-end">
              {renderActionButton()}
            </div>
          </div>


          <div
          className="w-full max-w-6xl mx-auto px-4"
          >
            <ImageWithDoubleTap
            onDoubleTap={handleClick}
            >
              <Gallery
                images={availableDesign?.media}
                initialIndex={activeIndex}
                onIndexChange={setActiveIndex}
                />
            </ImageWithDoubleTap>
          </div>

          <div className="mt-10">
            {description && (
              <div className="font-normal text-justify color-gray" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
