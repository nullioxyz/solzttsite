import { useRef, useState, useLayoutEffect, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { fileUrl } from "@/helpers/images";

export function Gallery({ images = [] }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [loaded, setLoaded] = useState(false);


  const [index, setIndex] = useState(0);
  const [dragDx, setDragDx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Medições do viewport
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(480); // fallback para 1º paint (evita “menor”)

  // Mede ANTES do primeiro paint para evitar flicker de tamanho
  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.getBoundingClientRect().width;
      setWidth(w);

      // Altura alvo: até 80vh, respeitando uma proporção mínima (3:4) se quiser
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

      {/* Viewport COM altura definida desde o primeiro paint */}
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
            height: `${height}px`, // garante que os filhos herdem a mesma altura
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
              style={{ width: `${width}px`, height: `${height}px` }}
            >
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
                  // primeira imagem pode ser carregada com prioridade
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchpriority={idx === 0 ? "high" : "auto"}
                  decoding="async"
                  draggable={false}
                  onLoad={() => setLoaded(true)}
                  className={`w-full h-full object-contain transition-opacity duration-500 select-none ${
                    loaded ? "opacity-100" : "opacity-0"
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
