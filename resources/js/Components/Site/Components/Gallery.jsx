import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { fileUrl } from "@/helpers/images";


export function Gallery({ images = [] }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [dragDx, setDragDx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const clampIndex = useCallback((i) => {
    if (!images.length) return 0;

    return Math.max(0, Math.min(images.length - 1, i));
  }, [images.length]);

  const handlePrev = useCallback(() => setIndex((i) => clampIndex(i - 1)), [clampIndex]);
  const handleNext = useCallback(() => setIndex((i) => clampIndex(i + 1)), [clampIndex]);

  const dragState = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    dragging: false,
  });

  const THRESHOLD = Math.min(120, Math.max(40, width * 0.15));

  const onPointerDown = useCallback((e) => {
    if (dragState.current.pointerId !== null) return;
    dragState.current.pointerId = e.pointerId;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragState.current.startX = e.clientX;
    dragState.current.startY = e.clientY;
    dragState.current.dragging = true;
    setIsDragging(true);
    setDragDx(0);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!dragState.current.dragging) return;

    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    if (Math.abs(dx) > Math.abs(dy) && e.cancelable) e.preventDefault();

    const atFirst = index === 0;
    const atLast = index === images.length - 1;

    let dampedDx = dx;
    if ((atFirst && dx > 0) || (atLast && dx < 0)) {
      dampedDx = dx * 0.35;
    }
    setDragDx(dampedDx);
  }, [index, images.length]);

  const onPointerUp = useCallback((e) => {
    if (!dragState.current.dragging) return;

    const dx = e.clientX - dragState.current.startX;

    if (dx <= -THRESHOLD) {
      handleNext();
    } else if (dx >= THRESHOLD) {
      handlePrev();
    }
    // reseta
    dragState.current.dragging = false;
    dragState.current.pointerId = null;
    setIsDragging(false);
    setDragDx(0);

    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }, [THRESHOLD, handleNext, handlePrev]);

  const onPointerCancel = useCallback(() => {
    dragState.current.dragging = false;
    dragState.current.pointerId = null;
    setIsDragging(false);
    setDragDx(0);
  }, []);

  const baseTranslate = -(index * width);
  const translateX = baseTranslate + dragDx;

  return (
    <div className="relative w-full">
      {images.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="hidden md:flex items-center justify-center !absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 rounded-full p-2"
          aria-label="Previous"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>
      )}
      
      {images.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="hidden md:flex items-center justify-center !absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 rounded-full p-2"
          aria-label="Next"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
      )}

      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ touchAction: "pan-y" }}
      >
        <div
          ref={trackRef}
          className="flex items-center"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isDragging ? "none" : "transform 350ms ease",
            willChange: "transform",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          {images.map((image, idx) => (
            <div
              key={`gallery_${idx}`}
              className="shrink-0 flex items-center justify-center"
              style={{ width: width || "100%" }}
            >
              <picture>
                <source
                  type="image/avif"
                  srcSet={`
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'md', format: 'avif' })} 1280w,
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'lg', format: 'avif' })} 1920w
                  `}
                  sizes="(max-width: 1024px) 90vw, 1200px"
                />
                <source
                  type="image/webp"
                  srcSet={`
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'md', format: 'webp' })} 1280w,
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'lg', format: 'webp' })} 1920w
                  `}
                  sizes="(max-width: 1024px) 90vw, 1200px"
                />
                <img
                  src={fileUrl(image.uuid, { locale: 'lang', size: 'lg' })}              // fallback jpg
                  srcSet={`
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'md' })} 1280w,
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'lg' })} 1920w
                  `}
                  sizes="(max-width: 1024px) 90vw, 1200px"
                  alt={image.alt || 'image'}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="max-h-[80vh] max-w-full object-contain select-none"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
