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
import { useSelectReferences } from "@/Contexts/SelectReferencesContext";

const ImageToModal = ({ reference, coverImage, alt, images, available, description, book, onBookNow, onAddReference, itemId }) => {

  const sanitizedDescription = DOMPurify.sanitize(description);
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(prev => !prev);
  const { t } = useTranslation();
  const { selectedReferences, setSelectedReferences } = useSelectReferences();

  const handleClick = () => {
    if (!book) {
      onAddReference();
    } else {
      onBookNow();
      toggleModal();
    }
  };

  const renderActionButton = () => {
    if (!available) {
      return (
        <Button color="orange" size="sm" disabled>
          {t('not available')}
        </Button>
      );
    }

    if (selectedReferences && selectedReferences.some(ref => ref.id === itemId)) {
      return (
        <Button
          color="red"
          size="sm"
          onClick={() => setSelectedReferences(prevRefs => prevRefs.filter(ref => ref.id !== itemId))}
        >
          {!book ? t('remove_reference') : t('choose_another')}
        </Button>
      );
    }

    return (
      <Button color="gray" size="sm" onClick={handleClick}>
        {!book ? t('use_as_reference') : t('book_now')}
      </Button>
    );
  };

  return (
    <>
      <Card
        className="relative w-full h-[400px] cursor-pointer"
        ref={reference}
      >
        <div className="relative w-full h-full">
          <img
            src={coverImage}
            alt={alt}
            onClick={toggleModal}
            className={`object-cover w-full h-full ${!available ? 'grayscale' : ''}`}
          />
          {book && available && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
              <button
                onClick={onBookNow}
                className="px-6 py-3 bg-[#272533] text-white text-lg rounded-full hover:bg-[#9a7cae] transition duration-300 uppercase"
              >
                {t('book_now')}
              </button>
            </div>
          )}
        </div>
      </Card>

      <Dialog
        open={open}
        handler={toggleModal}
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
          {renderActionButton()}
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
