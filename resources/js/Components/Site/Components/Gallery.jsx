import { useRef, useState, useLayoutEffect, useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { fileUrl } from "@/helpers/images";

export function Gallery({ images = [] }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [dragDx, setDragDx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // loaded por slide
  const [loaded, setLoaded] = useState(() => images.map(() => false));
  useEffect(() => {
    // reajusta quando a lista de imagens muda
    setLoaded(images.map(() => false));
  }, [images]);

  // viewport
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(480);

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.getBoundingClientRect().width;
      setWidth(w);
      const maxH = Math.round(window.innerHeight * 0.8);
      const aspectH = Math.round(w * (4 / 3)); // 3x4 “em pé”
      setHeight(Math.min(maxH, aspectH));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("orientationchange", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const clampIndex = useCallback(
    (i) => (images.length ? Math.max(0, Math.min(images.length - 1, i)) : 0),
    [images.length]
  );

  const handlePrev = useCallback(() => setIndex((i) => clampIndex(i - 1)), [clampIndex]);
  const handleNext = useCallback(() => setIndex((i) => clampIndex(i + 1)), [clampIndex]);

  // drag
  const dragState = useRef({ pointerId: null, startX: 0, startY: 0, dragging: false });
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

  const onPointerMove = useCallback(
    (e) => {
      if (!dragState.current.dragging) return;
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      if (Math.abs(dx) > Math.abs(dy) && e.cancelable) e.preventDefault();

      const atFirst = index === 0;
      const atLast = index === images.length - 1;
      let dampedDx = dx;
      if ((atFirst && dx > 0) || (atLast && dx < 0)) dampedDx = dx * 0.35;
      setDragDx(dampedDx);
    },
    [index, images.length]
  );

  const onPointerUp = useCallback(
    (e) => {
      if (!dragState.current.dragging) return;
      const dx = e.clientX - dragState.current.startX;
      if (dx <= -THRESHOLD) handleNext();
      else if (dx >= THRESHOLD) handlePrev();

      dragState.current.dragging = false;
      dragState.current.pointerId = null;
      setIsDragging(false);
      setDragDx(0);
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    },
    [THRESHOLD, handleNext, handlePrev]
  );

  const onPointerCancel = useCallback(() => {
    dragState.current.dragging = false;
    dragState.current.pointerId = null;
    setIsDragging(false);
    setDragDx(0);
  }, []);

  const baseTranslate = -(index * width);
  const translateX = baseTranslate + dragDx;

  // handler de load por slide (com decode)
  const handleImgLoad = (i) => (e) => {
    const img = e.currentTarget;
    const done = () =>
      setLoaded((prev) => {
        if (prev[i]) return prev;
        const next = prev.slice();
        next[i] = true;
        return next;
      });

    if (img.decode) {
      img.decode().then(done).catch(done);
    } else {
      // fallback
      requestAnimationFrame(done);
    }
  };

  // opcional: pedir prioridade p/ o slide atual e pré-carregar o próximo
  const getLoading = (i) => {
    if (i === index || i === index + 1) return "eager";
    return "lazy";
  };
  const getPriority = (i) => (i === index ? "high" : "auto");

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

      {/* viewport com altura definida */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ touchAction: "pan-y", height: `${height}px` }}
      >
        <div
          ref={trackRef}
          className="flex items-center"
          style={{
            width: width ? `${width * images.length}px` : "100%",
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isDragging ? "none" : "transform 350ms ease",
            willChange: "transform",
            height: `${height}px`,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          {images.map((image, i) => (
            <div
              key={`gallery_${i}`}
              className="relative shrink-0 flex items-center justify-center" // relative p/ skeleton absolute
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              {/* skeleton por slide */}
              {!loaded[i] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}

              <picture className="w-full h-full">
                <source
                  type="image/avif"
                  srcSet={`
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'md', format: 'avif' })} 1280w,
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'lg', format: 'avif' })} 1920w
                  `}
                  sizes={`${Math.min(width, 1200)}px`}
                />
                <source
                  type="image/webp"
                  srcSet={`
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'md', format: 'webp' })} 1280w,
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'lg', format: 'webp' })} 1920w
                  `}
                  sizes={`${Math.min(width, 1200)}px`}
                />
                <img
                  src={fileUrl(image.uuid, { locale: 'lang', size: 'lg' })} // fallback jpg
                  srcSet={`
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'md' })} 1280w,
                    ${fileUrl(image.uuid, { locale: 'lang', size: 'lg' })} 1920w
                  `}
                  sizes={`${Math.min(width, 1200)}px`}
                  alt={image.alt || 'image'}
                  loading={getLoading(i)}
                  fetchpriority={getPriority(i)}
                  decoding="async"
                  draggable={false}
                  onLoad={handleImgLoad(i)}
                  className={`w-full h-full object-contain transition-opacity duration-500 select-none ${
                    loaded[i] ? "opacity-100" : "opacity-0"
                  }`}
                />
              </picture>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
