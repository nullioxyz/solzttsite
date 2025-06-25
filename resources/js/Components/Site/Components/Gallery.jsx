import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Carousel, IconButton } from "@material-tailwind/react";
 
export function Gallery({ images}) {
  return (
    <Carousel
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 bg-black/40 hover:bg-black/60"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 right-4 -translate-y-2/4 bg-black/40 hover:bg-black/60"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </IconButton>
      )}
      loop={true}
      autoplay={false}
      className="relative flex items-center">
      {images.map((image, index) => (
        <div
          key={'gallery_' + index}
          className="relative w-full flex items-center justify-center"
          >
          <img
            src={route('file.index', {locale: 'lang', uuid: image.uuid})}
            alt={image.uuid}
            className="max-h-[48rem] max-w-full object-center"
            loading="lazy"
          />
        </div>
      ))}
    </Carousel>
  );
}