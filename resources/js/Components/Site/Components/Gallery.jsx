import { Carousel } from "@material-tailwind/react";
 
export function Gallery({ images}) {
  return (
    <Carousel
      loop={true} autoplay={false}
      className="rounded-lg relative w-full h-[700px]">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-full h-full flex items-center justify-center"
          >
          <img
            src={route('file.index', {uuid: image.uuid})}
            alt="image 1"
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </div>
      ))}
    </Carousel>
  );
}