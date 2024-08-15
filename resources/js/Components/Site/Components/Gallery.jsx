import { Carousel } from "@material-tailwind/react";
import { useEffect } from "react";
 
export function Gallery({ images}) {
  return (
    <Carousel
      loop={true} autoplay={false}
      className="rounded-lg relative w-full h-[700px]">
      {images.map((image, index) => (
        <div
          className="relative w-full h-full flex items-center justify-center"
          >
          <img
            key={index}
            src={image.original_url}
            alt="image 1"
            className="h-full w-full object-cover object-center"
          />
        </div>

        
      ))}
    </Carousel>
  );
}