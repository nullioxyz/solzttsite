
import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Avatar,
  Typography,
  Card,
  DialogFooter,
} from "@material-tailwind/react";
import { Gallery } from "./Gallery";
import logo from '@/Assets/Images/logo.png';


const ImageToModal = ({ reference, coverImage, alt, images}) => {
  const [open, setOpen] = useState(false);
  const [imageText, setImageText] = useState(null);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleImageText = (text) => {
    setImageText(text);
  }

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

      <Dialog open={open} handler={handleOpen} size="md" className="max-w-full max-h-[900px] overflow-y-scroll custom-scrollbar">
        <DialogHeader className="flex items-center justify-between">
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

        {imageText !== null ? (
          <DialogFooter className="justify-between">
            <div className="flex items-center">
              <div>
                <Typography variant="paragraph" color="gray" className="font-normal text-justify">
                  {imageText}
                </Typography>
              </div>
            </div>
          </DialogFooter>
        ): null}
      </Dialog>
    </>
  );
};

export default ImageToModal;
