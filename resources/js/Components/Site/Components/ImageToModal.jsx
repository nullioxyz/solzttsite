import React, { useState } from "react";
import DOMPurify from "dompurify";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  DialogFooter,
} from "@material-tailwind/react";
import { Gallery } from "./Gallery";
import { useTranslation } from "react-i18next";
import { useSelectReferences } from "@/Contexts/SelectReferencesContext";
import { FiX } from "react-icons/fi";
import { useCallback } from "react";
import { useRef } from "react";
import { Thumb } from "./Thumb";

const ImageToModal = ({ reference, coverImage, alt, images, available, title, description, book, onBookNow, onAddReference, availableDesign, itemId, detailUrl, indexUrl }) => {

  const sanitizedDescription = DOMPurify.sanitize(description, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a',
      'ul', 'ol', 'li', 'p', 'h1', 'h2', 'h3', 'blockquote', 'pre', 'code', 'br',
      'table', 'thead', 'tbody', 'tr', 'td', 'th',
      'iframe', 'img', 'figure',
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'colspan', 'rowspan', 'style',
      'src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'alt', 'title',
      'type', 'start'
    ],
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allowfullscreen', 'allow', 'frameborder'],
  });
  
  const [open, setOpen] = useState(false);
  const didPushRef = useRef(false);


  const toggleModal = useCallback(() => {
    setOpen(prev => {
      const next = !prev;

      if (next) {
        if (!didPushRef.current) {
          window.history.pushState({ modal: true }, "", detailUrl);
          didPushRef.current = true;
        }
      } else {
        window.history.replaceState({}, "", indexUrl);
        didPushRef.current = false;
      }

      return next;
    });
  }, [detailUrl, indexUrl]);

  const { t } = useTranslation();
  const { selectedReferences, setSelectedReferences } = useSelectReferences();

  const handleClick = () => {
    if (!book && !availableDesign ) {
      onAddReference();
    } else {
      onBookNow();
      toggleModal();
    }
  };

  const renderActionButton = () => {
    if (!available) {
      return (
        <Button color="orange" size="sm" className="rounded-none border-0" disabled>
          {t('not available')}
        </Button>
      );
    }

    if (!availableDesign && selectedReferences && selectedReferences.some(ref => ref.id === itemId)) {
      return (
        <Button
          size="sm"
          className="rounded-none border-0 bg-[#e63946] text-white hover:bg-[#d62839] shadow-none hover:shadow-none"
          autoFocus="false"
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
        className="rounded-none border-0"
        onClick={handleClick}
        aria-label={!book ? t('use_as_reference') : t('book_now')}
        title={!book ? t('use_as_reference') : t('book_now')}
        >
        {!book && !availableDesign ? t('use_as_reference') : t('book_now')}
      </Button>
    );
  };

  return (
    <>
      <Card
      className="
        relative w-full rounded-none 
        aspect-[3/4]           /* padrão mobile: 3x4 */
        lg:h-[800px] xl:h-[800px] 
        sm:w-full
        cursor-pointer overflow-hidden
      "
      ref={reference}
      >
        <div className="relative w-full h-full">
          <Thumb
            uuid={coverImage}
            alt={alt}
            onClick={toggleModal}
            className={`object-cover w-full h-full ${!available ? 'grayscale' : ''}`}
            loading="lazy"
          />
        </div>
        {book && available ? (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
            <button
              onClick={onBookNow}
              className="rounded-none xl:text-lg lg:text-lg md:text-md md:px-5 md:py-1 sm:px-2 sm:py-2 xs:px-1 xs:py-1 sm:text-sm xs:text-[10px] bg-[#272533] break-words whitespace-normal text-white hover:bg-[#9a7cae] transition duration-300 uppercase"
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
        size="xl"
        className="w-full max-w-4xl max-h-screen overflow-y-scroll custom-scrollbar rounded-none"
      >
        
        <DialogHeader className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10 rounded-none">
          {renderActionButton()}
          <div className="flex items-center gap-3">
            <FiX
              size={30}
              color="#747474"
              className="cursor-pointer"
              onClick={toggleModal}
              style={{ strokeWidth: 1 }}
            />
          </div>
        </DialogHeader>

          <DialogBody className="flex flex-col justify-center items-center flex-grow">
            <Gallery images={images} />
          </DialogBody>

          {description && (
            <DialogFooter className="justify-normal items-start flex flex-col">
              {title ? (
                <p className="font-bold">{title}</p>
              ): null}
              
              <div className="font-normal text-justify color-gray" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            </DialogFooter>
          )}

      </Dialog>
    </>
  );
};

export default ImageToModal;
