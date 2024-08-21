import DOMPurify from 'dompurify';

export default function About({ institucional }) {
  
  const institucionalTranslation = institucional.translation ?? institucional.default_translation;

  const sanitizedDescription = DOMPurify.sanitize(institucionalTranslation.description);
  const hasMedia = institucional.media.length > 0;
  const imageUrl = hasMedia ? institucional.media[0].original_url : '';

  return (
    <section id="about" className="flex flex-col justify-between h-auto mx-auto mt-44 p-5 overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        <div className="lg:text-left sm:text-center custom:text-center md:text-center">
          <div className="title uppercase">
            <h1 className='text-5xl tracking-tight montserrat'>{institucionalTranslation.title}</h1>
          </div>
        </div>

        <div
          className="
          xl:flex
          xl:flex-row
          xl:items-center
          lg:flex
          lg:flex-row
          lg:items-center
          md:flex
          md:flex-col
          md:items-center
          sm:flex
          sm:flex-col
          sm:items-center
          xs:flex
          xs:flex-col
          xs:items-center
          custom:flex
          custom:flex-col
          custom:items-center
          grid
          lg:grid-cols-1
          md:grid-cols-1
          xl:grid-cols-2
          sm:grid-cols-1">

            <div
              className="
                  text
                  text-justify
                  mt-10
                  text-[20px]
                  mb-10
                  w-[80rem]
                  lg:w-[50rem]
                  md:w-[45rem]
                  sm:w-[40rem]
                  xs:w-[25rem]
                  custom:w-[20rem]">
              <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            </div>
            
            {hasMedia && (
              <img 
                src={imageUrl} 
                alt="Image 1"  
                className="h-auto w-[620px] xl:max-w-[1000px] lg:max-w-[1000px] xl:left-0 lg:relative lg:left-[-120px] sm:max-w-[1000px] md:max-w-[1300px] object-cover md:ml-[-14px] sm:ml-[-34px] xs:ml-[-50px]" 
              />
            )}
        </div>
      </div>
    </section>
  )
}