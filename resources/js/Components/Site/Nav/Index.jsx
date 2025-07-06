import React, { useState, useEffect, useCallback } from 'react';
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";

import LanguageSelection from '../Components/LanguageSelection/Index';
import { useTranslation } from 'react-i18next';
import logo from '@/Assets/Images/logo.png';
import Logo from '../Logo/Logo';

export default function Index({ languages, defaultLang, currentLanguage, social }) {
  const [open, setOpen] = useState(false);
  const [showFixedMenu, setShowFixedMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useTranslation();

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
          <div className="relative flex items-center h-16 px-4 p-10 max-w-[1240px] mx-auto text-black">
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-10">
              <a href={route('home.index', currentLanguage.slug)}>
                <Logo />
              </a>
            </div>


            <div className="ml-auto iconMenu flex cursor-pointer" onClick={onclickMenu}>
              {!open ? (
                <FiMenu size={30} color="#747474" style={{ strokeWidth: 1 }} />
              ) : (
                <FiX size={30} color="#747474" style={{ strokeWidth: 1 }} />
              )}
            </div>
          </div>
        </div>
      )}
      

      <div className={`relative flex justify-between items-center h-32 max-w-[1240px] mx-auto text-black`}>
        <div className="relative left-1/2 transform -translate-x-1/2 mt-10 text-lg font-bold">
          <a href={route('home.index', currentLanguage.slug)}>
              <Logo />
            </a>
        </div>

        <div className="iconMenu flex mr-2 cursor-pointer" onClick={onclickMenu}>
          {!open ? <FiMenu size={30} color='#747474' style={{ strokeWidth: 1 }} /> : <FiX size={30} style={{ strokeWidth: 1 }} color={'#747474'} />}
        </div>

        {open && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onclickMenu}></div>}

        <div className={`mobile-menu fixed top-0 right-0 h-full text-black w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${open ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
          <div className="flex p-4">
            <LanguageSelection languages={languages} defaultLang={defaultLang} currentLanguage={currentLanguage} />
            <FiX size={30} color='#747474' style={{ strokeWidth: 1 }} className="cursor-pointer" onClick={onclickMenu} />
          </div>

          <ul className="flex flex-col space-y-4 p-4 text-[20px]">
            <li className="border-b border-gray-300 py-2">
              <a href={route('home.index', currentLanguage.slug)} className="text-[#747474] menu-text">{t('home')}</a>
            </li>

            <li className="border-b border-gray-300 py-2">
              <a href={route('site.portfolio', currentLanguage.slug)} className="text-[#747474] menu-text">{t('portfolio')}</a>
            </li>
            <li className="border-b border-gray-300 py-2">
              <a href={route('site.available_designs', currentLanguage.slug)} className="text-[#747474] menu-text">{t('available')}</a>
            </li>
            
            <li className="border-b border-gray-300 py-2">
              <a href={route('site.contact', currentLanguage.slug)} className="text-[#747474] menu-text">{t('contact')}</a>
            </li>
          </ul>

          <div className="flex justify-start space-x-3 mt-4 px-4">
            
            {social.instagram && (
              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer">
                <FiInstagram size={24} style={{ strokeWidth: 1 }}  color="#747474" />
              </a>
            )}
          
          </div>

        </div>
      </div>
    </div>
  );
}
