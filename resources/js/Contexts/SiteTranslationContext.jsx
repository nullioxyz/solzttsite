import React, { createContext, useState, useEffect } from 'react';
import axios from '@/Services/requests';
import { useContext } from 'react';
export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    
    const fetchTranslations = async () => {
      try {
        const response = await axios.get(route('site.translations'));
        if (response.statusText !== 'OK') {
          throw new Error('Erro ao buscar traduções');
        }
        
        setTranslations(response.data);

      } catch (error) {
        console.error('Erro ao buscar traduções:', error);
      }
    };

    fetchTranslations();
  }, []);

  return (
    <TranslationContext.Provider value={{ translations }}>
      {children}
    </TranslationContext.Provider>
  );
};


export function useTranslation() {
  return useContext(TranslationContext);
}