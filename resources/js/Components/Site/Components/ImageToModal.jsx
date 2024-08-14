
import React from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Avatar,
  Typography,
  Card,
} from "@material-tailwind/react";
import { Gallery } from "./Gallery";
import logo from '@/Assets/Images/logo.png';


const ImageToModal = ({ reference, coverImage, alt, images}) => {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
 
  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);

  return (
    <>
      <Card
        className="relative w-full h-[400px] cursor-pointer"
        onClick={handleOpen}
        ref={reference}
      >
        <div
            className="relative w-full h-[400px] cursor-pointer"
            >
            <img src={coverImage} alt={alt} className="inset-0 object-cover w-full h-full" />
          </div>
      </Card>

       <Dialog size="sm" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src={logo}
            />
            <div className="-mt-px flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                Solztt
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                @solztt
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button color="gray" size="sm">
              Use as reference
            </Button>
          </div>
        </DialogHeader>
        
        <DialogBody>
          <Gallery images={images} />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ImageToModal;
