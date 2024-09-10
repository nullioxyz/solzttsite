import React, { useState, useEffect, useCallback } from 'react';
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import LanguageSelection from '../Components/LanguageSelection/Index';
import { useTranslation } from 'react-i18next';
import logo from '@/Assets/Images/logo.png';

export default function Index({ languages, defaultLang, currentLanguage, social }) {
  const [open, setOpen] = useState(false);
  const [showFixedMenu, setShowFixedMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useTranslation();

  const scrollToNextSection = (section) => {
    const nextSection = document.getElementById(section);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  const onclickMenu = () => {
    setOpen(!open);
  }

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    if (scrollY === 0) {
      setShowFixedMenu(false);
    } else if (scrollY > lastScrollY) {
      setShowFixedMenu(false);
    } else if (scrollY < lastScrollY) {
      setShowFixedMenu(true);
    }

    setLastScrollY(scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {showFixedMenu && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
          <div className="flex justify-between items-center h-16 px-4 max-w-[1240px] mx-auto text-black">
            <div className="text-lg font-bold">
              <a href="#">
                <img src={logo} className='w-10' alt="Logo" />
              </a>
            </div>

            <LanguageSelection languages={languages} defaultLang={defaultLang} currentLanguage={currentLanguage} textColor="text-black" />

            <div className="iconMenu flex cursor-pointer text-black" onClick={onclickMenu}>
              {!open ? <TiThMenu size={30} /> : <IoCloseSharp size={30} />}
            </div>
          </div>
        </div>
      )}

      <div className={`relative flex justify-between items-center h-32 max-w-[1240px] mx-auto text-black`}>
        <LanguageSelection languages={languages} defaultLang={defaultLang} currentLanguage={currentLanguage} />

        <div className="iconMenu flex mr-2 cursor-pointer text-white" onClick={onclickMenu}>
          {!open ? <TiThMenu size={30} /> : <IoCloseSharp size={30} />}
        </div>

        {open && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onclickMenu}></div>}

        <div className={`mobile-menu fixed top-0 right-0 h-full text-black w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${open ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
          <div className="flex justify-end p-4">
            <IoCloseSharp size={30} className="cursor-pointer" onClick={onclickMenu} />
          </div>

          <ul className="uppercase flex flex-col space-y-4 p-4 text-[20px]">
            <li className="border-b border-gray-300 py-2">
              <a href="#about" onClick={() => scrollToNextSection('about')} className="text-black MontSerratMedium">{t('about')}</a>
            </li>
            <li className="border-b border-gray-300 py-2">
              <a href="#works" onClick={() => scrollToNextSection('works')} className="text-black MontSerratMedium">{t('portfolio')}</a>
            </li>
            <li className="border-b border-gray-300 py-2">
              <a href="#available" onClick={() => scrollToNextSection('available')} className="text-black MontSerratMedium">{t('available')}</a>
            </li>
            <li className="border-b border-gray-300 py-2">
              <a href="#how" onClick={() => scrollToNextSection('how')} className="text-black MontSerratMedium">{t('appointment')}</a>
            </li>
            <li className="border-b border-gray-300 py-2">
              <a href="#book" onClick={() => scrollToNextSection('book')} className="text-black MontSerratMedium">{t('contact')}</a>
            </li>
          </ul>

          <div className="flex justify-start space-x-3 mt-4 px-4">
            {social.instagram && (
              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} className="text-black" />
              </a>
            )}

            {social.facebook && (
              <a href={social.facebook.url} target="_blank" rel="noopener noreferrer">
                <FaFacebookF size={20} className="text-black" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
