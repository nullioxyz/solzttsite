export const fileUrl = (uuid, { locale = 'lang', size, format, conversion } = {}) => {
  const base = route('file.index', { locale, uuid });
  const params = new URLSearchParams();
  if (conversion) params.set('conversion', conversion); // ex: lg-webp
  if (size) params.set('size', size);                   // sm | md | lg
  if (format) params.set('format', format);             // webp | avif | jpg
  const qs = params.toString();
  return qs ? `${base}&${qs}` : base;
};