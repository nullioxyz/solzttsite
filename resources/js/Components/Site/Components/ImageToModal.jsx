import React, { useState } from "react";
import DOMPurify from "dompurify";
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
import logo from "@/Assets/Images/logo.png";

const ImageToModal = ({ reference, coverImage, alt, images, description }) => {
  
  const sanitizedDescription = DOMPurify.sanitize(description);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <Card
        className="relative w-full h-[400px] cursor-pointer"
        onClick={handleOpen}
        ref={reference}
      >
        <div className="relative w-full h-full">
          <img
            src={coverImage}
            alt={alt}
            className="object-cover w-full h-full"
          />
        </div>
      </Card>

      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        className="max-w-full max-h-[900px] overflow-y-scroll custom-scrollbar"
      >
        <DialogHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              size="sm"
              variant="circular"
              alt="Logo"
              src={logo}
            />
            <div className="flex flex-col">
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
          <Button color="gray" size="sm">
            Use as reference
          </Button>
        </DialogHeader>

        <DialogBody>
          <Gallery images={images} />
        </DialogBody>

        {description && (
          <DialogFooter className="justify-between">
            <Typography variant="paragraph" color="gray" className="font-normal text-justify">
              <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            </Typography>
          </DialogFooter>
        )}
      </Dialog>
    </>
  );
};

export default ImageToModal;
