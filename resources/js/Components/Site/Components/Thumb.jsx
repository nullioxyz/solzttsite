import { useMemo, useState } from "react";
import { fileUrl } from "@/helpers/images";

export function Thumb({ uuid, alt, onClick, className, loading = "lazy", fetchPriority = "auto" }) {
  const [loaded, setLoaded] = useState(false);

  // diferentes larguras para cards responsivos
  const sm = fileUrl(uuid, { locale: "lang", size: "sm" });
  const md = fileUrl(uuid, { locale: "lang", size: "md" });
  const lg = fileUrl(uuid, { locale: "lang", size: "lg" });

  const smWebp = fileUrl(uuid, { locale: "lang", size: "sm", format: "webp" });
  const mdWebp = fileUrl(uuid, { locale: "lang", size: "md", format: "webp" });
  const lgWebp = fileUrl(uuid, { locale: "lang", size: "lg", format: "webp" });
  const responsiveSizes = useMemo(
    () => "(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 420px",
    []
  );

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      <picture>
        {/* WEBP */}
        <source
          type="image/webp"
          srcSet={`${smWebp} 480w, ${mdWebp} 768w, ${lgWebp} 1280w`}
          sizes={responsiveSizes}
        />
        {/* Fallback JPG */}
        <img
          src={lg}
          srcSet={`${sm} 480w, ${md} 768w, ${lg} 1280w`}
          sizes={responsiveSizes}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          onClick={onClick}
          onLoad={() => setLoaded(true)}
           className={`
            w-full h-full 
            object-cover object-center
            transition-opacity duration-500 
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        />
      </picture>
    </div>
  );
}
