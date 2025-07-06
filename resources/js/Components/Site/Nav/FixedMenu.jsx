import React, { useState, useEffect, useCallback } from 'react';
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';

import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import LanguageSelection from '../Components/LanguageSelection/Index';

export default function FixedMenu({ languages, defaultLang, currentLanguage, social }) {
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


  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
        <div className="flex justify-between items-center h-24 px-4 max-w-[1240px] mx-auto text-black">
          <div className="text-lg font-bold mt-12">
            <a href={route('home.index', currentLanguage.slug)}>
              <Logo />
            </a>
          </div>

          <div className="iconMenu flex cursor-pointer text-black" onClick={onclickMenu}>
            {!open ? <FiMenu size={30} color='#747474' style={{ strokeWidth: 1 }} /> : <FiX size={30} style={{ strokeWidth: 1 }} color={'#747474'} />}
          </div>
        </div>
      </div>

      <div className={`relative flex justify-between items-center h-32 max-w-[1240px] mx-auto text-black`}>

        {open && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onclickMenu}></div>}

        <div className={`mobile-menu fixed top-0 right-0 h-full text-black w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${open ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
          <div className="flex p-4">
            <LanguageSelection languages={languages} defaultLang={defaultLang} currentLanguage={currentLanguage} />
            <FiX size={30} color='#747474' style={{ strokeWidth: 1 }} className="cursor-pointer" onClick={onclickMenu} />
          </div>

          <ul className="flex flex-col space-y-4 p-4 text-[20px]">
            <li className="border-b border-gray-300 py-2">
              <a href={route('site.portfolio', currentLanguage.slug)} className="text-[#747474] menu-text">{t('portfolio')}</a>
            </li>
            <li className="border-b border-gray-300 py-2">
              <a href={route('site.available_designs', currentLanguage.slug)} className="text-[#747474] menu-text">{t('available')}</a>
            </li>
            <li className="border-b border-gray-300 py-2">
              <a href="#how" className="text-[#747474] menu-text">{t('appointment')}</a>
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
