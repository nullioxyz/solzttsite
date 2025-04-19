import { Carousel } from "@material-tailwind/react";
 
export function Gallery({ images}) {
  return (
    <Carousel
      loop={true} autoplay={false}
      className="rounded-lg relative w-full">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-full flex items-center justify-center"
          >
          <img
            src={route('file.index', {locale: 'lang', uuid: image.uuid})}
            alt="image 1"
            className="max-h-[80vh] max-w-full object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </Carousel>
  );
}