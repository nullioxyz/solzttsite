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
import { useTranslation } from "react-i18next";


const ImageToModal = ({ reference, coverImage, alt, images, available, description, book }) => {

  const sanitizedDescription = DOMPurify.sanitize(description);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);
  const { t } = useTranslation();

  return (
    <>
      <Card
        className="relative w-full h-[400px] cursor-pointer"
        onClick={handleOpen}
        ref={reference}
      >
        {book ? (
          <div className="relative w-full h-[400px]">
            <img
              src={coverImage} alt={alt}
              className={`inset-0 object-cover w-full h-full ${!available ? 'grayscale' : ''}`}
            />

            {available ? (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                <button className="px-6 py-3 bg-[#272533] text-white text-lg rounded-full hover:bg-[#9a7cae] transition duration-300 uppercase">
                  {t('book_now')}
                </button>
              </div>
            ) : (null)}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={coverImage}
              alt={alt}
              className="object-cover w-full h-full"
            />
          </div>
        )}
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
            {t('use_as_reference')}
          </Button>
        </DialogHeader>

        <DialogBody>
          <Gallery images={images} />
        </DialogBody>

        {description && (
          <DialogFooter className="justify-between">
            <div className="font-normal text-justify color-gray" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          </DialogFooter>
        )}
      </Dialog>
    </>
  );
};

export default ImageToModal;
