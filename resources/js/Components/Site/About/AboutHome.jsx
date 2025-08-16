import { fileUrl } from '@/helpers/images';
import DOMPurify from 'dompurify';
import { useState } from 'react';

export default function AboutHome({ institucional }) {
  const [loaded, setLoaded] = useState(false);

  const institucionalTranslation = institucional.translation ?? institucional.default_translation;
  const sanitizedDescription = DOMPurify.sanitize(institucionalTranslation.description, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a',
      'ul', 'ol', 'li', 'p', 'h1', 'h2', 'h3', 'blockquote', 'pre', 'code', 'br',
      'table', 'thead', 'tbody', 'tr', 'td', 'th',
      'iframe', 'img', 'figure'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'colspan', 'rowspan', 'style',
      'src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'alt', 'title',
      'type', 'start'
    ],
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allowfullscreen', 'allow', 'frameborder'],
  });

  const hasMedia = institucional.media.length > 0;
  const imageUrl = hasMedia ? route('file.index', {locale: institucionalTranslation.language.slug, uuid: institucional.media[0].uuid}) : '';

  return (
    <section id="about" className="flex flex-col justify-between h-auto mx-auto p-5 xl:mt-20 lg:mt-20 md:mt-20 sm:mt-5 xs:mt-5 overflow-hidden">
      <div className="max-w-[1240px] mx-auto w-full">

        <div className="mb-10">
          <h1 className="text-[2.0rem] tracking-tight text-[#595954] lg:text-center xl:text-left md:text-center sm:text-center xs:text-center text-center">
            {institucionalTranslation.title}
          </h1>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-10 items-center xl:items-start">

          <div className="text text-justify text-[20px] w-full xl:w-1/2 text-[#4d4c4c]">
            <div className="ck-content" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          </div>

          {hasMedia && (
            <div className="w-full xl:w-1/2 flex justify-center xl:mt-[-4rem]">
              {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <picture>
                <source
                  type="image/avif"
                  srcSet={`
                    ${fileUrl(institucional.media[0].uuid, { locale: 'lang', size: 'md', format: 'avif' })} 1280w,
                    ${fileUrl(institucional.media[0].uuid, { locale: 'lang', size: 'lg', format: 'avif' })} 1920w
                  `}
                  sizes="(max-width: 1024px) 90vw, 1200px"
                />
                <source
                  type="image/webp"
                  srcSet={`
                    ${fileUrl(institucional.media[0].uuid, { locale: 'lang', size: 'md', format: 'webp' })} 1280w,
                    ${fileUrl(institucional.media[0].uuid, { locale: 'lang', size: 'lg', format: 'webp' })} 1920w
                  `}
                  sizes="(max-width: 1024px) 90vw, 1200px"
                />
                <img
                  src={fileUrl(institucional.media[0].uuid, { locale: 'lang', size: 'lg' })}              // fallback jpg
                  srcSet={`
                    ${fileUrl(institucional.media[0].uuid, { locale: 'lang', size: 'md' })} 1280w,
                    ${fileUrl(institucional.media[0].uuid, { locale: 'lang', size: 'lg' })} 1920w
                  `}
                  sizes="(max-width: 1024px) 90vw, 1200px"
                  alt={institucionalTranslation.title || 'image'}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onLoad={() => setLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </picture>

            </div>
          )}
        </div>
      </div>
    </section>
  )
}