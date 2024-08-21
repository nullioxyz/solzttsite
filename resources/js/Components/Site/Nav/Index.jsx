import React from 'react';
import { useState, useRef } from 'react';
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import LanguageSelection from '../Components/LanguageSelection/Index';
import { useTranslation } from 'react-i18next';



export default function Index({ languages, defaultLang }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const onclickMenu = () => {
    setOpen(!open);
  }

  return (
    <div className="flex justify-between items-center h-32 max-w-[1240px] mx-auto text-white">

      <LanguageSelection languages={languages} defaultLang={defaultLang}/>

      <div className="iconMenu flex mr-2 cursor-pointer" onClick={onclickMenu}>
        {!open ? <TiThMenu size={30} /> : <IoCloseSharp size={30} />}
      </div>

      <div className={`mobile-menu fixed top-10 text-black w-60 transition-transform duration-300 ease-in-out ${open ? 'transform translate-y-0' : 'transform -translate-y-full -mt-28'}`}>
        <ul className="uppercase flex flex-col space-y-* ml-2 text-[20px] roboto-medium">
          <li className="border-b border-gray-300 py-2 px-4 mb-5">
            <a href="#" className="text-white">{t('about')}</a>
          </li>
          <li className="border-b border-gray-300 py-2 px-4 mb-5">
            <a href="#" className="text-white">{t('portfolio')}</a>
          </li>
          <li className="border-b border-gray-300 py-2 px-4 mb-5">
            <a href="#" className="text-white">{t('available')}</a>
          </li>
          <li className="border-b border-gray-300 py-2 px-4 mb-5">
            <a href="#" className="text-white">{t('appointment')}</a>
          </li>
          <li className="border-b border-gray-300 py-2 px-4 mb-5">
            <a href="#" className="text-white">{t('contact')}</a>
          </li>
        </ul>
      </div>
    </div>

  );
}