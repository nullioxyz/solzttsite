import { useRef, useState, useLayoutEffect, useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { fileUrl } from "@/helpers/images";

const HOVER_ZOOM = 3;

export function Gallery({ images = [], initialIndex = 0, onIndexChange }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const [index, setIndex] = useState(() => {
    if (!Array.isArray(images) || images.length === 0) return 0;
    return Math.max(0, Math.min(images.length - 1, initialIndex));
  });
  const [dragDx, setDragDx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [loaded, setLoaded] = useState(() => images.map(() => false));
  const [ratios, setRatios] = useState(() => images.map(() => null));

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  const [isHoverZooming, setIsHoverZooming] = useState(false);
  const [hoverPoint, setHoverPoint] = useState({ x: 0.5, y: 0.5 });
  const [mobilePinch, setMobilePinch] = useState({
    active: false,
    scale: 1,
    originX: 0.5,
    originY: 0.5,
  });
  const pinchRef = useRef({
    startDistance: 0,
    startScale: 1,
  });
  const pinchActiveRef = useRef(false);

  useEffect(() => {
    setLoaded(images.map(() => false));
    setRatios(images.map(() => null));
    setIsHoverZooming(false);
    setHoverPoint({ x: 0.5, y: 0.5 });
    setMobilePinch({ active: false, scale: 1, originX: 0.5, originY: 0.5 });
  }, [images]);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(480);

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.getBoundingClientRect().width;
      setWidth(w);
      const desktop = window.innerWidth >= 1024;
      const maxH = Math.round(window.innerHeight * (desktop ? 0.82 : 0.78));
      const minH = desktop ? 420 : 320;
      const activeRatio = ratios[index] || 3 / 4;
      const idealH = Math.round(w / activeRatio);
      setHeight(Math.max(minH, Math.min(maxH, idealH)));
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
  }, [index, ratios]);

  const clampIndex = useCallback(
    (i) => (images.length ? Math.max(0, Math.min(images.length - 1, i)) : 0),
    [images.length]
  );

  useEffect(() => {
    setIndex(clampIndex(initialIndex));
  }, [initialIndex, clampIndex]);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    setIsHoverZooming(false);
    setHoverPoint({ x: 0.5, y: 0.5 });
    setMobilePinch({ active: false, scale: 1, originX: 0.5, originY: 0.5 });
  }, [index]);

  const handlePrev = useCallback(() => setIndex((i) => clampIndex(i - 1)), [clampIndex]);
  const handleNext = useCallback(() => setIndex((i) => clampIndex(i + 1)), [clampIndex]);

  const dragState = useRef({ pointerId: null, startX: 0, startY: 0, dragging: false });
  const THRESHOLD = Math.min(120, Math.max(40, width * 0.15));

  const onPointerDown = useCallback(
    (e) => {
      if (!isDesktop && pinchActiveRef.current) return;
      if (isDesktop && isHoverZooming) return;
      if (dragState.current.pointerId !== null) return;
      dragState.current.pointerId = e.pointerId;
      e.currentTarget.setPointerCapture?.(e.pointerId);
      dragState.current.startX = e.clientX;
      dragState.current.startY = e.clientY;
      dragState.current.dragging = true;
      setIsDragging(false);
      setDragDx(0);
    },
    [isDesktop, isHoverZooming]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!isDesktop && pinchActiveRef.current) return;
      if (isDesktop && isHoverZooming) return;
      if (!dragState.current.dragging) return;

      if (e.pointerType === "touch" && e.isPrimary === false) {
        return;
      }

      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;

      if (!isDragging && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        setIsDragging(true);
      }

      if (Math.abs(dx) > Math.abs(dy) && e.cancelable) e.preventDefault();

      const atFirst = index === 0;
      const atLast = index === images.length - 1;
      let dampedDx = dx;
      if ((atFirst && dx > 0) || (atLast && dx < 0)) dampedDx = dx * 0.35;
      setDragDx(dampedDx);
    },
    [index, images.length, isDragging, isDesktop, isHoverZooming]
  );

  const onPointerUp = useCallback(
    (e) => {
      if (!isDesktop && pinchActiveRef.current) return;
      if (isDesktop && isHoverZooming) return;
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
    [THRESHOLD, handleNext, handlePrev, isDesktop, isHoverZooming]
  );

  const onPointerCancel = useCallback(() => {
    dragState.current.dragging = false;
    dragState.current.pointerId = null;
    setIsDragging(false);
    setDragDx(0);
  }, []);

  const baseTranslate = -(index * width);
  const translateX = baseTranslate + dragDx;

  const handleImgLoad = (i) => (e) => {
    const img = e.currentTarget;
    const imageRatio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : null;
    const done = () =>
      setLoaded((prev) => {
        if (prev[i]) return prev;
        const next = prev.slice();
        next[i] = true;
        return next;
      });

    if (imageRatio) {
      setRatios((prev) => {
        if (prev[i] === imageRatio) return prev;
        const next = prev.slice();
        next[i] = imageRatio;
        return next;
      });
    }

    if (img.decode) {
      img.decode().then(done).catch(done);
    } else {
      requestAnimationFrame(done);
    }
  };

  const updateHoverPoint = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setHoverPoint({ x, y });
  };

  const distanceBetweenTouches = (t1, t2) => {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.hypot(dx, dy);
  };

  const midpointBetweenTouches = (t1, t2) => ({
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  });

  const handleMobilePinchStart = (e) => {
    if (isDesktop) return;
    if (e.touches.length !== 2) return;

    const [t1, t2] = e.touches;
    const rect = e.currentTarget.getBoundingClientRect();
    const mid = midpointBetweenTouches(t1, t2);

    pinchActiveRef.current = true;
    dragState.current.dragging = false;
    dragState.current.pointerId = null;
    setIsDragging(false);
    setDragDx(0);

    pinchRef.current.startDistance = distanceBetweenTouches(t1, t2);
    pinchRef.current.startScale = mobilePinch.scale || 1;

    setMobilePinch({
      active: true,
      scale: pinchRef.current.startScale,
      originX: Math.max(0, Math.min(1, (mid.x - rect.left) / rect.width)),
      originY: Math.max(0, Math.min(1, (mid.y - rect.top) / rect.height)),
    });

    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
  };

  const handleMobilePinchMove = (e) => {
    if (isDesktop) return;
    if (!pinchActiveRef.current || e.touches.length !== 2) return;

    const [t1, t2] = e.touches;
    const rect = e.currentTarget.getBoundingClientRect();
    const mid = midpointBetweenTouches(t1, t2);
    const distance = distanceBetweenTouches(t1, t2);

    const baseDistance = pinchRef.current.startDistance || distance;
    const rawScale = (pinchRef.current.startScale || 1) * (distance / baseDistance);
    const nextScale = Math.max(1, Math.min(3, rawScale));

    if (e.cancelable) e.preventDefault();

    setMobilePinch((prev) => ({
      ...prev,
      scale: nextScale,
      originX: Math.max(0, Math.min(1, (mid.x - rect.left) / rect.width)),
      originY: Math.max(0, Math.min(1, (mid.y - rect.top) / rect.height)),
    }));

    e.stopPropagation();
  };

  const handleMobilePinchEnd = (e) => {
    if (isDesktop) return;
    if (e.touches.length >= 2) return;
    pinchActiveRef.current = false;
    setMobilePinch({ active: false, scale: 1, originX: 0.5, originY: 0.5 });
    e.stopPropagation();
  };

  const getLoading = (i) => {
    if (i === index || i === index + 1) return "eager";
    return "lazy";
  };
  const getPriority = (i) => (i === index ? "high" : "auto");

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ touchAction: isDesktop ? "auto" : "pan-y", height: `${height}px` }}
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
          {images.map((image, i) => {
            const isActive = i === index;
            const shouldHoverZoom = isDesktop && isActive && isHoverZooming;
            const shouldMobilePinch = !isDesktop && isActive && mobilePinch.scale > 1;
            const scale = shouldMobilePinch ? mobilePinch.scale : shouldHoverZoom ? HOVER_ZOOM : 1;
            const currentX = shouldMobilePinch ? mobilePinch.originX : hoverPoint.x;
            const currentY = shouldMobilePinch ? mobilePinch.originY : hoverPoint.y;
            const translateImgX =
              scale > 1 ? (0.5 - currentX) * width * (scale - 1) : 0;
            const translateImgY =
              scale > 1 ? (0.5 - currentY) * height * (scale - 1) : 0;

            return (
              <div
                key={`gallery_${i}`}
                className="relative shrink-0 flex items-center justify-center"
                style={{ width: `${width}px`, height: `${height}px` }}
              >
                {!loaded[i] && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

                <picture className="w-full h-full">
                  <source
                    type="image/avif"
                    srcSet={`
                      ${fileUrl(image.uuid, { locale: "lang", size: "md", format: "avif" })} 1280w,
                      ${fileUrl(image.uuid, { locale: "lang", size: "lg", format: "avif" })} 1920w
                    `}
                    sizes={`${Math.min(width || 1200, 1200)}px`}
                  />
                  <source
                    type="image/webp"
                    srcSet={`
                      ${fileUrl(image.uuid, { locale: "lang", size: "md", format: "webp" })} 1280w,
                      ${fileUrl(image.uuid, { locale: "lang", size: "lg", format: "webp" })} 1920w
                    `}
                    sizes={`${Math.min(width || 1200, 1200)}px`}
                  />
                  <img
                    src={fileUrl(image.uuid, { locale: "lang", size: "lg" })}
                    srcSet={`
                      ${fileUrl(image.uuid, { locale: "lang", size: "md" })} 1280w,
                      ${fileUrl(image.uuid, { locale: "lang", size: "lg" })} 1920w
                    `}
                    sizes={`${Math.min(width || 1200, 1200)}px`}
                    alt={image.alt || "image"}
                    loading={getLoading(i)}
                    fetchpriority={getPriority(i)}
                    decoding="async"
                    draggable={false}
                    onLoad={handleImgLoad(i)}
                    onMouseEnter={isActive && isDesktop ? () => setIsHoverZooming(true) : undefined}
                    onMouseMove={isActive && isDesktop ? updateHoverPoint : undefined}
                    onMouseLeave={isActive && isDesktop ? () => setIsHoverZooming(false) : undefined}
                    onTouchStart={isActive && !isDesktop ? handleMobilePinchStart : undefined}
                    onTouchMove={isActive && !isDesktop ? handleMobilePinchMove : undefined}
                    onTouchEnd={isActive && !isDesktop ? handleMobilePinchEnd : undefined}
                    onTouchCancel={isActive && !isDesktop ? handleMobilePinchEnd : undefined}
                    className={`w-full h-full max-w-full max-h-full object-contain transition-opacity duration-500 select-none ${
                      loaded[i] ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transform: `translate3d(${translateImgX}px, ${translateImgY}px, 0) scale(${scale})`,
                      transformOrigin: "center center",
                      transition:
                        isHoverZooming || mobilePinch.active
                          ? "transform 60ms linear"
                          : "transform 220ms ease",
                      willChange: "transform",
                      cursor: isDesktop ? "zoom-in" : "default",
                    }}
                  />
                </picture>
              </div>
            );
          })}
        </div>
      </div>

      {images.length > 1 && isDesktop && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-2 bg-white/90 border border-[#dcdad6] rounded-full px-2 py-1 shadow-sm backdrop-blur-sm">
            <button
              type="button"
              onClick={handlePrev}
              className="h-8 w-8 rounded-full flex items-center justify-center text-[#595954] hover:bg-[#f3f2ef] transition-colors"
              aria-label="Previous"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>

            <span className="text-xs text-[#595954] min-w-[52px] text-center">
              {index + 1}/{images.length}
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="h-8 w-8 rounded-full flex items-center justify-center text-[#595954] hover:bg-[#f3f2ef] transition-colors"
              aria-label="Next"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {images.length > 1 && !isDesktop && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-black/15 backdrop-blur-[1px]">
            {images.map((_, i) => {
              const active = i === index;
              return (
                <span
                  key={`dot_${i}`}
                  className={`h-2 w-2 rounded-full border border-white/70 transition-all ${
                    active ? "bg-white/90 scale-110" : "bg-transparent"
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
