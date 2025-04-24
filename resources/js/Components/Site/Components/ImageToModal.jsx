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
          aria-label={!book ? t('remove_reference') : t('choose_another')}
          title={!book ? t('remove_reference') : t('choose_another')}
        >
          {!book ? t('remove_reference') : t('choose_another')}
        </Button>
      );
    }

    return (
      <Button
        color="gray"
        size="sm"
        onClick={handleClick}
        aria-label={!book ? t('use_as_reference') : t('book_now')}
        title={!book ? t('use_as_reference') : t('book_now')}
        >
        {!book ? t('use_as_reference') : t('book_now')}
      </Button>
    );
  };

  return (
    <>
      <Card
        className="relative w-full lg:h-[400px] xl:h-[400px] md:h-[400px] sm:w-full sm:h-auto aspect-square cursor-pointer overflow-hidden"
        ref={reference}
      >
        <div className="relative w-full h-full">
          <img
            src={coverImage}
            alt={alt}
            onClick={toggleModal}
            className={`object-cover lg:h-[400px] xl:h-[400px] md:h-[400px] sm:w-full sm:h-auto ${!available ? 'grayscale' : ''}`}
            loading="lazy"
          />
        </div>
        {book && available ? (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
            <button
              onClick={onBookNow}
              className="xl:text-lg lg:text-lg md:text-md md:px-5 md:py-1 sm:px-2 sm:py-2 xs:px-1 xs:py-1 sm:text-sm xs:text-[10px] bg-[#272533] break-words whitespace-normal text-white rounded-full hover:bg-[#9a7cae] transition duration-300 uppercase"
              aria-label={t('book_now')}
            >
              {t('book_now')}
            </button>
          </div>
        ) : null}
      </Card>

      <Dialog
        open={open}
        handler={toggleModal}
        size="md"
        className="max-w-full overflow-y-scroll custom-scrollbar"
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
