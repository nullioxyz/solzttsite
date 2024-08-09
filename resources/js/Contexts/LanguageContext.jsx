import React, {createContext, useContext} from 'react';

const LanguageContext = createContext();

export function LanguageProvider({children, languages, translationFields, translationValues}) {
  return (
    <LanguageContext.Provider value={{ languages, translationFields, translationValues }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguages() {
  return useContext(LanguageContext);
}