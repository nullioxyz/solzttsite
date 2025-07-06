import DOMPurify from 'dompurify';

export default function AboutHome({ institucional }) {
  
  const institucionalTranslation = institucional.translation ?? institucional.default_translation;
  
  const sanitizedDescription = DOMPurify.sanitize(institucionalTranslation.description);
  const hasMedia = institucional.media.length > 0;
  const imageUrl = hasMedia ? route('file.index', {locale: institucionalTranslation.language.slug, uuid: institucional.media[0].uuid}) : '';

  return (
    <section id="about" className="flex flex-col justify-between h-auto mx-auto p-5 mt-20 overflow-hidden">
      <div className="max-w-[1240px] mx-auto w-full">

        <div className="mb-10">
          <h1 className="text-[2.0rem] tracking-tight text-[#595954] text-center sm:text-left">
            {institucionalTranslation.title}
          </h1>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-10 items-center xl:items-start">
          {/* Texto */}
          <div className="text text-justify text-[20px] w-full xl:w-1/2 text-[#4d4c4c]">
            <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          </div>

          {/* Imagem */}
          {hasMedia && (
            <div className="w-full xl:w-1/2 flex justify-center xl:justify-end">
              <img 
                src={imageUrl}
                alt="Image 1"  
                className="w-[620px] h-[400px] md:w-[500px] md:h-[500px] sm:w-full sm:h-auto object-cover"
                loading='lazy'
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}