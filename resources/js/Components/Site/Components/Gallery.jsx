import { Carousel } from "@material-tailwind/react";
 
export function Gallery({ images }) {
  return (
    <Carousel loop={true} autoplay={false} className="rounded-lg">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.original_url}
          alt="image 1"
          className="h-full w-full object-cover object-center"
        />
      ))}
    </Carousel>
  );
}